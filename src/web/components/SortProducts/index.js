import React from 'react'
import { Form, Button } from 'react-bootstrap'
import withForm from '../HOCs/withForm'
import FormContainer, { RadioBox } from '../FormContainer'
import { firstLetterUppercase } from '../Helpers'

const INITIAL_STATE = {
  price: null
}

const ASCENDING = 'ascending',
  DESCENDING = 'descending'

const SortProducts = ({ price, onChange, handleSort }) => {
  const onSubmit = e => {
    e.preventDefault()
    handleSort({
      price
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <hr />
      Sort By:
      <hr />
      <FormContainer label="Price">
        <RadioBox
          name="price"
          label={firstLetterUppercase(ASCENDING)}
          value={ASCENDING}
          checked={price == ASCENDING}
          onChange={onChange}
        />
        <RadioBox
          name="price"
          label={firstLetterUppercase(DESCENDING)}
          value={DESCENDING}
          checked={price == DESCENDING}
          onChange={onChange}
        />
      </FormContainer>
      <hr />
      <Button className="mb-3" type="submit" block>
        Submit
      </Button>
      <hr />
    </Form>
  )
}

export default withForm(INITIAL_STATE)(SortProducts)
