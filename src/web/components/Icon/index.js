import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ icon, children, ...rest }) => (
  <>
    <FontAwesomeIcon {...rest} icon={icon} />
    <span className="ml-1">{children}</span>
  </>
)
