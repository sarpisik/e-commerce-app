import React from 'react';
import { withRouter } from 'react-router-dom';
import withForm from '../HOCs/withForm';
import { Form, Button } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  userName: '',
  password: '',
  password2: '',
  isLoading: false
};

const SignUpForm = ({ onChange, onUpdate, onReset, handleLogin, ...props }) => {
  const { email, userName, password, password2, isLoading } = props;
  const onSubmit = e => {
    e.preventDefault();
    if ((email, userName, password, password2 && password === password2)) {
      onUpdate({
        isLoading: true
      });
      const formValues = {
        email,
        userName,
        password,
        password2
      };
      simulateNetworkRequest(formValues)
        .then(response => response.json())
        .then(authUser => {
          console.log(authUser);
          // authUser.email = email;
          // authUser.password = password;
          // handleLogin(authUser);
        })
        .then(() =>
          onUpdate({
            isLoading: false
          })
        )
        .then(() => onReset())
        // .then(() => {
        //   props.location.state
        //     ? props.history.goBack()
        //     : props.history.replace(ROUTES.CART);
        // })
        .catch(err => {
          console.error(err);
        });
    } else {
      return null;
    }
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
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Sending... Please do not close the page.' : 'Send'}
      </Button>
    </Form>
  );
};

export default withRouter(withForm(INITIAL_STATE)(SignUpForm));

function simulateNetworkRequest(formValues) {
  return fetch(process.env.API_SIGN_UP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formValues)
  });
}
