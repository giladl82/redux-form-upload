import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)

const ClientApp = () => (
  <Provider store={store}>
      <App />
  </Provider>
)

ReactDOM.render(<ClientApp />, document.getElementById('app'))
