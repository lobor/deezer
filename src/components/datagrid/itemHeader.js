import React from 'react'
import Input from './../input'

/**
 * ItemHeader component
 */
export default class ItemHeader extends React.Component {
  static defaultProps = {
    sort: ()=>{}
  }

  /**
   * event click for filter
   * @param  {event} e [description]
   */
  click = (e) => {
    if (this.props.sort && e.target.tagName !== 'INPUT') {
      let className = this.props.className;

      if (className === 'asc') {
        className = 'desc'
      } else if (className === 'desc') {
        className = null;
      } else {
        className = 'asc';
      }

      this.props.sort(className);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className
  }

  render() {
    let {
      title,
      sort,
      filter,
      type,
      className,
      ...props
    } = this.props;

    var style = {};
    if (type === 'img') {
      style.width = '25px'
    }

    return (
      <th style={style} {...props} onClick={this.click}>
        <span className={className}>
          {title}
          {filter && <label><Input placeholder="filter" type="text" onChange={filter} /></label>}
        </span>
      </th>
    )
  }
}
