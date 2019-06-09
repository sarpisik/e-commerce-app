import React from 'react';
import { ProductsListByCategory } from '../../components';

const CategoryPage = ({ location }) => {
  const categoryName = location.search.slice(1);
  return <ProductsListByCategory categoryName={categoryName} />;
};

export default CategoryPage;
