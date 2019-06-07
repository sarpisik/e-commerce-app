import React from 'react';
import withForm from '../HOCs/withForm';
import { Form, Button } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import withAuthUser from '../../session/withAuthUser';

// TODO: Show feedback on form submit

const INITIAL_STATE = {
  email: '',
  userName: '',
  password: '',
  password2: '',
  isLoading: false
};

const SignUpForm = ({
  onChange,
  onUpdate,
  onReset,
  handleSession,
  handleLogin,
  ...props
}) => {
  // withForm state
  const { email, userName, password, password2, isLoading } = props;
  const isActive =
    email === '' ||
    userName === '' ||
    password === '' ||
    password2 === '' ||
    password !== password2;

  const onSubmit = e => {
    e.preventDefault();
    // Show loading feedback.
    onUpdate({
      isLoading: true
    });

    const formValues = {
      email,
      userName,
      password,
      password2
    };

    handleSession('signUp', formValues, () =>
      // Turn off loading feedback on fail.
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
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          name="userName"
          placeholder="Enter User Name"
          onChange={onChange}
          value={userName}
        />
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
        <Form.Control
          type="password"
          name="password2"
          placeholder="Repeat Password"
          onChange={onChange}
          value={password2}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading || isActive}>
        {isLoading ? 'Sending... Please do not close the page.' : 'Send'}
      </Button>
    </Form>
  );
};

export default withAuthUser(withForm(INITIAL_STATE)(SignUpForm));
