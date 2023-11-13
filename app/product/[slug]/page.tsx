import { client } from "@/lib/sanity"
import AddToBag from "@/components/AddToBag"
import ImageGallery from "@/components/ImageGallery"

import { Button } from "@/components/ui/button"
import { FullProduct } from "@/interface"
import { Star, Truck } from "lucide-react"

import { isDiscount } from "@/lib/discount-day"
import { formatToDollars } from "@/lib/format-to-dollars"
import CheckoutNow from "@/components/CheckoutNow"


async function getProductDetails(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
  _id,
  name,
  description,
  images,
  price,
  "slug": slug.current,
  "categoryName": category->name,
  price_id,
  }`

  const res = await client.fetch(query, { caches: "no-store" })

  return res as FullProduct
}


export default async function ProductPageId({ params }: { params: { slug: string } }) {

  const productDetails = await getProductDetails(params.slug)

  const salePrice = productDetails.price + 30

  const isDiscountDay = isDiscount(10)


  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <ImageGallery
          images={productDetails.images}
          isDiscountDay={isDiscountDay}
        />
        <div className="md:py-8">
          <div className="mb-2 md:mb-3">
            <span className="mb-0.5 inline-block font-semibold text-zinc-500">
              {productDetails.categoryName}
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 lg:text-3xl">
              {productDetails.name}
            </h2>
          </div>
          <div className="flex items-center gap-3 md:mb-10">
            <Button
              className="rounded-full gap-x-2 text-sm"
            >
              4.2
              <Star className="h-5 w-5" />
            </Button>
            <span className="text-sm text-zinc-500 font-semibold transition duration-100">
              56 Ratings
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-end gap-2">
              <span className="text-xl text-zinc-900 font-bold md:text-2xl">
                {formatToDollars(productDetails.price)}
              </span>
              {isDiscountDay && <DiscountPrice oldPrice={salePrice} />}
            </div>
            <span className="text-sm text-zinc-500 ">
              Incl. Vat shipping
            </span>
          </div>
          <div className="flex items-center gap-2 mb-6 text-gray-500">
            <Truck />
            <span className="text-sm font-medium">2-4 Day Shipping</span>
          </div>
          <div className="flex gap-2.5">
            <AddToBag
              key={productDetails._id + `_${productDetails.name}`}
              name={productDetails.name}
              description={productDetails.description}
              price={productDetails.price}
              currency="USD"
              image={productDetails.images[0]}
              price_id={productDetails.price_id}
            />
            <CheckoutNow
              key={productDetails._id + + `_${productDetails.name}`}
              name={productDetails.name}
              description={productDetails.description}
              price={productDetails.price}
              currency="USD"
              image={productDetails.images[0]}
              price_id={productDetails.price_id}
            />
          </div>
          <p className="mt-12 text-base text-zinc-500 tracking-wide">
            {productDetails.description}
          </p>
        </div>
      </div>
    </div>
  )
}


function DiscountPrice({ oldPrice }: { oldPrice: number }) {
  return (
    <span className="mb-0.5 text-red-600 line-through">
      {formatToDollars(oldPrice)}
    </span>
  )
}
