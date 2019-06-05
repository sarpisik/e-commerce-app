import React from 'react'
import ReviewStarsIcon, { starTypesObj } from '../ReviewStarsIcon'

const reviewStarsCalculator = average => {
  const arr = average.split('')
  const solidStarCount = Number(arr[0])
  const halfStarCount = arr[2] >= 5 ? 1 : null
  const regularStarCount = halfStarCount
    ? 5 - solidStarCount - 1
    : 5 - solidStarCount
  return starTypesObj(solidStarCount, halfStarCount, regularStarCount)
}

const ReviewStarsForProductPage = ({ average }) => {
  const starTypes = reviewStarsCalculator(average)
  return <ReviewStarsIcon starTypes={starTypes} />
}

export default ReviewStarsForProductPage
