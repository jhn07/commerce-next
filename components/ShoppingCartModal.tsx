"use client";

import { useShoppingCart } from "use-shopping-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import Image from "next/image";
import { formatToDollars } from "@/lib/format-to-dollars";
import { Button } from "./ui/button";



export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();

    const result = await redirectToCheckout();
    if (result?.error) {
      console.log(result)
      return
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200 px-3">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <ShoppingCartItems key={entry.id}
                      id={entry.id}
                      image={entry.image as string}
                      name={entry.name}
                      price={entry.price}
                      description={entry.description as string}
                      quantity={entry.quantity}
                      removeItem={removeItem}
                    />
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>{formatToDollars(totalPrice as number)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Button disabled={cartCount === 0} onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


function ShoppingCartItems(
  {
    id,
    image,
    name,
    price,
    description,
    quantity,
    removeItem,
  }: {
    id: string,
    image: string,
    name: string,
    price: number,
    description: string,
    quantity: number,
    removeItem: (cardId: string) => void
  }) {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={image}
          alt="Product image"
          width={100}
          height={100}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4">{formatToDollars(price)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">QTY: {quantity}</p>

          <div className="flex">
            <button
              type="button"
              onClick={() => removeItem(id)}
              className="font-medium text-primary hover:text-primary/80"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}