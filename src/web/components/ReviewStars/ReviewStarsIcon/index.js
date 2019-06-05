import React from 'react'
import Icon from '../../Icon'

const starTypes = {
  solid: ['fas', 'star'],
  half: 'star-half-alt',
  regular: ['far', 'star']
}

const renderStars = (type, index) => {
  const starIconType = starTypes[type]
  return <Icon key={index} icon={starIconType} />
}

const arrayOfStars = starTypesObj => {
  let starsArr = []
  Object.keys(starTypesObj).forEach(starType => {
    if (starTypesObj[starType]) {
      for (let index = 0; index < starTypesObj[starType]; index++) {
        starsArr.push(starType)
      }
    }
  })
  return starsArr
}

export const starTypesObj = (
  solidStarCount,
  halfStarCount,
  regularStarCount
) => ({
  solid: solidStarCount,
  half: halfStarCount,
  regular: regularStarCount
})

const ReviewStarsIcon = ({ starTypes }) => {
  const starsArray = arrayOfStars(starTypes)
  return <span>{starsArray.map(renderStars)}</span>
}

export default ReviewStarsIcon
