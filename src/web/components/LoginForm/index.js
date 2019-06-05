import React from 'react'
import { withRouter } from 'react-router-dom'
import withForm from '../HOCs/withForm'
import { Form, Button } from 'react-bootstrap'
import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
  email: '',
  password: '',
  keepLoggedIn: false,
  isLoading: false
}

// demo user
const authUser = {
  cart: {
    '5ccd8c0b4851917ebb2bf3d2': {
      color: 'grey',
      count: 2
    }
  },
  favorites: [
    {
      _id: '5ccd8c0b14a5a0fa9c7c9806'
    },
    {
      _id: '5ccd8c0b341b7e4da62404ee'
    }
  ]
}

const LoginForm = ({ onChange, onUpdate, onReset, handleLogin, ...props }) => {
  const { email, password, keepLoggedIn, isLoading } = props
  console.log(props.history)
  const onSubmit = e => {
    e.preventDefault()
    onUpdate({
      isLoading: true
    })
    const formValues = {
      email,
      password,
      keepLoggedIn
    }
    console.log(formValues)
    simulateNetworkRequest()
      .then(() => {
        authUser.email = email
        authUser.password = password
        handleLogin(authUser)
      })
      .then(() =>
        onUpdate({
          isLoading: false
        })
      )
      .then(() => onReset())
      .then(() => {
        props.location.state
          ? props.history.goBack()
          : props.history.replace(ROUTES.CART)
      })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={onChange}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={password}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          name="keepLoggedIn"
          label="Keep me logged in"
          onChange={onChange}
          checked={keepLoggedIn}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Sending... Please do not close the page.' : 'Send'}
      </Button>
    </Form>
  )
}

export default withRouter(withForm(INITIAL_STATE)(LoginForm))

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000))
}
