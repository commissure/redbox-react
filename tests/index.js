import React from 'react'
import test from 'tape'
import {createComponent} from './utils'
import errorStackParserMock from './errorStackParserMock'
import framesStub from './framesStub.json'
import framesStubAbsoluteFilenames from './framesStubAbsoluteFilenames.json'
import RedBox from '../src'
import style from '../src/style'
import './lib';


const beforeEach = (framesStub) => {
  RedBox.__Rewire__('ErrorStackParser', errorStackParserMock(framesStub))
}

const afterEach = () => {
  RedBox.__ResetDependency__('ErrorStackParser')
}

test('RedBox static displayName', t => {
  t.plan(1)
  beforeEach(framesStub)
  t.equal(
    RedBox.displayName,
    'RedBox',
    'correct static displayName property on class'
  )
  afterEach()
})

test('RedBox error message', t => {
  t.plan(3)
  beforeEach(framesStub)
  const ERR_MESSAGE = 'funny error name'
  const error = new Error(ERR_MESSAGE)
  const component = createComponent(RedBox, {error})
  // renderedError = div.redbox > div.message > *
  const renderedError = component
    .props.children[0]
    .props.children
  t.equal(
    renderedError[0],
    'Error',
    'Main error message begins with error type'
  )
  t.equal(
    renderedError[1],
    ': ',
    'Error type is followed by a colon and white space.'
  )
  t.equal(
    renderedError[2],
    ERR_MESSAGE,
    'Main error message ends with message originally supplied to error constructor.'
  )
  afterEach()
})

test('RedBox stack trace', t => {
  t.plan(1)
  beforeEach(framesStub)
  const error = new Error()
  const component = createComponent(RedBox, {error})

  const renderedStack = component
    .props.children[1]

  t.deepEqual(
    renderedStack,
    <div style={style.stack}>
      <div style={style.frame} key={0}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="webpack:///./components/App.js?">webpack:///./components/App.js?:45:12</a>
        </div>
      </div>
      <div style={style.frame} key={1}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="webpack:///./~/react-hot-loader/~/react-hot-api/modules/makeAssimilatePrototype.js?">webpack:///./~/react-hot-loader/~/react-hot-api/modules/makeAssimilatePrototype.js?:17:41</a>
        </div>
      </div>
    </div>
  )

  afterEach()
})

test('RedBox with filename from react-transform-catch-errors', t => {
  t.plan(1)
  beforeEach(framesStub)
  const error = new Error()
  const filename = 'some-optional-webpack-loader!/filename'
  const component = createComponent(RedBox, {error, filename})

  const renderedStack = component
    .props.children[1]

  t.deepEqual(
    renderedStack,
    <div style={style.stack}>
      <div style={style.frame} key={0}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="file:///filename">/filename</a>
        </div>
      </div>
      <div style={style.frame} key={1}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="webpack:///./~/react-hot-loader/~/react-hot-api/modules/makeAssimilatePrototype.js?">webpack:///./~/react-hot-loader/~/react-hot-api/modules/makeAssimilatePrototype.js?:17:41</a>
        </div>
      </div>
    </div>
  )
  afterEach()
})

test('RedBox with filename and editorScheme', t => {
  t.plan(1)
  beforeEach(framesStub)
  const error = new Error()
  const filename = 'some-optional-webpack-loader!/filename'
  const editorScheme = 'subl'
  const component = createComponent(RedBox, {error, filename, editorScheme})

  const renderedStack = component
    .props.children[1]

  t.deepEqual(
    renderedStack,
    <div style={style.stack}>
      <div style={style.frame} key={0}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///filename">/filename</a>
        </div>
      </div>
      <div style={style.frame} key={1}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="webpack:///./~/react-hot-loader/~/react-hot-api/modules/makeAssimilatePrototype.js?">webpack:///./~/react-hot-loader/~/react-hot-api/modules/makeAssimilatePrototype.js?:17:41</a>
        </div>
      </div>
    </div>
  )
  afterEach()
})

test('RedBox with absolute filenames', t => {
  t.plan(1)
  beforeEach(framesStubAbsoluteFilenames)
  const error = new Error()
  const filename = 'some-optional-webpack-loader!/filename'
  const editorScheme = 'subl'
  const component = createComponent(RedBox, {error, filename, editorScheme})

  const renderedStack = component
    .props.children[1]

  t.deepEqual(
    renderedStack,
    <div style={style.stack}>
      <div style={style.frame} key={0}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///components/App.js&line=45&column=12">/components/App.js:45:12</a>
        </div>
      </div>
      <div style={style.frame} key={1}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///some-path/modules/makeAssimilatePrototype.js&line=17&column=41">/some-path/modules/makeAssimilatePrototype.js:17:41</a>
        </div>
      </div>
    </div>
  )
  afterEach()
})

test('RedBox with absolute filenames but unreliable line numbers', t => {
  t.plan(1)
  beforeEach(framesStubAbsoluteFilenames)
  const error = new Error()
  const filename = 'some-optional-webpack-loader!/filename'
  const editorScheme = 'subl'
  const useLines = false
  const component = createComponent(RedBox, {error, filename, editorScheme, useLines})

  const renderedStack = component
    .props.children[1]

  t.deepEqual(
    renderedStack,
    <div style={style.stack}>
      <div style={style.frame} key={0}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///components/App.js">/components/App.js</a>
        </div>
      </div>
      <div style={style.frame} key={1}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///some-path/modules/makeAssimilatePrototype.js">/some-path/modules/makeAssimilatePrototype.js</a>
        </div>
      </div>
    </div>
  )
  afterEach()
})

test('RedBox with absolute filenames but unreliable column numbers', t => {
  t.plan(1)
  beforeEach(framesStubAbsoluteFilenames)
  const error = new Error()
  const filename = 'some-optional-webpack-loader!/filename'
  const editorScheme = 'subl'
  const useColumns = false
  const component = createComponent(RedBox, {error, filename, editorScheme, useColumns})

  const renderedStack = component
    .props.children[1]

  t.deepEqual(
    renderedStack,
    <div style={style.stack}>
      <div style={style.frame} key={0}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///components/App.js&line=45">/components/App.js:45</a>
        </div>
      </div>
      <div style={style.frame} key={1}>
        <div>App.render</div>
        <div style={style.file}>
          <a style={style.linkToFile} href="subl://open?url=file:///some-path/modules/makeAssimilatePrototype.js&line=17">/some-path/modules/makeAssimilatePrototype.js:17</a>
        </div>
      </div>
    </div>
  )
  afterEach()
})
