const keypress = require('keypress')

class KeyboardController {
  constructor () {
    this.events = {
      forward: () => {},
      reverse: () => {},
      left: () => {},
      right: () => {},
      stop: () => {},
      circle: () => {},
      infinity: () => {}
    }

    this.debug = !!process.env.DEBUG || false
    this.readingKey = false
    this.init()
  }

  init () {
    keypress(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.resume()

    process.stdin.on('keypress', (ch, key) => {
      // Debounce keypress.
      if (this.readingKey) return
      this.readingKey = true
      setTimeout(() => {
        this.readingKey = false
      }, 150)

      const keyName = key.name
      console.log(`KEY Pressed: ${keyName}`)

      if (keyName === 'up') {
        this.log('FORWARD')
        this.events.forward()
        return
      }

      if (keyName === 'down') {
        this.log('REVERSE')
        this.events.reverse()
        return
      }

      if (keyName === 'left') {
        this.log('LEFT')
        this.events.left()
        return
      }

      if (keyName === 'right') {
        this.log('RIGHT')
        this.events.right()
        return
      }

      if (keyName === 'z') {
        this.log('INFINITY')
        this.events.infinity()
        return
      }

      if (keyName === 'c') {
        this.log('CIRCLE')
        this.events.circle()
        return
      }

      if (keyName === 'x') {
        this.log('OFF')
        this.events.off()
        return
      }

      if (keyName === 'v') {
        this.log('BRAKE')
        this.events.brake()
        return
      }

      if (keyName === 'd') {
        this.log('DANCE')
        this.events.dance()
        return
      }

      if (keyName === 'q') {
        this.log('QUIT')
        process.exit()
        return
      }
    })
  }

  on (event, callback) {
    if (!event) return
    if (typeof callback !== 'function') return

    this.events[event] = callback
    return this
  }

  log () {
    if (!this.debug) return
    console.log('[ Keyboard Controller ]-->', ...arguments)
  }
}

module.exports = KeyboardController
