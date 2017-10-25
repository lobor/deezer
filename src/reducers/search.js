import { LOAD, FAILED, OK, SORT, FILTER, ADD, EMPTY } from 'constants/search'
import { sort, getApi, filter, resetHeader } from 'transform/search'

const initialState = {
  resultApi: [], // result return by api
  showResult: [], // result to show
  loading: false, // show loading text
  failed: false, // show failed text
  endSearch: false,  // not call api on infinite scroll
  header: [
    {
      title: '',
      key: 'picture',
      type: 'img',
      className: null
    },
    {
      title: 'Titre',
      key: 'title',
      sort: true,
      filter: true,
      className: null
    },
    {
      title: 'Artist',
      key: 'artist',
      sort: true,
      filter: true,
      className: null
    }
  ]
};

export default function search (state = initialState, { type, payload }) {
  let dataFormatted;
  switch (type) {
    case OK:
      dataFormatted = getApi(payload.datas);
      return { ...state, loading: false, failed: false,  resultApi: dataFormatted, showResult: dataFormatted, endSearch: false };
    case ADD:
      dataFormatted = state.resultApi.concat(getApi(payload.datas));
      return { ...state, loading: false, failed: false,  resultApi: dataFormatted, showResult: dataFormatted };
    case EMPTY:
      return { ...state, endSearch: true, loading: false, failed: false };
    case LOAD:
      return { ...state, loading: true, failed: false }
    case SORT:
      return { ...state, showResult: sort(payload.key, state.resultApi.slice(), payload.type), header: resetHeader(payload.key, payload.type, state.header.slice()) }
    case FILTER:
      return { ...state, showResult: filter(payload.value, payload.key, state.resultApi) }
    case FAILED:
      return { ...state, loading: false, failed: true };
    default:
      return state;
  }
}
