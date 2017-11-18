const motorDriver = require('./devices/motor-driver-l298')

class Robot {
  forward (speed=255) {
    if (this.timer) this.clearTimeout(this.timer)
    motorDriver.forward(speed)
  }

  revere (speed=255) {
    if (this.timer) this.clearTimeout(this.timer)
    motorDriver.reverse(speed)
  }

  left (speed) {
    if (this.timer) this.clearTimeout(this.timer)
    motorDriver.left(speed)
  }

  right (speed) {
    if (this.timer) this.clearTimeout(this.timer)
    motorDriver.right(speed)
  }

  brake () {
    if (this.timer) this.clearTimeout(this.timer)
    motorDriver.brake()
  }

  off () {
    if (this.timer) this.clearTimeout(this.timer)
    motorDriver.off()
  }

  circle (speed=255, direction=1) {
    if (this.timer) this.clearTimeout(this.timer)
    if (direction) {
      motorDriver.right(speed)
    } else {
      motorDriver.left(speed)
    }
  }

  infinity (speed=255) {
    if (this.timer) this.clearTimeout(this.timer)

    const wait = 3000 // ms
    motorDriver.right(speed)

    this.timer = setTimeout(() => {
      motorDriver.left(speed)

      this.timer = setTimeout(() => {
        this.infinity(speed)
      }, wait)
    }, wait)
  }
}

module.exports = new Robot()
