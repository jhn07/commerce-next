export const formatToDollars = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "CAD"
  })
} 