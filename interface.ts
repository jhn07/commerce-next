export interface SimplifiedProductsProps {
  _id: string
  price: number
  name: string
  slug: string
  categoryName: string
  imageUrl: string
}

export interface FullProduct {
  _id: string;
  images: any;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
}



