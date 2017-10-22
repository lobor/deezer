import { LOAD, FAILED, OK, SORT, FILTER, ADD, EMPTY } from 'constants/search'
import { rest } from 'core'

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

export function filter(value, key) {
  return {
    type: FILTER,
    payload: {
      value,
      key
    }
  }
}
