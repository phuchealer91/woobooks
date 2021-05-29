export const formatPrice = (price) => {
  return price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  // Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
export const formatPriceSale = (price, sale) => {
  return ((price * (100 - sale)) / 100)
    ?.toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  // Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
export const formatPriceReal = (price) => {
  return (price * 100)?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  // Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
