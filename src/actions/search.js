import { LOAD, FAILED, OK, SORT, FILTER, ADD, EMPTY } from 'constants/search'
import { rest } from 'core'

/**
 * Call api
 * @param  {String} value     Value to search
 * @param  {Number} [index=0] Position of return value
 * @return {Function}           redux-thunks promise
 */
export function searchTrack(value, index = 0) {
  return function (dispatch) {
    dispatch({
      type: LOAD
    })

    return rest.get(`/track?q=${value}&index=${index}`)
      .then((response) => {
        let type = OK;
        if (index) {
          type = ADD;
        }

        if (response.data.total === 0) {
          type = EMPTY
        }

        dispatch({
          type,
          payload: {
            datas: response.data.data
          }
        })
      }).catch(() => {
        dispatch({
          type: FAILED
        })
      })
  }
}

/**
 * Sort data
 * @param  {String} key  column to sort
 * @param  {String} type asc, desc or initial
 * @return {Function}           redux-thunks promise
 */
export function sort(key, type) {
  return function (dispatch) {
    dispatch({
      type: SORT,
      payload: {
        key,
        type
      }
    })
  }
}

/**
 * Filter data
 * @param  {string} value value on inut filter
 * @param  {string} key   key of column to filter
 * @return {Object}       [description]
 */
export function filter(value, key) {
  return {
    type: FILTER,
    payload: {
      value,
      key
    }
  }
}
