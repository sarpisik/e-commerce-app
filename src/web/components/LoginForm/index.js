import React from 'react';
import { Link } from 'react-router-dom';
import withForm from '../HOCs/withForm';
import { Form, Button } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import withAuthUser from '../../session/withAuthUser';

const INITIAL_STATE = {
  email: '',
  password: '',
  keepLoggedIn: false,
  isLoading: false
};

const LoginForm = ({
  onChange,
  onUpdate,
  onReset,
  handleSession,
  handleLogin,
  ...props
}) => {
  // withForm state
  const { email, password, keepLoggedIn, isLoading } = props;

  const isActive = email === '' || password === '';

  const onSubmit = e => {
    e.preventDefault();
    // Show loading feedback.
    onUpdate({
      isLoading: true
    });

    const formValues = {
      email,
      password,
      keepLoggedIn
    };

    handleSession('login', formValues, () =>
      // Turn off loading feedback on fail
      onUpdate({
        isLoading: false
      })
    );
  };

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
      <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
      <Button variant="primary" type="submit" disabled={isLoading || isActive}>
        {isLoading ? 'Sending... Please do not close the page.' : 'Send'}
      </Button>
    </Form>
  );
};

export default withAuthUser(withForm(INITIAL_STATE)(LoginForm));
