import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CategoriesList } from '../../containers';
import { SideBar, CollapseContainer, FilterProducts } from '../../components';
import { navigateCategoriesList } from '../../components/Helpers';
import SortProducts from '../../components/SortProducts';
import CategoryProductsList from '../../components/Products/CategoryProductsList';

export default class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.initialFilterSetup();

    this.state = {
      // In every time filter options changed,
      // This list will be updated and used to display filtered products.
      productsList: props.productsList
    };
  }

  initialFilterSetup = () => {
    // Amount of repeated companies
    this.companies = {};
    // Amounts of repeated review averages
    this.reviewCounts = {};
    // Amount of stock in/out goods filter.
    this.stockInProducts = 0;
    this.stockOutProducts = 0;
    // Loop on list of products to fill above variables.
    this.props.productsList.forEach(({ company, isActive, avgRev }) => {
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
      this.setState((state, props) => {
        this.initialFilterSetup();
        return { productsList: props.productsList };
      });
    }
  }

  handleSort = sortObjFromChild => {
    switch (sortObjFromChild.price) {
      case 'ascending':
        this.sortByAscending();
        break;
      case 'descending':
        this.sortByDescending();
        break;
    }
  };

  sortByAscending = () => {
    const sortAscending = (num1, num2) => num1 - num2;

    this.setState(state => {
      const productsList = [
        ...state.productsList.sort((productOne, productTwo) =>
          sortAscending(Number(productOne.price), Number(productTwo.price))
        )
      ];
      return {
        productsList
      };
    });
  };

  sortByDescending = () => {
    const sortDescending = (num1, num2) => num2 - num1;

    this.setState(state => {
      const productsList = [
        ...state.productsList.sort((productOne, productTwo) =>
          sortDescending(Number(productOne.price), Number(productTwo.price))
        )
      ];
      return {
        productsList
      };
    });
  };

  handleFilter = filterObjFromChild => {
    // The reset prev filter list.
    this.filteredProductsList = null;
    const filterKeysList = Object.keys(filterObjFromChild);
    filterKeysList.forEach((filterKey, index) => {
      // Any filterKey which is not equal to any falsy bool value means
      // user chooses that filter option so we pass chosen filterKey
      // to further process.
      filterObjFromChild[filterKey] &&
        this.filterReducer(filterKey, filterObjFromChild);
      // If the whole filter process done, update state's products list to filtered list
      index == filterKeysList.length - 1 && this.updateListOnState();
    });
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

  // If this is the initial filter process, use the list from props.
  // Else, keep process with working list.
  handleListToFilter = () =>
    this.filteredProductsList
      ? this.filteredProductsList
      : this.props.productsList;

  filterByAverage = average => {
    this.filteredProductsList = this.handleListToFilter().filter(
      ({ avgRev }) => {
        const optionRating = Number(average),
          productRating = Number(avgRev);
        if (optionRating == 4) return productRating >= optionRating;
        if (optionRating == 3) return productRating >= 3 && productRating < 4;
        if (optionRating == 2) return productRating >= 2 && productRating < 3;
        if (optionRating == 1) return productRating < 2;
        return avgRev;
      }
    );
  };

  filterByPriceRange = ({ min, max }) => {
    this.filteredProductsList = this.handleListToFilter().filter(
      ({ price }) => {
        const productPrice = Number(price);
        if (min && max) {
          return productPrice >= min && productPrice <= max;
        } else if (min) {
          return productPrice >= min;
        } else {
          return productPrice <= max;
        }
      }
    );
  };

  filterByStock = stockOption =>
    (this.filteredProductsList = this.handleListToFilter().filter(
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
    const list = this.props.productsList.filter(
      ({ company }) => name == company
    );
    // If this is not initial filtering process, use already in filtered array.
    // Else, create the initial filtered array for further use cases in the current session.
    if (this.filteredProductsList) {
      this.filteredProductsList = [...this.filteredProductsList, ...list];
    } else {
      this.filteredProductsList = list;
    }
  };

  updateListOnState = () => {
    this.setState({ productsList: this.filteredProductsList });
  };

  render() {
    const { productsList } = this.state;
    return (
      <Container>
        <Row>
          <Col className="sticky mr-md-1 p-0" md={3}>
            <Col className="p-0 bg-white " md={12}>
              <CollapseContainer
                title="Categories"
                variant="outline-primary"
                block>
                <CategoriesList handleClick={navigateCategoriesList} />
              </CollapseContainer>
            </Col>

            <SideBar md={12} toggler="toggle">
              <Row className="m-0">
                <Col sm={12}>
                  <SortProducts handleSort={this.handleSort} />
                </Col>
                <Col sm={12}>
                  <FilterProducts
                    handleFilter={this.handleFilter}
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
            <CategoryProductsList products={productsList} />
          </Col>
        </Row>
      </Container>
    );
  }
}
