import React from 'react'
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import Icon from '../../Icon'

const SearchBar = () => {
  return (
    <Form className="flex-fill px-sm-3">
      <InputGroup>
        <FormControl placeholder="Search" />
        <InputGroup.Append>
          <Button variant="outline-secondary">
            <Icon icon="search" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}

export default SearchBar
