import React from 'react';
import { Media } from 'react-bootstrap';
import Image from '../Image';
import { ReviewStarsForProductPage } from '../ReviewStars';
import './index.css';

const ListItemImg = ({ src, alt }) => (
  <div className="col-4 col-sm-3 img-container">
    <Image className="img-fluid w-100" imgSrc={src} alt={alt} />
  </div>
);

// If order count exist, this is cart products list.
// Else, this is a category products list so display review stars.
const ListItemBody = ({ name, price, count, avgRev }) => (
  <Media.Body className="col">
    <h5>{name.toUpperCase()}</h5>
    <p>{price}</p>
    {count ? (
      <p className="font-weight-bold">
        <span className="mr-1">Order Count</span>
        {count}
      </p>
    ) : (
      <p>
        <ReviewStarsForProductPage average={avgRev} />
        <span className="ml-1">16 Reviews</span>
      </p>
    )}
  </Media.Body>
);

const ListItem = ({
  _id,
  name,
  picture,
  category,
  onNavigate,
  ...attributes
}) => (
  <Media
    onClick={() => onNavigate(category, _id)}
    className="row align-items-center my-1 bg-white"
    as="li">
    <ListItemImg src={picture} alt={name} />
    <ListItemBody name={name} {...attributes} />
  </Media>
);

export default ListItem;
