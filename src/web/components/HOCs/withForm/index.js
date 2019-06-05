import React, { PureComponent } from 'react'

const withForm = childComponentState => Component => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        ...childComponentState
      }
    }

    onUpdate = obj => this.setState({ ...obj })

    onChange = ({ target }) => {
      this.setState({
        [target.name]:
          target.type === 'checkbox' ? target.checked : target.value
      })
    }

    onReset = () => this.setState({ ...childComponentState })

    render() {
      return (
        <Component
          onChange={this.onChange}
          onUpdate={this.onUpdate}
          onReset={this.onReset}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  return WithForm
}

export default withForm
