import React from 'react'
import FormContainer, { RadioBox } from '../../FormContainer'

const stockOptionsList = ['All', 'In Stocks', 'Out Of Stocks']

const StockOptionItem = (
  option,
  index,
  checkedItem,
  stockInProductsCount,
  stockOutProductsCount,
  onChange
) => {
  const label = index
    ? index < 2
      ? `${option} (${stockInProductsCount})`
      : `${option} (${stockOutProductsCount})`
    : option
  return (
    <RadioBox
      key={index}
      name="stock"
      label={label}
      value={index}
      checked={checkedItem == index}
      onChange={onChange}
    />
  )
}
const StockAvailability = ({
  stockInProductsCount,
  stockOutProductsCount,
  checked,
  onChange
}) => {
  return (
    <FormContainer label="Availability">
      {stockOptionsList.map((option, index) =>
        StockOptionItem(
          option,
          index,
          checked,
          stockInProductsCount,
          stockOutProductsCount,
          onChange
        )
      )}
    </FormContainer>
  )
}

export default StockAvailability
