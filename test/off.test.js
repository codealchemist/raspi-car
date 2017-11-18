const motorDriver = require('../src/devices/motor-driver-l298')

motorDriver.motorA.off()
motorDriver.motorB.off()

console.log('MOTORS turned off.')
