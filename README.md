# redbox-react

[![Build Status](https://travis-ci.org/KeywordBrain/redbox-react.svg?branch=master)](https://travis-ci.org/KeywordBrain/redbox-react)

The red box (aka red screen of death) renders an error in this “pretty” format:

<img src="http://i.imgur.com/9Jhlibk.png" alt="red screen of death" width="700" />

## Usage
Catch an error and give it to react-redbox. Works with
* [react-hot-loader](https://github.com/gaearon/react-hot-loader) (see [example](https://github.com/KeywordBrain/redbox-react/tree/master/examples/react-hot-loader-example), relies on changes in currently unmerged [pull request](https://github.com/gaearon/react-hot-loader/pull/167))
* [babel-plugin-react-hot](https://github.com/loggur/babel-plugin-react-hot) & [babel-plugin-react-error-catcher](https://github.com/loggur/babel-plugin-react-error-catcher) (see [example](https://github.com/KeywordBrain/redbox-react/tree/master/examples/babel-plugin-react-hot))

or manually:

```javascript
const RedBox = require('redbox-react')
const e = new Error('boom')
const box = <RedBox error={e} />
```

Here is a more useful, full-fleged example:

```javascript
/* global __DEV__ */
import React from 'react'
import App from './components/App'

const root = document.getElementById('root')

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
```

## What is this good for?
An error that's only in the console is only half the fun. Now you can use all the wasted space where your app would be if it didn’t crash to display the error that made it crash. You should use this in development only.

## Will this catch errors for me?
No. As you can see above, this is only a UI component for rendering errors and their stack traces. It's works great with other solutions, that automate the error catching for you, see the [examples](https://github.com/KeywordBrain/redbox-react/tree/master/examples).

## Will you integrate this with react-hot-api?
There is already a PR for this: https://github.com/gaearon/react-hot-api/pull/17.
