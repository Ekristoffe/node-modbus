/* globals describe, it */
'use strict'

const assert = require('assert')
const UDPRequest = require('../src/udp-request.js')

describe('UDP Request Tests', function () {
  it('should return a valid UDPRequest object for function 15', function () {
    const requestBuffer = Buffer.from([
      0x00, 0x01, // transaction id
      0x00, 0x00, // protocol
      0x00, 0x09, // byte count
      0x02, // unit id
      0x0F, // function code
      0x00, 0x00, // address
      0x00, 0x08, // quantity
      0x02, // byte count
      0x55, 0x55 // values
    ])

    const request = UDPRequest.fromBuffer(requestBuffer)
    assert.ok(request)
    assert.equal(request.id, 0x0001)
    assert.equal(request.protocol, 0x0000)
    assert.equal(request.length, 0x0009)
    assert.equal(request.unitId, 0x02)
    assert.equal(request.body.fc, 0x0F)
    assert.equal(request.body.address, 0x0000)
    assert.deepEqual(request.body.valuesAsArray, [1, 0, 1, 0, 1, 0, 1, 0])
    assert.deepEqual(request.body.valuesAsBuffer, Buffer.from([0x55, 0x55]))
  })
})
