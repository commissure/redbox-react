import test from 'tape'
import {createComponent} from './utils'
import RedBox from '../src'

test('RedBox static displayName', t => {
  t.plan(1)
  t.equal(
    RedBox.displayName,
    'RedBox',
    'correct static displayName property on class'
  )
})

test('RedBox error message', t => {
  t.plan(3)
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
})

// TODO: Tests for the stack frame rendering
