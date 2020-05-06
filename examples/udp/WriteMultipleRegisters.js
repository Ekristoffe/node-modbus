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
  client.writeMultipleRegisters(1, [0x000a, 0x0102])
    .then(function (resp) {
      console.log(resp)
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)
socket.connect(options)
