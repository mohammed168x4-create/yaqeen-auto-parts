import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51TZ6ij1cV23w2n4OAJvnd9M92SFeoIWmRzMQNtnF4SRO7rhe8gQtr9AV5vGf4Dk97S7JalkLkABrrTNUbLCh3HvP00h7ls5g4b"
);