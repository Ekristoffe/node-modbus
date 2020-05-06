'use strict'

const modbus = require('../..')
const dgram = require('dgram')
const socket = new dgram.Socket()
const options = {
  'host': '192.168.1.163',
  'port': '502'
}
const client = new modbus.client.UDP(socket)

socket.on('connect', function () {
  setInterval(function () {
    client.readHoldingRegisters(0, 2)
      .then(function (resp) {}).catch(function () {
        console.error(arguments)
        socket.end()
      })
  }, 200)
})

socket.on('error', console.error)
socket.connect(options)
