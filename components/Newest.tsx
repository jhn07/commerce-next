import { client } from "@/lib/sanity"
import { SimplifiedProductsProps } from "@/interface"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatToDollars } from "@/lib/format-to-dollars"

import { buttonVariants } from "./ui/button"

async function getDataProducts() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
  _id,
  price,
  name,
  "slug": slug.current,
  "categoryName": category->name,
  "imageUrl": images[0].asset->url
  }`

  const res = await client.fetch(query, { caches: "no-store" })

  return res as SimplifiedProductsProps[]
}

export default async function Newest() {
  const products = await getDataProducts()

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-zinc-900 font-bold tracking-tight">
            Our Newest products
          </h2>
          <Link
            href="/all"
            className={buttonVariants({ variant: "outline", className: "flex items-center gap-x-1 text-primary" })}
          >
            See All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}


function ProductItem({ product }: { product: SimplifiedProductsProps }) {
  return (
    <div className="group relative">
      <div className="w-full overflow-hidden aspect-square rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Image
          src={product.imageUrl}
          alt="Product image"
          className="w-full h-full object-cover object-center lg:w-full lg:h-full"
          width={300}
          height={300}
        />
      </div>
      <div className="flex justify-between gap-x-3 mt-4">
        <div>
          <h3 className="text-sm text-zinc-700 font-semibold">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-semibold text-zinc-500">{product.categoryName}</p>
        </div>
        <p className="text-sm text-zinc-900 font-semibold">{formatToDollars(product.price)}</p>
      </div>
    </div>
  )
}
