import React from 'react'
import { Carousel } from 'react-bootstrap'
import * as ROUTES from '../../../constants/routes'
import * as HISTORY from '../../../constants/history'
import Image from '../../Image'

const SlideImageItem = (
  { _id, category, name, picture, price, currency },
  index,
  callbackRef,
  onLoad,
  onClick,
  imgHeight,
  imgWidth
) => (
  <Carousel.Item
    className="h-100 d-flex align-items-center"
    key={index}
    onClick={() => onClick(category, _id)}>
    <Image
      callbackRef={callbackRef}
      height={imgHeight()}
      width={imgWidth()}
      className="d-block w-100"
      src={picture}
      alt={name}
      onLoad={onLoad}
    />
    <Carousel.Caption className="text-left text-sm-center text-uppercase">
      <h3 className="font-weight-light">{name}</h3>
      <p>{`${currency} ${price}`}</p>
    </Carousel.Caption>
  </Carousel.Item>
)

const SlideImagesList = ({
  products,
  callbackRef,
  onLoad,
  imgHeight,
  imgWidth,
  onClick,
  ...rest
}) => {
  return (
    <Carousel fade controls={false} className="bg-dark" {...rest}>
      {products.map((product, index) =>
        SlideImageItem(
          product,
          index,
          callbackRef,
          onLoad,
          onClick,
          imgHeight,
          imgWidth
        )
      )}
    </Carousel>
  )
}

export default SlideImagesList
