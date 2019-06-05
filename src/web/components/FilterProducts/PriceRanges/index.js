import React from 'react'
import FormContainer, { RadioBox } from '../../FormContainer'

const priceRanges = ['Under $25', '$25 to $100', '$100 to $200', '$200 & Above']

const PriceRange = (range, index, checkedItem, onChange) => (
  <RadioBox
    key={index}
    name="price"
    label={range}
    value={index}
    checked={checkedItem == index}
    onChange={onChange}
  />
)

const PriceRanges = ({ checked, onChange }) => {
  return (
    <FormContainer label="Price">
      {priceRanges.map((range, index) =>
        PriceRange(range, index, checked, onChange)
      )}
    </FormContainer>
  )
}

export default PriceRanges
