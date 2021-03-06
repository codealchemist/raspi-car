const motorDriver = require('./devices/motor-driver-l298')

class Robot {
  forward (speed=255) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.forward(speed)
  }

  reverse (speed=255) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.reverse(speed)
  }

  left (speed) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.left(speed)
  }

  right (speed) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.right(speed)
  }

  forwardRight (speed) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.forwardRight(speed)
  }

  forwardLeft (speed) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.forwardLeft(speed)
  }

  reverseRight (speed) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.reverseRight(speed)
  }

  reverseLeft (speed) {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.reverseLeft(speed)
  }

  brake () {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.brake()
  }

  off () {
    if (this.timer) clearTimeout(this.timer)
    motorDriver.off()
  }

  circle (speed=255, direction=1) {
    if (this.timer) clearTimeout(this.timer)
    if (direction) {
      motorDriver.right(speed)
    } else {
      motorDriver.left(speed)
    }
  }

  infinity (speed=255) {
    if (this.timer) clearTimeout(this.timer)

    const wait = 3000 // ms
    motorDriver.right(speed)

    this.timer = setTimeout(() => {
      motorDriver.left(speed)

      this.timer = setTimeout(() => {
        this.infinity(speed)
      }, wait)
    }, wait)
  }

  zigzag (speed=255, count=-1, callback) {
    if (this.timer) clearTimeout(this.timer)
    if (!count) {
      this.off()
      if (typeof callback === 'function') callback()
      return
    }

    // Setting count to -1 loops forever.
    // Avoid count to grow too large when looping forever.
    if (count < 0) count = -1

    const wait = 250 // ms
    motorDriver.right(speed)

    this.timer = setTimeout(() => {
      motorDriver.left(speed)

      this.timer = setTimeout(() => {
        this.zigzag(speed, count - 1, callback)
      }, wait)
    }, wait)
  }

  dance (speed=255) {
    if (this.timer) clearTimeout(this.timer)

    const wait = 1500 // ms
    this.zigzag(speed, 7, () => {
      this.reverse(speed)
      this.timer = setTimeout(() => {
        this.dance(speed)
      }, wait)
    })
  }
}

module.exports = new Robot()
