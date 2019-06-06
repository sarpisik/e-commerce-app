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
  apiCall,
  handleLogin,
  ...props
}) => {
  // withForm state
  const { email, userName, password, password2, isLoading } = props;
  const onSubmit = e => {
    e.preventDefault();

    // If the fields are validated, make API call.
    // Else, null.
    if ((email, userName, password, password2 && password === password2)) {
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

      apiCall(process.env.API_SIGN_UP, formValues)
        .then(({ success, message, ...authUser }) => {
          // Show off loading feedback.
          onUpdate({
            isLoading: false
          });
          // If the user signed up successfully...
          if (success) {
            // Set user credentials to redux store
            handleLogin(authUser);
            // Reset the form.
            onReset();
            // If the user navigated to here from somewhere, send back.
            // Else, replace to cart page.
            props.location.state
              ? props.history.goBack()
              : props.history.replace(ROUTES.CART);
          } else {
            // Show why sign up failed.
            alert(message);
          }
        })
        .catch(err => console.error(err));
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

export default withAuthUser(withForm(INITIAL_STATE)(SignUpForm));
