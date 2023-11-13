import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getDataImage() {
  const query = `*[_type == "heroImage"][0]`

  const res = await client.fetch(query)

  return res
}

export default async function Hero() {
  const images = await getDataImage()

  return (
    <section className="max-w-2xl mx-auto px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="flex flex-wrap justify-between mb-8 md:mb-16">
        <div className="w-full flex flex-col justify-center mb-6 sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="text-4xl font-bold text-black mb-4 sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-zinc-600 xl:text-lg">
            We sell only the most exclusive and hight quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>
        <div className="w-full flex mb-12 md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <ImageMain
              image={images.image1}
              alt="Great Photo Men"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <ImageMain
              image={images.image2}
              alt="Great Photo Women"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <LinkCategory name="Men" href="/Men" />
          <LinkCategory name="Women" href="/Women" />
          <LinkCategory name="Teens" href="/Teens" />
        </div>
      </div>
    </section>
  )
}


function ImageMain({ image, alt }: { image: any, alt: string }) {
  return (
    <>
      <Image
        src={urlFor(image).url()}
        alt={alt}
        className="h-full w-full object-cover object-center"
        width={500}
        height={500}
        priority
      />
    </>
  )
}

function LinkCategory({ name, href }: { name: string, href: string }) {
  return (
    <>
      <Link
        href={href}
        className="w-1/3 flex items-center justify-center text-zinc-600 font-semibold transition duration-100 hover:bg-gray-100 active:bg-gray-200"
      >
        {name}
      </Link>
    </>
  )
}