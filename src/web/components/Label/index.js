import React from 'react'
import { Col } from 'react-bootstrap'

const Label = ({ text, ...rest }) => {
  return <Col {...rest}>{text}</Col>
}

export default Label
