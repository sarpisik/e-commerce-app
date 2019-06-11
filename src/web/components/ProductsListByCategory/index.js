import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import SortProducts from '../SortProducts';
import SideBar from '../SideBar';
import FilterProducts from '../FilterProducts';
import withScroll from '../HOCs/withScroll';
import CategoriesListBar from '../CategoriesListBar';
import { CategoryProductsList } from '../Products';

const INITIAL_STATE = {
  filterTypes: {},
  sortType: {}
};

class ProductsListByCategory extends PureComponent {
  constructor(props) {
    super(props);

    this.setFiltersSelections();
    this.state = {
      ...INITIAL_STATE
    };
  }

  setFiltersSelections = () => {
    // Amount of repeated companies
    this.companies = {};
    // Amounts of repeated review averages
    this.reviewCounts = {};
    // Amount of stock in/out goods filter.
    this.stockInProducts = 0;
    this.stockOutProducts = 0;
    // Loop on list of products to fill above variables.
    this.props
      .getProductsByCategory(this.props.categoryName)
      .forEach(({ company, isActive, avgRev }) => {
        const avgRevNumber = Math.floor(Number(avgRev));

        // Categorize products by stock in / out
        isActive ? this.stockInProducts++ : this.stockOutProducts++;

        // Categorize brands by product counts
        this.companies[company]
          ? this.companies[company]++
          : (this.companies[company] = 1);

        // Categorize products by review average
        this.reviewCounts[avgRevNumber]
          ? this.reviewCounts[avgRevNumber]++
          : (this.reviewCounts[avgRevNumber] = 1);
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({ ...INITIAL_STATE });
    }
  }

  onSubmitSort = sortType => this.setState({ sortType });

  onSubmitFilters = filterTypes => this.setState({ filterTypes });

  // If this is the initial filter process, use the list from props.
  // Else, keep process with working list.
  getListToFilter = () =>
    this.filteredProductsList.length > 0
      ? this.filteredProductsList
      : this.props.getProductsByCategory(this.props.categoryName);

  renderList = userSelectionsObj => {
    // Reset prev filter list.
    this.filteredProductsList = [];

    this.handleFilter(userSelectionsObj.filterTypes);
    return this.handleSort(userSelectionsObj.sortType, this.getListToFilter());
  };

  handleFilter = filterObjFromChild => {
    const filterKeysList = Object.keys(filterObjFromChild);
    filterKeysList.forEach((filterKey, index) => {
      // Any filterKey which is not equal to any falsy bool value means
      // user chooses that filter option so we pass chosen filterKey
      // to further process.
      filterObjFromChild[filterKey] &&
        this.filterReducer(filterKey, filterObjFromChild);
      // If the whole filter process done, update state's products list to filtered list
      // index == filterKeysList.length - 1 && this.updateListOnState();
    });
    return this.filteredProductsList;
  };

  filterReducer = (filterType, filterObj) => {
    switch (filterType) {
      case 'avg':
        this.filterByAverage(filterObj[filterType]);
        break;
      case 'priceRange':
        this.filterByPriceRange(filterObj[filterType]);
        break;
      case 'stock':
        this.filterByStock(filterObj[filterType]);
        break;

      default:
        this.filterByCompanyName(filterType);
        break;
    }
  };

  filterByAverage = average => {
    this.filteredProductsList = this.getListToFilter().filter(({ avgRev }) => {
      const optionRating = Number(average),
        productRating = Number(avgRev);
      if (optionRating == 4) return productRating >= optionRating;
      if (optionRating == 3) return productRating >= 3 && productRating < 4;
      if (optionRating == 2) return productRating >= 2 && productRating < 3;
      if (optionRating == 1) return productRating < 2;
      return avgRev;
    });
  };

  filterByPriceRange = ({ min, max }) => {
    this.filteredProductsList = this.getListToFilter().filter(({ price }) => {
      const productPrice = Number(price);
      if (min && max) {
        return productPrice >= min && productPrice <= max;
      } else if (min) {
        return productPrice >= min;
      } else {
        return productPrice <= max;
      }
    });
  };

  filterByStock = stockOption =>
    (this.filteredProductsList = this.getListToFilter().filter(
      ({ isActive }) => {
        if (stockOption === '1') return isActive == true;
        if (stockOption === '2') return isActive == false;
        return isActive || !isActive;
      }
    ));

  filterByCompanyName = name => {
    // We concat the filter arrays for the filter operations
    // by checkbox options. To do that for the first time of the filter
    // process, we use list from props. Because if the selected
    // company names are more than one, we need to loop over the
    // original list from props. Otherwise it will loop over already
    // filtered list, which includes one company name only.
    const list = this.props
      .getProductsByCategory(this.props.categoryName)
      .filter(({ company }) => name == company);
    // If this is not initial filtering process, use already in filtered array.
    // Else, create the initial filtered array for further use cases in the current session.
    this.filteredProductsList = [...this.filteredProductsList, ...list];
  };

  handleSort = (sortObjFromChild, productsList) => {
    switch (sortObjFromChild.price) {
      case 'ascending':
        return this.sortByAscending(productsList);
      case 'descending':
        return this.sortByDescending(productsList);
      default:
        return productsList;
    }
  };

  sortByAscending = productsList => {
    const sortAscending = (num1, num2) => num1 - num2;
    return [
      ...productsList.sort((productOne, productTwo) =>
        sortAscending(Number(productOne.price), Number(productTwo.price))
      )
    ];
  };

  sortByDescending = productsList => {
    const sortDescending = (num1, num2) => num2 - num1;

    return [
      ...productsList.sort((productOne, productTwo) =>
        sortDescending(Number(productOne.price), Number(productTwo.price))
      )
    ];
  };

  render() {
    const { filterTypes, sortType } = this.state;
    this.setFiltersSelections();
    const list =
      Object.keys(filterTypes).length > 0 || Object.keys(sortType).length > 0
        ? this.renderList(this.state)
        : this.props.getProductsByCategory(this.props.categoryName);
    return (
      <Row>
        <Col className="sticky mr-md-1 p-0" md={3}>
          <CategoriesListBar />
          <SideBar md={12} toggler="Filter & Sort">
            <Row className="m-0">
              <Col sm={12}>
                <SortProducts handleSort={this.onSubmitSort} />
              </Col>
              <Col sm={12}>
                <FilterProducts
                  handleFilter={this.onSubmitFilters}
                  reviewCounts={this.reviewCounts}
                  stockInProductsCount={this.stockInProducts}
                  stockOutProductsCount={this.stockOutProducts}
                  companies={this.companies}
                  locationKey={this.props.location.key}
                />
              </Col>
            </Row>
          </SideBar>
        </Col>
        <Col sm>
          <CategoryProductsList loading={this.props.loading} products={list} />
        </Col>
      </Row>
    );
  }
}
export default withScroll(ProductsListByCategory);
