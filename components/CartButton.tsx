"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";


export default function CartButton() {
  const { handleCartClick, cartCount } = useShoppingCart()

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
      onClick={() => handleCartClick()}
    >
      <ShoppingBag />
      <span className="hidden text-xs font-semibold text-gray-500 sm:block">
        Cart
        <span className="ml-0.5">{cartCount === 0 ? "" : cartCount}</span>
      </span>
    </Button>
  )
}
