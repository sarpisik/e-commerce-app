import React from 'react';
import { ListItem } from '../..';
import withProductsList from '../../HOCs/withProductsList';
import Spinner from '../../Spinner';

const loaderStyle = { bottom: '0.5rem' };

const CategoryProductsList = ({ loading, products, onNavigate }) => {
  return (
    <ul className="list-unstyled responsive">
      {products.map((product, index) => (
        <ListItem key={index} onNavigate={onNavigate} {...product} />
      ))}
      {loading && <Spinner style={loaderStyle} />}
    </ul>
  );
};

export default withProductsList(CategoryProductsList);
