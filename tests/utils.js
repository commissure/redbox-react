import React from 'react'
const TestUtils = require('react-addons-test-utils');

export const createComponent = (component, props, ...children) => {
  const shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]))
  return shallowRenderer.getRenderOutput()
}
