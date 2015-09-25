import React, {Component, PropTypes} from 'react'
import style from './style.js'
import ErrorStackParser from 'error-stack-parser'
import assign from 'object-assign'

export default class RedBox extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error).isRequired
  }
  static displayName = 'RedBox'
  render () {
    const {error} = this.props
    const {redbox, message, stack, frame, file, linkToFile} = assign({}, style, this.props.style)

    const frames = ErrorStackParser.parse(error).map((f, index) => {
      const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`
      return (
        <div style={frame} key={index}>
          <div>{f.functionName}</div>
          <div style={file}>
            <a href={link} style={linkToFile}>{link}</a>
          </div>
        </div>
      )
    })
    return (
      <div style={redbox}>
        <div style={message}>{error.name}: {error.message}</div>
        <div style={stack}>{frames}</div>
      </div>
    )
  }
}
