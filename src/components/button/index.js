import React from 'react'
import "./style.less"

export default class Button extends React.Component {
  render() {
    let { primary, children, props } = this.props;
    let className = "btn";
    if (primary) {
      className += ' btn-primary'
    }

    return (
      <button {...props} className={className}>{children}</button>
    )
  }
}
