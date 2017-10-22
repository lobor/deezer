import { LOAD, FAILED, OK, SORT, FILTER, ADD, EMPTY } from 'constants/search'
import { sort, getApi, filter } from 'transform/search'

const initialState = {
  resultApi: [],
  showResult: [],
  loading: false,
  failed: false,
  endSearch: false
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
    console.log('ici');
      return { ...state, endSearch: true, loading: false, failed: false };
    case LOAD:
      return { ...state, loading: true, failed: false }
    case SORT:
      return { ...state, showResult: sort(payload.key, state.resultApi.slice(), payload.type) }
    case FILTER:
      return { ...state, showResult: filter(payload.value, payload.key, state.resultApi) }
    case FAILED:
      return { ...state, loading: false, failed: true };
    default:
      return state;
  }
}
