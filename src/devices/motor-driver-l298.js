const Gpio = require('pigpio').Gpio

class Motor {
  constructor ({enabled, in1, in2}) {
    this.enabled = enabled
    this.in1 = in1
    this.in2 = in2
    this.isEnabled = false
  }

  forward (speed=255) {
    if (!this.isEnabled) this.on()
    this.in1.pwmWrite(speed)
    this.in2.pwmWrite(0)
  }

  reverse (speed=255) {
    if (!this.isEnabled) this.on()
    this.in1.pwmWrite(0)
    this.in2.pwmWrite(speed)
  }

  brake () {
    if (!this.isEnabled) this.on()
    this.in1.pwmWrite(255)
    this.in2.pwmWrite(255)
  }

  on () {
    this.enabled.digitalWrite(1)
  }

  off () {
    this.enabled.digitalWrite(0)
    this.in1.pwmWrite(0)
    this.in2.pwmWrite(0)
  }
}

/**
 * Driver details:
 * https://store.fut-electronics.com/collections/dc-motor-driver/products/l298-dual-h-bridge-motor-driver-dc-and-stepper-motors
 *
 * Constructor receives GPIO pin numbers mapped to each input on the
 * motor driver board.
 */
class L298 {
  constructor ({ena, in1, in2, in3, in4, enb}) {
    this.ena = new Gpio(ena, {mode: Gpio.OUTPUT})
    this.in1 = new Gpio(in1, {mode: Gpio.OUTPUT})
    this.in2 = new Gpio(in2, {mode: Gpio.OUTPUT})
    this.in3 = new Gpio(in3, {mode: Gpio.OUTPUT})
    this.in4 = new Gpio(in4, {mode: Gpio.OUTPUT})
    this.enb = new Gpio(enb, {mode: Gpio.OUTPUT})

    this.motorA = new Motor({enabled: this.ena, in1: this.in1, in2: this.in2})
    this.motorB = new Motor({enabled: this.enb, in1: this.in4, in2: this.in3})
  }

  forward (speed=255) {
    this.motorA.forward(speed)
    this.motorB.forward(speed)
  }

  reverse (speed=255) {
    this.motorA.reverse(speed)
    this.motorB.reverse(speed)
  }

  brake () {
    this.motorA.brake()
    this.motorB.brake()
  }

  off () {
    this.motorA.off()
    this.motorB.off()
  }

  left (speed) {
    this.motorA.forward(speed)
    this.motorB.off()
  }

  right (speed) {
    this.motorA.off()
    this.motorB.forward(speed)
  }

  forwardRight (speed) {
    this.motorA.forward(speed/2)
    this.motorB.forward(speed)
  }

  forwardLeft (speed) {
    this.motorA.forward(speed)
    this.motorB.forward(speed/2)
  }

  reverseRight (speed) {
    this.motorA.reverse(speed/2)
    this.motorB.reverse(speed)
  }

  reverseLeft (speed) {
    this.motorA.reverse(speed)
    this.motorB.reverse(speed/2)
  }
}

const motorDriver = new L298({ena: 2, in1: 3, in2: 18, in3: 15, in4: 4, enb: 14})
module.exports = motorDriver
