"use client";

import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { useState } from "react";

type ImageGalleryProps = {
  images: any
  isDiscountDay: boolean
}

export default function ImageGallery({ images, isDiscountDay }: ImageGalleryProps) {

  const [bigImage, setBigImage] = useState(images[0])

  const handleSmallImages = (image: any) => {
    setBigImage(image)
  }


  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="flex gap-4 order-last lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="small-photo"
              onClick={() => handleSmallImages(image)}
              priority
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          width={500}
          height={500}
          alt="big-photo"
          className="w-full h-full object-cover object-center"
          priority
        />
        {/* TODO: PRODUCT SALE */}
        {isDiscountDay && <ProductSale />}
      </div>
    </div>
  )
}


function ProductSale() {
  return (
    <span className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-3 py-1.5 text-sm font-medium uppercase tracking-wider text-white">
      Sale
    </span>
  )
}