import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Label from '../../Label'

const ProductInfo = ({
  label,
  labelSizes = [4, 2],
  description,
  className
}) => {
  return (
    <Row className={`mb-3 ${className}`}>
      {label && <Label xs={labelSizes[0]} sm={labelSizes[1]} text={label} />}
      {description && <Col>{description}</Col>}
    </Row>
  )
}

export default ProductInfo
