import React from 'react';
import { Col, Card } from 'react-bootstrap';
import Icon from '../../Icon';
import { withGeoLocation } from '../../../session';

const CountryBar = ({ location: { country = null } }) =>
  country && (
    <Col sm={12} className="text-left">
      <Card bg="dark" className="country border-0 rounded-0" text="white">
        <Card.Body className="px-0">
          <Icon icon="dolly" /> Deliver to:{' '}
          <span className="text-info">{country}</span>
        </Card.Body>
      </Card>
    </Col>
  );

export default withGeoLocation(CountryBar);
