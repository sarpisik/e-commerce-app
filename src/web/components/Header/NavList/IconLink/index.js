import React from 'react';
import Icon from '../../../Icon';

const IconLink = ({ name, icon }) => (
  <Icon className="link-icon" icon={icon}>
    {name}
  </Icon>
);

export default IconLink;
