"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";
import { urlFor } from "@/lib/sanity";
import { AddToBagProductCart } from "./AddToBag";


export default function CheckoutNow({ name, description, price, currency, image, price_id }: AddToBagProductCart) {

  const { checkoutSingleItem } = useShoppingCart()

  const buyNow = (priceId: string) => {
    checkoutSingleItem(priceId)
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  }


  return (
    <Button
      variant="secondary"
      className="border-2"
      onClick={() => buyNow(product.price_id)}
    >
      Checkout now
    </Button>
  )
}
