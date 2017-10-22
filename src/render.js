import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import Search from "./screens/search"
import ReduxThunk from 'redux-thunk'
import './styles/base.less'

let store = createStore(combineReducers({
  ...reducers
}), applyMiddleware(ReduxThunk))

ReactDOM.render((
  <Provider store={store}>
    <Search />
  </Provider>
), document.querySelector('#app'));
