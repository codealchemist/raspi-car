const keyboard = require('./keyboard')
const sixaxis = require('./sixaxis')

const controllersMap = {
  keyboard,
  sixaxis
}

function get (controllerName) {
  if (!(controllerName in controllersMap)) throw new Error(`ERROR: Controller not found: '${controllerName}'.`)
  return new controllersMap[controllerName]()
}

module.exports = { get }
