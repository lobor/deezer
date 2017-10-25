import React from 'react'
import ItemHeader from './itemHeader'
import { throttle } from 'underscore'
import './style.less'

/**
 * Datagrid
 * create header and body of table
 */
export default class DataGrid extends React.Component {
  elSlider = null; // element at modify width when modify column size
  index = 0; // use for call api index

  static defaultProps = {
    loading: false,
    failed: false,
    showResult: [],
    header: []
  }

  /**
   * throttle function move for ameliorate performance
   */
  componentWillMount() {
    this.move = throttle(this.move, 50)
  }

  /**
   * enable event mousemove on mousedown slider
   * @param  {event} e [description]
   */
  enable = (e) => {
    this.elSlider = e.currentTarget.previousSibling;
    window.addEventListener("mousemove", this.move);
  }

  /**
   * disable event mousemove on mouseup slider
   */
  disable = () => {
    this.elSlider = null;
    window.removeEventListener("mousemove", this.move);
  }

  /**
   * event launch when user slide slider
   * @param  {event} e [description]
   */
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
          {/* show result on call */}
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

          {/* show loading text when call */}
          {loading && <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading...</td></tr>}

          {/* show failed text when call failed */}
          {failed && <tr><td colSpan="5" style={{ textAlign: 'center' }}>Oups, the request failed</td></tr>}

          {/* show initial text */}
          {!loading && !failed && !showResult.length && <tr><td className="init" colSpan="5" style={{ textAlign: 'center' }}>Search tracks</td></tr>}
        </tbody>
      </table>
    );
  }
}
