const motorDriver = require('../src/devices/motor-driver-l298')

const wait = 3000
const speed = process.env.SPEED || 100

function test (motor, callback) {
  console.log(`- forward @${speed}`)
  motor.forward(speed)

  setTimeout(() => {
    console.log('- off')
    motor.off()

    setTimeout(() => {
      console.log(`- reverse @${speed}`)
      motor.reverse(speed)

      setTimeout(() => {
        console.log('- off')
        motor.off()

        if (typeof callback === 'function') callback()
      }, wait)
    }, wait)
  }, wait)
}

console.log('TESTING MotorA...')
test(motorDriver.motorA, () => {
  console.log('TESTING MotorA completed.')
  console.log('TESTING MotorB...')
  test(motorDriver.motorB, () => {
    console.log('TESTING MotorB completed.')
  })
})
