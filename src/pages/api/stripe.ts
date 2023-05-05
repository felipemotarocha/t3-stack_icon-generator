import { type NextApiRequest, type NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as {
          id: string;
          metadata: { userId: string };
        };

        await prisma.user.update({
          where: { id: session.metadata.userId },
          data: {
            credits: {
              increment: 100,
            },
          },
        });
        break;
      default:
        console.log(`Unhandled Event Type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    let message = "Unknown Error";

    if (error instanceof Error) message = error.message;

    return res.status(400).send(`Webhook error: ${message}`);
  }
};

export default webhook;
