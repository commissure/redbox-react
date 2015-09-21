import React, { Component } from 'react'

export default class App extends Component {
  render () {
    return <div>{this.props()}</div>
  }
}

if (module.hot) {
  module.hot.accept()
}
