import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import Icon from '../../Icon';
import withForm from '../../HOCs/withForm';
import withProducts from '../../../session/withProducts';
import './index.css';
import { CategoryProductsList } from '../../Products';
import * as HISTORY from '../../../constants/history';
import * as ROUTES from '../../../constants/routes';
import { handleNavigation, Search } from '../../Helpers';

const INITIAL_STATE = {
  search: ''
};

const navigateSearchPage = search =>
  handleNavigation({
    actionType: HISTORY.PUSH,
    action: {
      pathname: ROUTES.SEARCH,
      search
    }
  });

const SearchBar = ({ onChange, onReset, search, productsState }) => {
  // Search products in database
  const onSubmit = e => {
    e.preventDefault();
    const filteredSearchText = Search.filterText(search);
    if (filteredSearchText) {
      navigateSearchPage(filteredSearchText);
      onReset();
    }
  };

  // Search products in Redux
  const foundProducts = search && Search.getFoundItems(search, productsState);
  return (
    <Form onSubmit={onSubmit} onChange={onChange} className="flex-fill px-sm-3">
      <InputGroup className="search-container">
        <FormControl name="search" placeholder="Search" />
        <InputGroup.Append>
          <Button type="submit" variant="outline-secondary">
            <Icon icon="search" />
          </Button>
        </InputGroup.Append>
        {(foundProducts || []).length > 0 && (
          <div className="result bg-light">
            <CategoryProductsList products={foundProducts} />
            <a onClick={() => navigateSearchPage(search)}>
              <div>Load more...</div>
            </a>
          </div>
        )}
      </InputGroup>
    </Form>
  );
};

export default withProducts(withForm(INITIAL_STATE)(SearchBar));
