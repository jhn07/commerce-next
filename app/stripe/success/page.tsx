import { buttonVariants } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function StripeSuccess() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-zinc-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-zinc-600 my-2">Thank you for you purchase We hope you enjoy it</p>
          <p>have a great day!</p>
          <Link
            href="/"
            className={buttonVariants({ className: "mt-5" })}
          >
            GO back
          </Link>
        </div>
      </div>
    </div>
  )
}
