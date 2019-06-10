import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const SlideListItem = (
  { _id, name, category },
  index,
  activeIndex,
  onHoverItem,
  onClick
) => {
  const isActive = activeIndex == index ? true : false;
  return (
    <ListGroup.Item
      className="flex-grow-1 px-3"
      active={isActive}
      key={index}
      eventKey={index}
      value={index}
      onClick={() => onClick(category, _id)}
      action
      onMouseEnter={onHoverItem}>
      {name}
    </ListGroup.Item>
  );
};

const SlideList = ({ products, activeIndex, onHoverItem, onClick }) => {
  return (
    <Card className="d-flex flex-column h-100 rounded-0 overflow-auto">
      <Card.Header className="flex-grow-1">HOT DISCOUNT ON</Card.Header>
      <ListGroup variant="flush" className="h-100">
        {products.map((product, index) =>
          SlideListItem(product, index, activeIndex, onHoverItem, onClick)
        )}
      </ListGroup>
    </Card>
  );
};

export default SlideList;
