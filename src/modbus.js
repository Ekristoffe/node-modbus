'use strict'

/** jsModbus is a node.js module that enables the developer to interact with modbus/tcp, modbus/udp and modbus/rtu server (slaves)
 * or to create a modbus/tcp or modbus/udp server (master).
 * @module jsmodbus
 *
 */

/** module:jsmodbus.client.TCP
 * @example <caption>Create new Modbus/TCP Client.</caption>
 * const Modbus = require('jsmodbus')
 * const net = require('net')
 * const socket = new new.Socket()
 * const client = new Modbus.client.TCP(socket, unitId)
 * const options = {
 *   'host' : host
 *   'port' : port
 *   }
 *
 *  socket.connect(options)
 */
const ModbusTCPClient = require('./modbus-tcp-client.js')

/** module:jsmodbus.client.UDP
 * @example <caption>Create new Modbus/UDP Client.</caption>
 * const Modbus = require('jsmodbus')
 * const dgram = require('dgram')
 * const socket = new new.Socket()
 * const client = new Modbus.client.UDP(socket, unitId)
 * const options = {
 *   'host' : host
 *   'port' : port
 *   }
 *
 *  socket.connect(options)
 */
const ModbusUDPClient = require('./modbus-udp-client.js')

/** module:jsmodbus.client.RTU
 * @example <caption>Create new Modbus/RTU Client.</caption>
 * const Modbus = require('jsmodbus')
 * const SerialPort = require('serialport')
 * const socket = new SerialPort('/dev/tty/ttyUSB0', { baudRate: 57600 })
 * const client = new Modbus.client.TCP(socket, address)
 */
const ModbusRTUClient = require('./modbus-rtu-client.js')

/** module:jsmodbus.server.TCP */
const ModbusTCPServer = require('./modbus-tcp-server.js')

/** module:jsmodbus.server.UDP */
const ModbusUDPServer = require('./modbus-udp-server.js')

/** module:jsmodbus.server.RTU */
const ModbusRTUServer = require('./modbus-rtu-server.js')

module.exports = {
  'client': {
    'TCP': ModbusTCPClient,
    'UDP': ModbusUDPClient,
    'RTU': ModbusRTUClient
  },
  server: {
    'TCP': ModbusTCPServer,
    'UDP': ModbusUDPServer,
    'RTU': ModbusRTUServer
  }
}
