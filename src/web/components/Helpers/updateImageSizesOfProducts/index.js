import editImageSource from '../editImageSource'

export default (product, baseImageSize, newImgDimensions) => {
  const picture = editImageSource(
    product.picture,
    baseImageSize,
    newImgDimensions
  )
  return {
    ...product,
    picture
  }
}
