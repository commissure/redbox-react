import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './components/App'
import Redbox from 'redbox-react'

const root = document.getElementById('root')
render(<AppContainer errorReporter={Redbox}><App /></AppContainer>, root)

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
