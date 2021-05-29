import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './assets/styles/main.css'
import 'react-quill/dist/quill.snow.css' // ES6
import './assets/styles/styles.scss'
import App from './app/App'
import { Provider } from 'react-redux'
import ConfigureStore from './redux/stores/configureStore'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
const store = ConfigureStore()
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
