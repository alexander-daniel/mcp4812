// Define a class for the MCP4812 DAC
class MCP4812 {
  constructor(spi, cs) {
    this.spi = spi; // kaluma spi instance
    this.cs = cs; // chipselect pin

    // create a buffer for sending SPI commands
    this.buf = new Uint8Array(2);
  }

  setVoltage(output, value) {
    if (output !== 0 && output !== 1) {
      throw new Error(`Invalid output: ${output}`);
    }

    if (value < 0 || value > 1023) {
      throw new Error(`Invalid value: ${value}`);
    }

    // MCP4812 expects the CS pin to be pulled low before sending data
    digitalWrite(this.cs, LOW);

    // MCP4812 expects 16 bits of data, but we only have 10 bits.
    // We need to shift the value to the left by 6 bits, and then
    // set the last 6 bits to 0.
    // The first byte is the 8 most significant bits, and the second
    // byte is the 8 least significant bits.
    this.buf[0] = (output << 7) | ((value >> 7) & 0xff);
    this.buf[1] = ((value & 0x7f) << 1) & 0xfe;
    this.spi.send(this.buf);

    // MCP4812 expects the CS pin to be pulled high after sending data
    digitalWrite(this.cs, HIGH);
  }
}

module.exports = MCP4812;
