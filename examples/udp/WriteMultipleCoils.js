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
  const values = Buffer.from([0xff])

  client.writeMultipleCoils(13, values, 8)
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
