import React from 'react'
import { Spinner } from 'react-bootstrap'
import './index.css'

export default () => (
  <Spinner animation="border" role="status" variant="warning">
    <span className="sr-only">Loading...</span>
  </Spinner>
)
