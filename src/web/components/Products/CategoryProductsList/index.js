import React from 'react';
import { ListItem } from '../..';
import withProductsList from '../../HOCs/withProductsList';

const CategoryProductsList = ({ products, onNavigate }) => {
  return (
    <ul className="list-unstyled responsive">
      {products.map((product, index) => (
        <ListItem key={index} onNavigate={onNavigate} {...product} />
      ))}
    </ul>
  );
};

export default withProductsList(CategoryProductsList);
