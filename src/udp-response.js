const debug = require('debug')('udp-response')
const ResponseFactory = require('./response/response-factory.js')

/** Modbus/UDP Response
 * @class
 */
class ModbusUDPResponse {
  /** Create Modbus/UDP Response from a Modbus/UDP Request including
   * the modbus function body.
   * @param {ModbusUDPRequest} request
   * @param {ModbusResponseBody} body
   * @returns {ModbusUDPResponse}
   */
  static fromRequest (udpRequest, modbusBody) {
    return new ModbusUDPResponse(
      udpRequest.id,
      udpRequest.protocol,
      modbusBody.byteCount + 1,
      udpRequest.unitId,
      modbusBody)
  }

  /** Create Modbus/UDP Response from a buffer
   * @param {Buffer} buffer
   * @returns {ModbusUDPResponse} Returns null if not enough data located in the buffer.
   */
  static fromBuffer (buffer) {
    try {
      const id = buffer.readUInt16BE(0)
      const protocol = buffer.readUInt16BE(2)
      const length = buffer.readUInt16BE(4)
      const unitId = buffer.readUInt8(6)

      debug('udp header complete, id', id, 'protocol', protocol, 'length', length, 'unitId', unitId)
      debug('buffer', buffer)

      const body = ResponseFactory.fromBuffer(buffer.slice(7, 7 + length - 1))

      if (!body) {
        debug('not enough data for a response body')
        return null
      }

      debug('buffer contains a valid response body')

      return new ModbusUDPResponse(id, protocol, length, unitId, body)
    } catch (e) {
      debug('not enough data available')
      return null
    }
  }

  /** Create new Modbus/UDP Response Object.
   * @param {Number} id Transaction ID
   * @param {Number} protocol Protcol version (Usually 0)
   * @param {Number} bodyLength Body length + 1
   * @param {Number} unitId Unit ID
   * @param {ModbusResponseBody} body Modbus response body object
   */
  constructor (id, protocol, bodyLength, unitId, body) {
    this._id = id
    this._protocol = protocol
    this._bodyLength = bodyLength
    this._unitId = unitId
    this._body = body
  }

  /** Transaction ID */
  get id () {
    return this._id
  }

  /** Protocol version */
  get protocol () {
    return this._protocol
  }

  /** Body length */
  get bodyLength () {
    return this._bodyLength
  }

  /** Payload byte count */
  get byteCount () {
    return this._bodyLength + 6
  }

  /** Unit ID */
  get unitId () {
    return this._unitId
  }

  /** Modbus response body */
  get body () {
    return this._body
  }

  createPayload () {
    /* Payload is a buffer with:
     * Transaction ID = 2 Bytes
     * Protocol ID = 2 Bytes
     * Length = 2 Bytes
     * Unit ID = 1 Byte
     * Function code = 1 Byte
     * Byte count = 1 Byte
     * Coil status = n Bytes
     */
    const payload = Buffer.alloc(this.byteCount)
    payload.writeUInt16BE(this._id, 0)
    payload.writeUInt16BE(this._protocol, 2)
    payload.writeUInt16BE(this._bodyLength, 4)
    payload.writeUInt8(this._unitId, 6)
    this._body.createPayload().copy(payload, 7)

    return payload
  }
}

module.exports = ModbusUDPResponse
