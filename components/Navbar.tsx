import Link from "next/link";
import { ItemsLink } from "./ItemsLink";
import CartButton from "./CartButton";


const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
]

export default function Navbar() {
  return (
    <header className="mb-8 border-b">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Next<span className="text-primary">Commerce</span>
          </h1>
        </Link>
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              <ItemsLink link={link} />
            </div>
          ))}
        </nav>
        <div className="flex divide-x border-r sm:border-l">
          <CartButton />
        </div>

      </div>
    </header>
  )
}
