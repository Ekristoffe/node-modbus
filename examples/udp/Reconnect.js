'use strict'

const modbus = require('../..')
const client = modbus.client.UDP.complete({
  'host': process.argv[2],
  'port': process.argv[3],
  'autoReconnect': false,
  'logEnabled': true
}).connect()
let successCount = 0
let errorCount = 0
let reconnectCount = 0
let closedOnPurpose = false
let firstTime = true

const start = function () {
  console.log('Starting request...')

  client.readHoldingRegisters(process.argv[4], process.argv[5]).then(function (resp) {
    successCount += 1

    console.log('Success', successCount, 'Errors', errorCount, 'Reconnect', reconnectCount)

    console.log('Request finished successfull.')

    setTimeout(function () {
      start()
    }, 2000)
  }, function (err) {
    console.error(err)
    errorCount += 1

    console.log('Success', successCount, 'Errors', errorCount, 'Reconnect', reconnectCount)

    console.log('Request finished UNsuccessfull.')
  })
}

client.on('connect', function () {
  console.log('client connected.')

  if (firstTime) {
    firstTime = false
  } else {
    reconnectCount += 1
  }

  start()
})

const shutdown = function () {
  closedOnPurpose = true

  client.close()
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

client.on('close', function () {
  console.log('Client closed, stopping interval.')

  if (!closedOnPurpose) {
    client.reconnect()
  }
})

client.on('error', function (err) {
  console.log('Client Error', err)
})
