import React from 'react'
import "./style.less"

export default class Button extends React.Component {
  static defaultProps = {
    primary: false // use this props for show with color primary
  }
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
