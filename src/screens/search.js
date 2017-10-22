import React from 'react'
import { connect } from 'react-redux'
import { debounce } from 'underscore'

import { sort, filter } from 'actions/search'
import { searchTrack } from 'actions/search'
import { DataGrid, Search } from 'components'


const headerDatagrid = [
  {
    title: '',
    key: 'picture',
    type: 'img'
  },
  {
    title: 'Titre',
    key: 'title',
    sort: true,
    filter: true
  },
  {
    title: 'Artist',
    key: 'artist',
    sort: true,
    filter: true
  }
];

const DataGridRedux = connect(({ search }) => ({ ...search, header: headerDatagrid }), { sort, filter })(DataGrid)

export class SearchScreen extends React.Component {
  index = 25;
  value = null;
  request = null;

  componentWillUnmount() {
    this.scroll = debounce(this.scroll, 200);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

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

  submit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.value = e.currentTarget.elements[0].value;
    this.props.searchTrack(e.currentTarget.elements[0].value)
  }

  shouldComponentUpdate(nextProps) {
    return false
  }

  render() {
    return [<Search ref="search" key="search" submit={this.submit} />, <DataGridRedux key="grid" />];
  }
}

export default connect((state) => state.search, { searchTrack })(SearchScreen);
