import { client } from "@/lib/sanity"
import { SimplifiedProductsProps } from "@/interface"
import Link from "next/link"
import Image from "next/image"
import { formatToDollars } from "@/lib/format-to-dollars"


async function getCategoryData(categoryName: string) {
  const query = `*[_type == "product" && category->name == "${categoryName}"] {
  _id,
  price,
  name,
  "imageUrl": images[0].asset->url,
  "slug": slug.current,
  "categoryName": category->name
  }`

  const res = await client.fetch(query, { caches: "no-store" })

  return res as SimplifiedProductsProps[]
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const dataCategory = await getCategoryData(params.category)



  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-zinc-900 font-bold tracking-tight">
            Our Products for {params.category}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {dataCategory.map((category) => (
            <ProductItem key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}


function ProductItem({ category }: { category: SimplifiedProductsProps }) {
  return (
    <div className="group relative">
      <div className="w-full overflow-hidden aspect-square rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Image
          src={category.imageUrl}
          alt="Product image"
          className="w-full h-full object-cover object-center lg:w-full lg:h-full"
          width={300}
          height={300}
        />
      </div>
      <div className="flex justify-between gap-x-3 mt-4">
        <div>
          <h3 className="text-sm text-zinc-700 font-semibold">
            <Link href={`/product/${category.slug}`}>
              {category.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-semibold text-zinc-500">{category.categoryName}</p>
        </div>
        <p className="text-sm text-zinc-900 font-semibold">{formatToDollars(category.price)}</p>
      </div>
    </div>
  )
}