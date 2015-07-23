import React, { Component } from 'react'

export default class App extends Component {
  render () {
    // return <div>App</div>
    return <div>{this.props()}</div>
  }
}
