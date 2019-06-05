import React from 'react'
import { LoginForm } from '../../containers'
import { Container, Row, Col } from 'react-bootstrap'
import './index.css'

const LoginPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <Col className="login-form-col pt-3" sm={9}>
          <h3>Login</h3>
          <hr />
        </Col>

        <Col className="login-form-col" sm={4}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
