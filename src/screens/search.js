import React from 'react'
import axios from 'axios'

var instance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/search/',
  headers: {
    'Access-Control-Request-Credentials': 'true',
    'Acces-Control-Allow-Origin': '*'
  }
});

export default class Search extends React.Component {
  state = {
    result: [],
    loading: false,
    index: 0
  }

  componentWillMount() {
    window.addEventListener('scroll', this.scroll);
  }

  scroll = (e) => {
    console.log(document.body.offsetHeight, window.scrollY);
    if (document.body.offsetHeight - window.scrollY) {

    }
  }

  onChange = () => {

  }

  onSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ loading: true })

    instance.get(`/track?q=${this.search.value}"&index=${this.state.index}`)
    .then((response) => {
      let result = [];
      for (let res of response.data.data) {
        result.push({
          artist: res.artist.name,
          title: res.title
        })
      }
      this.setState({ result, loading: false })
    })
  }

  sort(key) {
    let { result } = this.state;
    result = result.sort((a, b) => {
      let first = a[key];
      let last = b[key];
      // switch (item.className) {
      //   case 'desc':
      //     first = b[key];
      //     last = a[key];
      //     break;
      // }
      return first.localeCompare(last);
    });

    this.setState({ result });
  }

  checked = (e) => {
    this.setState({ type: e.currentTarget.value })
  }

  render() {
    let { result, loading } = this.state;
    return (
      <div>
        <div>
          <form  onSubmit={this.onSubmit}>
            <input name="search" ref={(input) => this.search = input} type="text" onChange={this.onChange} /> <button>Search</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => this.sort('title')}>
                Titre
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => this.sort('artist')}>
                Artiste
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="2" style={{ textAlign: 'center' }}>Loading...</td></tr>}
            {!loading && result.map((data, i) => {
              return (
                <tr key={i}>
                  <td>
                    {data.title}
                  </td>
                  <td>
                    {data.artist}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
