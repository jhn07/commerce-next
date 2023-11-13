"use client";

import { CartProvider as USCProvider } from "use-shopping-cart"

export default function CartProvider({ children }: { children: React.ReactNode }) {

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      successUrl="https://commerce-next-ashen-eight.vercel.app/stripe/success"
      cancelUrl="https://commerce-next-ashen-eight.vercel.app/stripe/error"
      currency="CAD"
      billingAddressCollection={false}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  )
}
