import React from 'react'
import ItemHeader from './itemHeader'
import { throttle } from 'underscore'
import './style.less'

export default class DataGrid extends React.Component {
  elSlider = null;
  index = 0;
  correctionSlide = 0;

  static defaultProps = {
    loading: false,
    failed: false,
    showResult: [],
    header: []
  }

  componentWillMount() {
    this.move = throttle(this.move, 50)
  }

  enable = (e) => {
    this.elSlider = e.currentTarget.previousSibling;
    window.addEventListener("mousemove", this.move);
  }

  disable = () => {
    this.elSlider = null;
    window.removeEventListener("mousemove", this.move);
  }

  move = (e) => {
    this.elSlider.style.width = (e.screenX - this.elSlider.offsetLeft - 2) + 'px'
  }

  render() {
    let { loading, failed, showResult, sort, filter, header } = this.props;
    let sizeHeader = header.length;

    return (
      <table className="datagrid" onMouseUp={this.disable}>
        <thead>
          <tr>
            {header.map((head, i) => {
              return [
                <ItemHeader
                  key={i}
                  {...head}
                  sort={head.sort ? (type) => sort(head.key, type) : null}
                  filter={head.filter ? (e) => filter(e.currentTarget.value, head.key) : null} />,
                (sizeHeader - 1 !== i)
                  ? <th key={`slider_${i}`} className="slider" onMouseDown={this.enable} />
                  : null
              ]
            })}
          </tr>
        </thead>
        <tbody ref={(x) => this.body = x}>
          {showResult.length !== 0 && showResult.map((data, i) => {
            return (
              <tr key={i}>
                {header.map((head, k) => {
                  return [
                    <td key={`${head.key}_${k}`}>
                      {!head.type && data[head.key]}
                      {head.type === 'img' && <img src={data[head.key]} />}
                    </td>,
                    (sizeHeader - 1 !== k) ? <td className="slider" key={`${head.key}_slider_${k}`} /> : null,
                  ]
                })}
              </tr>
            )
          })}

          {loading && <tr><td colSpan="3" style={{ textAlign: 'center' }}>Loading...</td></tr>}

          {failed && <tr><td colSpan="3" style={{ textAlign: 'center' }}>Oups, the request failed</td></tr>}

          {!loading && !failed && !showResult.length && <tr><td className="init" colSpan="3" style={{ textAlign: 'center' }}>Search tracks</td></tr>}
        </tbody>
      </table>
    );
  }
}
