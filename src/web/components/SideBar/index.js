import React, { PureComponent } from 'react'
import { Col, ListGroup, Button } from 'react-bootstrap'
import './index.css'

const ToggleButton = ({ handleClick, content }) => (
  <Button
    className="toggle-button"
    onClick={handleClick}
    variant="primary"
    block>
    {content}
  </Button>
)

class SideBar extends PureComponent {
  callbackRef = node => (this.ToggleElement = node)

  onClick = () => this.ToggleElement.classList.toggle('active')

  render() {
    const { toggler, children, ...rest } = this.props
    return (
      <Col
        className="side-bar-toggler bg-white p-0"
        ref={this.callbackRef}
        {...rest}>
        {toggler && (
          <ToggleButton handleClick={this.onClick} content={toggler} />
        )}
        <div className="side-bar-children col ml-md-0 p-0">{children}</div>
      </Col>
    )
  }
}

const RenderList = (item, index, handleClick) => (
  <ListGroup.Item
    onClick={handleClick}
    key={index}
    className="flex-grow-1 px-3">
    {item}
  </ListGroup.Item>
)

export const SideBarList = ({ list, handleClick, ...rest }) => {
  return (
    <ListGroup {...rest}>
      {list.map((item, index) => RenderList(item, index, handleClick))}
    </ListGroup>
  )
}

export default SideBar
