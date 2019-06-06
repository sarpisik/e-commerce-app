import React from 'react'
import { Media } from 'react-bootstrap'
import Image from '../../Image'
import { ReviewStarsForProductPage } from '../../ReviewStars'

const ListItemImg = ({ src, alt }) => (
  <div className="mr-sm-3 img-container">
    <Image className="img-fluid w-100" imgSrc={src} alt={alt} />
  </div>
)

const ListItemBody = ({ name, price, average }) => (
  <Media.Body>
    <h5>{name.toUpperCase()}</h5>
    <p>{price}</p>
    <br />
    <p>
      <ReviewStarsForProductPage average={average} />
      <span className="ml-1">16 Reviews</span>
    </p>
  </Media.Body>
)

const ListItem = ({
  _id,
  name,
  picture,
  price,
  avgRev,
  category,
  onNavigate
}) => (
  <Media
    onClick={() => onNavigate(category, _id)}
    className="d-block d-sm-flex mb-3 p-1 bg-white"
    as="li">
    <ListItemImg src={picture} alt={name} />
    <ListItemBody name={name} price={price} average={avgRev} />
  </Media>
)

const List = ({ products, onNavigate }) => {
  return (
    <ul className="list-unstyled">
      {products.map((product, index) => (
        <ListItem key={index} onNavigate={onNavigate} {...product} />
      ))}
    </ul>
  )
}

export default List
