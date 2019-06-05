import React from 'react'
import { Carousel } from 'react-bootstrap'
import Image from '../../Image'
import './index.css'

export default ({ pictures, name, height, handleImageLoad }) => {
  return (
    <Carousel interval={null} className="bg-dark">
      {pictures.map((picture, index) => (
        <Carousel.Item key={index} style={{ height }}>
          <Image
            className="d-block w-100"
            src={picture}
            alt={name}
            onLoad={handleImageLoad}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
