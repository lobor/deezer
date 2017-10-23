import React from 'react'

import Button from './../button'
import Input from './../input'

import './style.less'

/**
 * Form for search
 */
export default class Search extends React.Component {
  render() {
    let { submit } = this.props
    return (
      <form className="search" onSubmit={submit}>
        <Input name="search" placeholder="Search" type="text" />
        <Button primary>&#x2315;</Button>
      </form>
    );
  }
}
