import React from 'react';
import Icon from '../../../Icon';
import { Badge } from 'react-bootstrap';

const badgeSize = {
  padding: '0.1em .3em'
};

const IconLink = ({ name, icon, badge = null }) => (
  <Icon className="link-icon ml-md-3" icon={icon}>
    {name}
    {badge && (
      <Badge
        style={badgeSize}
        className="position-absolute ml-1"
        variant="warning">
        {badge}
      </Badge>
    )}
  </Icon>
);

export default IconLink;
