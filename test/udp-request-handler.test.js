'use strict'

/* global describe, it, beforeEach */
const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const UDPRequestHandler = require('../src/udp-client-request-handler.js')
const ReadCoilsRequest = require('../src/request/read-coils.js')

describe('UDP Modbus Request Tests', function () {
  let socket
  let socketMock

  beforeEach(function () {
    socket = new EventEmitter()
    socket.write = function () {}

    socketMock = sinon.mock(socket)
  })

  /* we are using the read coils request function to test udp-requests. */
  it('should write a udp request.', function () {
    const handler = new UDPRequestHandler(socket, 3)
    const readCoilsRequest = new ReadCoilsRequest(0xa0fa, 0x0120)
    const requestBuffer = Buffer.from([0x00, 0x01, 0x00, 0x00, 0x00, 0x06, 0x03, 0x01, 0xa0, 0xfa, 0x01, 0x20])

    socket.emit('connect')

    socketMock.expects('write').once().withArgs(requestBuffer).yields()

    /* should flush the request right away */
    const promise = handler.register(readCoilsRequest)

    assert.ok(promise instanceof Promise)

    socketMock.verify()
  })
})

process.on('unhandledRejection', function (err) {
  console.error(err)
})
