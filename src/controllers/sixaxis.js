const ds = require('dualshock')

class SixaxisController {
  constructor () {
    this.events = {
      forward: () => {},
      backwards: () => {},
      left: () => {},
      right: () => {},
      sleep: () => {},
      stop: () => {},
      attack: () => {}
    }

    this.debug = !!process.env.DEBUG
    this.waitMs = 5000
    this.searchDevice()
  }

  searchDevice () {
    this.log('Searching devices...')
    this.onDevicesFound((devices) => {
      this.setEvents(devices)
    })
  }

  setEvents (devices) {
    const device = devices[0] // Support just one device at a time right now.
    const gamepad = ds.open(device, {smoothAnalog: 10, smoothMotion: 15, joyDeadband: 4, moveDeadband: 4})

    gamepad.ondigital = (button, value) => {
      console.log(`BUTTON ${button} = ${value}`)
      if (!value) {
        this.log('OFF')
        this.events.off()
        return
      }

      if (button === 'up') {
        this.log('FORWARD')
        this.events.forward()
        return
      }

      if (button === 'down') {
        this.log('REVERSE')
        this.events.reverse()
        return
      }

      if (button === 'left') {
        this.log('LEFT')
        this.events.left()
        return
      }

      if (button === 'right') {
        this.log('RIGHT')
        this.events.right()
        return
      }

      if (button === 'square') {
        this.log('OFF')
        this.events.off()
        return
      }

      if (button === 'triangle') {
        this.log('BRAKE')
        this.events.brake()
        return
      }

      if (button === 'circle') {
        this.log('CIRCLE')
        this.events.circle()
        return
      }

      if (button === 'cross') {
        this.log('INFINITY')
        this.events.infinity()
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
