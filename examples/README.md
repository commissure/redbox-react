# Examples
At the time of this writing, we are in a bit of a limbo. `react-hot-loader` [version 3](https://github.com/gaearon/react-hot-loader/pull/240) is about to be released, but (possibly among other things) is waiting on [ErrorBoundaries in react](https://github.com/facebook/react/pull/6020), which is likely to land in the next react release.

Because of this, the examples have been updated to reflect the current state of deprecation and anticipation:
* The [`react-hot-loader` example](react-hot-loader/) features the upcoming version 3 (currently 3.0.0-beta.2), but does not yet support error catching and rendering on updates, only on initial mount. This is the future, but it's not quite here.
* The [`react-transform-catch-errors` example](react-transform-catch-errors/) shows how to catch and render errors with the deprecated `react-transform-catch-errors` plugin. This is the way of the past, but it works today.

## For the futurists
If check out the [PR, which brings ErrorBoundaries to react](https://github.com/facebook/react/pull/6020), and build react from source, you can use the RHL 3 example __with hot reloading error capture__ today.
