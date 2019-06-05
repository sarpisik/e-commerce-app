import React from 'react'
import { Card } from 'react-bootstrap'
import Icon from '../../Icon'

const CountryBar = () => {
  return (
    <Card bg="dark" className="country border-0 rounded-0" text="white">
      <Card.Body className="px-0">
        <Icon icon="dolly" /> Deliver to: <a href="#login">Country</a>
      </Card.Body>
    </Card>
  )
}

export default CountryBar
