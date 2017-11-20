const printii = require('printii')(__dirname + '/../')
const controllers = require('./controllers')
const bot = require('./robot')

const debug = process.env.DEBUG

printii()

// Set controller.
// Can be any of: keyboard, nunchuk, sixaxis.
const controllerName = process.env.CTRL || 'keyboard'
log(`CTRL: ${controllerName}`)
const controller = controllers.get(controllerName)

function log(message) {
  console.log(`- ${message}`)
}

controller
    .on('forward', () => {
      log('FORWARD')
      bot.forward()
    })
    .on('reverse', () => {
      log('REVERSE')
      bot.reverse()
    })
    .on('left', () => {
      log('LEFT')
      bot.left()
    })
    .on('right', () => {
      log('RIGHT')
      bot.right()
    })
    .on('forwardRight', () => {
      log('FORWARD RIGHT')
      bot.forwardRight()
    })
    .on('forwardLeft', () => {
      log('FORWARD LEFT')
      bot.forwardLeft()
    })
    .on('reverseLeft', () => {
      log('REVERSE LEFT')
      bot.reverseLeft()
    })
    .on('reverseRight', () => {
      log('REVERSE RIGHT')
      bot.reverseRight()
    })
    .on('brake', () => {
      log('brake')
      bot.brake()
    })
    .on('off', () => {
      log('OFF')
      bot.off()
    })
    .on('circle', () => {
      log('CIRCLE')
      bot.circle()
    })
    .on('infinity', () => {
      log('INFINITY')
      bot.infinity()
    })
    .on('dance', () => {
      log('DANCE')
      bot.dance()
    })
