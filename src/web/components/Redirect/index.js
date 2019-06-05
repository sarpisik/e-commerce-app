import React from 'react'
import { Link } from 'react-router-dom'
import { createLocation } from '../Helpers'

export default ({ text, pathname, search, style }) => {
  const direction = createLocation(pathname, search)
  return (
    <Link style={style} to={direction}>
      {text}
    </Link>
  )
}
