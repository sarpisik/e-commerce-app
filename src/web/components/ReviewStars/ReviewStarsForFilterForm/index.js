import React from 'react'
import ReviewStarsIcon, { starTypesObj } from '../ReviewStarsIcon'

const ReviewStarsForFilterForm = ({ ...props }) => {
  const starsObj = starTypesObj({ ...props })
  return <ReviewStarsIcon starTypes={starsObj} />
}

export default ReviewStarsForFilterForm
