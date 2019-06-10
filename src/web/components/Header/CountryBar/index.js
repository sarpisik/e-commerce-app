import React from 'react';
import { Card } from 'react-bootstrap';
import Icon from '../../Icon';
import { withGeoLocation } from '../../../session';

const CountryBar = ({ location }) =>
  location.country ? (
    <Card bg="dark" className="country border-0 rounded-0" text="white">
      <Card.Body className="px-0">
        <Icon icon="dolly" /> Deliver to:{' '}
        <span className="text-info">{location.country}</span>
      </Card.Body>
    </Card>
  ) : null;

export default withGeoLocation(CountryBar);
