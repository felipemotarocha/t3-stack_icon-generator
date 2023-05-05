import { loadStripe } from "@stripe/stripe-js";

import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function useBuyCredits() {
  const checkout = api.checkout.createCheckout.useMutation();

  return {
    buyCredits: async () => {
      const response = await checkout.mutateAsync();

      console.log(response);
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
