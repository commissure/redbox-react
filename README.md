# redbox-react

The red box (aka red screen of death) renders an error in this “pretty” format:

<img src="http://i.imgur.com/9Jhlibk.png" alt="red screen of death" />

## Usage
This isn’t useful per se, but you get the API:

```javascript
const RedBox = require('redbox-react')
const e = new Error('boom')
const box = <RedBox error={e} />
```

And a more useful example:

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

## Will this catch all errors for me?
No. As you can see above, this is only a UI component for rendering errors and their stack traces.

## Will you integrate this with react-hot-api?
I will try my best. There is already a PR for this: https://github.com/gaearon/react-hot-api/pull/17
