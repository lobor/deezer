import React from 'react'
import './style.less'

export default class Input extends React.Component {
  static defaultProps = {
    type: 'text',
    placeholder: '',
    name: ''
  };

  render() {
    let { name, placeholder, type, ...props } = this.props;
    return (
      <input className="input" {...props} name={name} placeholder={placeholder} type={type} />
    )
  }
}
