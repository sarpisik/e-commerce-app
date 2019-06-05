import React, { PureComponent } from 'react'
import { Button, Collapse } from 'react-bootstrap'

const toggle = state => ({
  open: !state.open
})

export default class CollapseContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  toggleCollapse = () => this.setState(toggle)

  render() {
    const { title, children, ...props } = this.props
    const { open } = this.state

    return (
      <>
        <Button
          onClick={this.toggleCollapse}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          {...props}>
          {title}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </>
    )
  }
}
