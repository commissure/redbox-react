import test from 'tape'
import RedBox from '../tmp/redbox.js'

test('RedBox static name', t => {
  t.plan(1)
  t.equal(
    RedBox.displayName,
    'RedBox',
    'correct static ES6 name property on class'
  )
})

