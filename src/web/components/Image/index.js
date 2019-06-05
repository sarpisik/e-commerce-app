import React from 'react'
import areImagesLoaded from './selector'
import { getWindowSize } from '../Helpers'

const screenWidthLimit = 576

const defaultImages = {
  small: import('../../assets/images/noImage_200.jpg'),
  medium: import('../../assets/images/noImage_500.jpg')
}

export default ({ onLoad, imgSrc, alt, callbackRef, ...props }) => (
  <img
    // src={imgSrc}
    ref={callbackRef}
    src={'fake'}
    onLoad={onLoad}
    onError={e => onError(e, onLoad)}
    alt={alt}
    {...props}
  />
)

export { areImagesLoaded }

const onError = (e, onLoad) => {
  // Remove synthetic event
  // More info: https://reactjs.org/docs/events.html#event-pooling
  e.persist()
  // Avoid infinite loop
  e.target.onerror = null
  // Lazy load the default picture from server.
  // If the client is offline, stop the request.
  // onLoad()
  const screenWidth = getWindowSize()[0]
  const defaultImage =
    screenWidth >= screenWidthLimit ? defaultImages.medium : defaultImages.small
  defaultImage
    .then(img => {
      e.target.src = img.default
      // Toggle spinner icon of parent component
      onLoad()
    })
    .catch(err => {
      onLoad()
      console.log(err)
    })
}
