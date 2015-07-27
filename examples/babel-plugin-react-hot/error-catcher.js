var catcherPath = 'babel-plugin-react-error-catcher'
var reporterPath = catcherPath + '/reporters/same-size-reporter'

module.exports = require(catcherPath)(reporterPath)
