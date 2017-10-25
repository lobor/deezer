import React from 'react'
import { connect } from 'react-redux'
import { debounce } from 'underscore'

import { sort, filter } from 'actions/search'
import { searchTrack } from 'actions/search'
import { DataGrid, Search } from 'components'


/**
 * Connect Datagrid with store
 * @type {[type]}
 */
const DataGridRedux = connect(({ search }) => search, { sort, filter })(DataGrid)

/**
 * Screen of search
 */
export class SearchScreen extends React.Component {
  index = 25;
  value = null;
  request = null;

  /**
   * Debounce scroll for performance
   */
  componentWillUnmount() {
    this.scroll = debounce(this.scroll, 200);
  }

  /**
   * listen when scroll
   */
  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
  }

  /**
   * remove event scroll
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

  /**
   * Call when event scroll. check scroll percent, and if scroll > 80% call api if api not return in previous call 0 items
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  scroll = (e) => {
    var scrollTop = window.scrollY,
        windowHeight = window.innerHeight,
        scrollheight = document.body.scrollHeight;
    if ((scrollTop / (scrollheight - windowHeight)) * 100 > 80 && !this.request && !this.props.endSearch) {
      this.index += 25;
      this.request = this.props.searchTrack(this.value, this.index).then(() => {
        this.request = null
      })
    }
  }

  /**
   * Call when users submit her search
   */
  submit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.value = e.currentTarget.elements[0].value;
    this.props.searchTrack(e.currentTarget.elements[0].value)
  }

  /**
   * never update screen when props change.
   * @return {boolean}           false for not update component
   */
  shouldComponentUpdate() {
    return false
  }

  render() {
    return [<Search ref="search" key="search" submit={this.submit} />, <DataGridRedux key="grid" />];
  }
}

export default connect((state) => state.search, { searchTrack })(SearchScreen);
