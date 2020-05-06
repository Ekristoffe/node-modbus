#!/usr/bin/env node

'use strict'

const dgram = require('dgram')
const modbus = require('../..')
const dgramServer = new dgram.Server()
const server = new modbus.server.UDP(dgramServer)

server.on('connection', function () {

})

dgramServer.listen(8502)
