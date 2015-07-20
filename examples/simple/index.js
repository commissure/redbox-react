/* global __DEV__ */
import React from 'react'
import App from './components/App'

function renderApp (App, root) {
  if (__DEV__) {
    const RedBox = require('redbox-react')
    try {
      React.render(<App />, root)
    } catch (e) {
      React.render(<RedBox error={e} />, root)
    }
  } else {
    React.render(<App />, root)
  }
}

renderApp(App, document.getElementById('root'))
