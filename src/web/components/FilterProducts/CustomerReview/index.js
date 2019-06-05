import React from 'react'
import { ReviewStarsIcon } from '../..'
import FormContainer, { RadioBox } from '../../FormContainer'

const customerReviewStarsTypes = [
  { solid: 5, regular: 0 },
  { solid: 4, regular: 1 },
  { solid: 3, regular: 2 },
  { solid: 2, regular: 3 },
  { solid: 1, regular: 4 }
]

const ReviewStarsRadioBox = (
  starTypes,
  index,
  arrLength,
  reviewCount,
  checkedItem,
  onChange
) => (
  <RadioBox
    key={index}
    name="avg"
    label={
      <>
        <ReviewStarsIcon starTypes={starTypes} />
        <span>{reviewCount}</span>
      </>
    }
    value={arrLength - index}
    checked={checkedItem == arrLength - index}
    onChange={onChange}
  />
)

const CustomerReview = ({ checked, onChange, reviewCounts }) => {
  return (
    <FormContainer label="Avg. Customer Review">
      {customerReviewStarsTypes.map((starTypes, index, arr) => {
        const reviewCount = reviewCounts[arr.length - index]
        if (reviewCount)
          return ReviewStarsRadioBox(
            starTypes,
            index,
            arr.length,
            reviewCount,
            checked,
            onChange
          )
      })}
    </FormContainer>
  )
}

export default CustomerReview
