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

boards.on('ready', () => {
  console.log('BOARD READY!')

  controller
    .on('forward', () => {
      log('FORWARD')
      bot.forward()
    })
    .on('backwards', () => {
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
    .on('stop', () => {
      log('STOP')
      bot.stop()
    })
    .on('circle', () => {
      log('CIRCLE')
      bot.circle()
    })
    .on('infinity', () => {
      log('INFINITY')
      bot.infinity()
    })

  boards.repl.inject({bot})
})
