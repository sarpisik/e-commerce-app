export default parentNode => {
  const images = Array.from(parentNode.querySelectorAll('img'))
  return images.every(img => {
    return img.complete === true
  })
}
