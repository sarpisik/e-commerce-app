import React from 'react'
import { Card } from 'react-bootstrap'
import Image from '../../Image'
import './index.css'

export default ({
  listIndex,
  imgSrc,
  handleImageChange,
  title,
  price,
  currency,
  display,
  ...props
}) => (
  <Card {...props} className={`custom-card show-off ${display}`}>
    <Image
      className="card-img-top rounded-0 custom-card-img"
      imgSrc={imgSrc}
      onLoad={handleImageChange}
      alt={title}
    />
    <Card.Body>
      <div className="card-title">{title}</div>
      <Card.Text>{`${currency}${price}`}</Card.Text>
    </Card.Body>
  </Card>
)
