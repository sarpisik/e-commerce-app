import React, { PureComponent } from 'react';
import { Form, Button } from 'react-bootstrap';
import CustomerReview from './CustomerReview';
import PriceRanges from './PriceRanges';
import CompaniesList from './CompaniesList';
import StockAvailability from './StockAvailability';

const priceRanges = {
  0: { max: 25 },
  1: { min: 26, max: 100 },
  2: { min: 101, max: 200 },
  3: { min: 201 }
};

export default class FilterProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avg: null,
      price: null,
      stock: null,
      ...this.updateCompanyNames(props.companies)
    };
  }

  componentDidUpdate(prevProps) {
    // If the category page changed, update company names.
    if (prevProps.companies !== this.props.companies) {
      this.setState({
        ...this.updateCompanyNames(this.props.companies)
      });
    }
  }

  updateCompanyNames = companies => {
    // Update the static initial state through dynamic company names
    let companiesList = {};
    const companyNamesAndProductsQuantitiesList = Object.keys(companies).map(
      company => {
        // Initial checkbox value
        companiesList[company] = false;
        const productsCount = companies[company];
        // Checkbox label -> Company name + (products quantities)
        return { company, productsCount };
      }
    );
    return {
      companyNamesAndProductsQuantitiesList,
      ...companiesList
    };
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    });
  };

  handleSubmit = e => {
    const { handleFilter } = this.props;
    const {
      avg,
      price,
      stock,
      companyNamesAndProductsQuantitiesList,
      ...companies
    } = this.state;
    const priceRange = priceRanges[price];

    handleFilter({
      ...companies,
      avg,
      priceRange,
      stock
    });
    e.preventDefault();
  };

  render() {
    const {
      reviewCounts,
      stockInProductsCount,
      stockOutProductsCount
    } = this.props;
    const {
      avg,
      price,
      stock,
      companyNamesAndProductsQuantitiesList,
      ...companies
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        Filter By:
        <hr />
        <CustomerReview
          checked={avg}
          onChange={this.handleChange}
          reviewCounts={reviewCounts}
        />
        <hr />
        <PriceRanges checked={price} onChange={this.handleChange} />
        <hr />
        <CompaniesList
          list={companyNamesAndProductsQuantitiesList}
          stateList={companies}
          onChange={this.handleChange}
        />
        <hr />
        <StockAvailability
          checked={stock}
          stockInProductsCount={stockInProductsCount}
          stockOutProductsCount={stockOutProductsCount}
          onChange={this.handleChange}
        />
        <hr />
        <Button className="mb-3" type="submit" block>
          Submit
        </Button>
      </Form>
    );
  }
}
