'use strict'

const modbus = require('../..')
const dgram = require('dgram')
const socket = new dgram.Socket('udp4')
const options = {
  'address': '192.168.1.163',
  'port': '502'
}
const port = 502
const address = '192.168.1.163'
const client = new modbus.client.UDP(socket)

socket.on('connect', function () {
  client.writeSingleCoil(1, true)
    .then(function (resp) {
      console.log(resp)
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)
socket.connect(port, address)
