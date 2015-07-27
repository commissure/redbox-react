import React, {Component, PropTypes} from 'react'
import {redbox, message, stack, frame, file} from './redbox.css'
import ErrorStackParser from 'error-stack-parser'

export default class RedBox extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error).isRequired
  }
  static displayName = 'RedBox'
  render () {
    const {error} = this.props
    const frames = ErrorStackParser.parse(error).map(f => {
      const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`
      return (
        <div className={frame}>
          <div>{f.functionName}</div>
          <div className={file}>
            <a href={link}>{link}</a>
          </div>
        </div>
      )
    })
    return (
      <div className={redbox}>
        <div className={message}>{error.name}: {error.message}</div>
        <div className={stack}>{frames}</div>
      </div>
    )
  }
}
