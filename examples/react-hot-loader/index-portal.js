import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './components/App'
import Redbox from 'redbox-react'

const root = document.getElementById('root')
const stylesBox = {
  width: '75%',
  height: '50%',
  background: 'green',
  transform: 'translateZ(0)'
}
const stylesRelative = {
  position: 'relative',
  width: '75%',
  height: '50%',
  background: 'blue'
}
render((
  <div style={stylesBox}>
    <div style={stylesRelative}>
      <AppContainer errorReporter={Redbox}><App /></AppContainer>
    </div>
  </div>
), root)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp />
      </AppContainer>,
      root
    )
  })
}
