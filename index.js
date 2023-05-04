// Define a class for the MCP4812 DAC
class MCP4812 {
  
  constructor(spi, cs) {
    // Save the SPI library instance as a property of the class
    this.spi = spi;
    this.cs = cs;

    // Create a buffer for sending SPI commands
    this.buf = new Uint8Array(2);
  }

  // Method for setting the voltage output of the DAC
  setVoltage(output, value) {
    
    // Validate the input values
    if (output !== 0 && output !== 1) {
      throw new Error(`Invalid output: ${output}`);
    }
    if (value < 0 || value > 1023) {
      throw new Error(`Invalid value: ${value}`);
    }

    // Build the 16-bit command byte for setting the voltage output

    // The first bit of the command byte is the output select bit
    // Shift the output argument left 7 bits to put the output select bit in the right place
    const command = output << 7;

    // The next 5 bits are unused and set to 0
    // Shift the value argument right 7 bits to extract the 3 most significant bits of the voltage value
    // AND the result with 0xff to keep only the 8 least significant bits
    const msb = (value >> 7) & 0xff;

    // The final 7 bits are the 7 least significant bits of the voltage value
    // Shift the least significant bit of the value argument left 1 bit to make room for the power-down bit
    // AND the result with 0xfe to set the power-down bit to 0
    const lsb = value & 0x7f;
    const shiftedLsb = lsb << 1;
    const finalLsb = shiftedLsb & 0xfe;

    // Write the command byte to the buffer
    // OR the output select bit with the msb to combine the two parts of the command byte
    // Send the command byte and the modified lsb to the MCP4812 over SPI
    this.buf[0] = command | msb;
    this.buf[1] = finalLsb;
    this.spi.write(this.buf);
  }
}

module.exports = MCP4812;