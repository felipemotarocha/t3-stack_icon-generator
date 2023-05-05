import Stripe from "stripe";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    return stripe.checkout.sessions.create({
      success_url: `${env.HOST_NAME}/success`,
      cancel_url: `${env.HOST_NAME}/cancel`,
      line_items: [{ price: env.PRICE_ID, quantity: 1 }],
      mode: "payment",
    });
  }),
});
