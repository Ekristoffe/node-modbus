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
  client.readHoldingRegisters(0, 10)
    .then(function (resp) {
      console.log(resp.response._body.valuesAsArray)
      socket.end()
    }).catch(function () {
      console.error(require('util').inspect(arguments, {
        depth: null
      }))
      socket.end()
    })
})

socket.on('error', console.error)
socket.connect(options)
