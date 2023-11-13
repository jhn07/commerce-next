"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ItemsLink = ({ link }: { link: { name: string, href: string } }) => {
  const pathname = usePathname()

  return (
    <>
      {pathname === link.href ? (
        <Link href={link.href} className="text-lg font-semibold text-primary">
          {link.name}
        </Link>
      ) : (
        <Link href={link.href} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary">
          {link.name}
        </Link>
      )}
    </>
  )
}
