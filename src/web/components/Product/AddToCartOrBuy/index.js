import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import ProductInfo from '../ProductInfo'

const AddToCartOrBuy = ({ handleSubmit, disabled }) => (
  <ProductInfo
    className="m-0"
    description={
      <ButtonGroup className="mb-3 d-flex justify-content-center w-100">
        <Button
          name="cart"
          onClick={handleSubmit}
          disabled={disabled}
          variant="outline-secondary">
          ADD TO CART
        </Button>
        <Button
          name="buy"
          onClick={handleSubmit}
          disabled={disabled}
          variant="outline-secondary">
          BUY NOW
        </Button>
      </ButtonGroup>
    }
  />
)

export default AddToCartOrBuy
