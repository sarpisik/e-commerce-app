import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Col } from 'react-bootstrap';
import './index.css';

export default () => (
  <Jumbotron className="pb-1">
    <h1>Ready to shop?</h1>
    <p>Sign in for the best experience and shop with 100% confidence</p>
    <p className="text-center">
      <Link to={ROUTES.LOGIN} className="btn btn-block btn-primary responsive">
        Sign in
      </Link>
    </p>
    <Link to={ROUTES.SIGN_UP}>Create Account</Link>
  </Jumbotron>
);
