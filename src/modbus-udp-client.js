'use strict'

const ModbusClient = require('./modbus-client.js')
const ModbusUDPClientRequestHandler = require('./udp-client-request-handler.js')
const ModbusUDPClientResponseHandler = require('./udp-client-response-handler.js')

/** This client must be initiated with a dgram.Socket object.
 * @extends ModbusClient
 * @class
 * @example <caption>Create new Modbus/UDP Client</caption>
 * const dgram = require('dgram')
 * const socket = new dgram.Socket()
 * const client = new Modbus.udp.Client(socket)
 *
 * socket.connect({'host' : hostname, 'port' : 502 })
 *
 * socket.on('connect', function () {
 *
 *  client.readCoils(...)
 *
 * })
 *
 */
class ModbusUDPClient extends ModbusClient {
  /** Creates a new Modbus/UDP Client.
   * @param {dgram.Socket} socket The UDP Socket.
   * @param {Number} unitId Unit ID
   * @param {Number} timeout Timeout for requests in ms.
   */
  constructor (socket, unitId, timeout) {
    super(socket)
    this._unitId = unitId || 1
    this._timeout = timeout || 5000

    /* Simply set the request and response handler and you are done.
     * The request handler needs to implement the following methods
     *   - register(pdu) returns a promise
     * The response handler needs to implement the following methods
     *   - handelData(buffer)
     *   - shift () // get latest message from the socket
     *      and remove it internally
     */
    this._requestHandler = new ModbusUDPClientRequestHandler(this._socket, this._unitId, timeout)
    this._responseHandler = new ModbusUDPClientResponseHandler()
  }
}

module.exports = ModbusUDPClient
