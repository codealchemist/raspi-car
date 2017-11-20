const ds = require('dualshock')

class SixaxisController {
  constructor () {
    this.events = {
      forward: () => {},
      reverse: () => {},
      left: () => {},
      right: () => {},
      off: () => {},
      brake: () => {},
      circle: () => {},
      infinity: () => {},
      forwardRight: () => {},
      forwardLeft: () => {},
      reverseRight: () => {},
      reverseLeft: () => {}
    }

    this.validMovements = ['up', 'down', 'left', 'right']
    this.isAnimating = false
    this.setDefaultState()
    this.debug = !!process.env.DEBUG
    this.waitMs = 5000
    this.searchDevice()
  }

  setDefaultState () {
    this.state = {
      movement: []
    }
  }

  searchDevice () {
    this.log('Searching devices...')
    this.onDevicesFound((devices) => {
      this.setEvents(devices)
    })
  }

  off () {
    this.log('OFF')
    this.isAnimating = false
    this.events.off()
    this.setDefaultState()
  }

  brake () {
    this.log('BRAKE')
    this.isAnimating = false
    this.events.brake()
    this.setDefaultState()
  }

  forward () {
    this.log('FORWARD')
    this.isAnimating = false
    this.events.forward()
    this.state.movement = ['up']
  }

  reverse () {
    this.log('REVERSE')
    this.isAnimating = false
    this.events.reverse()
    this.state.movement = ['down']
  }

  left () {
    this.log('LEFT')
    this.isAnimating = false
    this.events.left()
    this.state.movement = ['left']
  }

  right () {
    this.log('RIGHT')
    this.isAnimating = false
    this.events.right()
    this.state.movement = ['right']
  }

  forwardRight () {
    this.log('FORWARD RIGHT')
    this.isAnimating = false
    this.events.forwardRight()
    this.state.movement = ['up', 'right']
  }

  forwardLeft () {
    this.log('FORWARD LEFT')
    this.isAnimating = false
    this.events.forwardLeft()
    this.state.movement = ['up', 'left']
  }

  reverseRight () {
    this.log('REVERSE RIGHT')
    this.isAnimating = false
    this.events.reverseRight()
    this.state.movement = ['down', 'right']
  }

  reverseLeft () {
    this.log('REVERSE LEFT')
    this.isAnimating = false
    this.events.reverseLeft()
    this.state.movement = ['down', 'left']
  }

  circle () {
    this.log('CIRCLE')
    this.isAnimating = true
    this.events.circle()
    this.state.movement = []
  }

  infinity () {
    this.log('INFINITY')
    this.isAnimating = true
    this.events.circle()
    this.state.movement = []
  }

  dance () {
    this.log('DANCE')
    this.isAnimating = true
    this.events.dance()
    this.state.movement = []
  }

  isSingleMovement () {
    return (this.state.movement.length === 1)
  }

  stopMovement (button) {
    this.state.movement = this.state.movement.filter((btn) => btn !== button)
  }

  isMovement (button) {
    return this.validMovements.includes(button)
  }

  isMoving (button) {
    return this.state.movement.includes(button)
  }

  setEvents (devices) {
    const device = devices[0] // Support just one device at a time right now.
    const gamepad = ds.open(device, {smoothAnalog: 10, smoothMotion: 15, joyDeadband: 4, moveDeadband: 4})

    gamepad.ondigital = (button, value) => {
      console.log(`BUTTON ${button} = ${value}`)
      if (!value) {
        if (this.isSingleMovement()) {
          this.off()
          return
        }

        if (this.isMovement(button)) {
          // Remove turned off movement.
          this.stopMovement(button)

          // Apply active movement.
          button = this.state.movement[0]
        }

        // Ignore button release for animations.
        if (this.isAnimating) return
      }

      if (button === 'up') {
        if (this.isMoving('left')) {
          this.forwardLeft()
          return
        }

        if (this.isMoving('right')) {
          this.forwardRight()
          return
        }

        this.forward()
        return
      }

      if (button === 'down') {
        if (this.isMoving('left')) {
          this.reverseLeft()
          return
        }

        if (this.isMoving('right')) {
          this.reverseRight()
          return
        }

        this.reverse()
        return
      }

      if (button === 'left') {
        if (this.isMoving('up')) {
          this.forwardLeft()
          return
        }

        if (this.isMoving('down')) {
          this.reverseLeft()
          return
        }

        this.left()
        return
      }

      if (button === 'right') {
        if (this.isMoving('up')) {
          this.forwardRight()
          return
        }

        if (this.isMoving('down')) {
          this.reverseRight()
          return
        }

        this.right()
        return
      }

      if (button === 'square') {
        this.off()
        return
      }

      if (button === 'triangle') {
        this.brake()
        return
      }

      if (button === 'circle') {
        this.circle()
        return
      }

      if (button === 'cross') {
        this.infinity()
        return
      }

      if (button === 'r1') {
        this.dance()
        return
      }
    }

    gamepad.onanalog = (axis, value) => {
      console.log(`AXIS ${axis} = ${value}`)
    }
  }

  onDevicesFound (callback) {
    const devices = ds.getDevices('ds3')
    if (!devices.length) {
      // Keep looking for devices.
      setTimeout(() => {
        this.onDevicesFound(callback)
      }, this.waitMs)
      return
    }

    this.log('DEVICES:', devices)
    callback(devices)
  }

  on (event, callback) {
    if (!event) return
    if (typeof callback !== 'function') return

    this.events[event] = callback
    return this
  }

  log () {
    if (!this.debug) return
    console.log('[ Sixaxis Controller ]-->', ...arguments)
  }
}

module.exports = SixaxisController
