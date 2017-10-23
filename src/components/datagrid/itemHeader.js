import React from 'react'
import Input from './../input'

/**
 * ItemHeader component
 */
export default class ItemHeader extends React.Component {
  static defaultProps = {
    sort: ()=>{}
  }

  state = {
    className: null
  }

  /**
   * event click for filter
   * @param  {event} e [description]
   */
  click = (e) => {
    if (this.props.sort && e.target.tagName !== 'INPUT') {
      let className = this.state.className;

      if (className === 'asc') {
        className = 'desc'
      } else if (className === 'desc') {
        className = null;
      } else {
        className = 'asc';
      }

      this.props.sort(className);
      this.setState({ className });
    }
  }

  render() {
    let {
      title,
      sort,
      filter,
      type,
      ...props
    } = this.props;

    let { className } = this.state;

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
