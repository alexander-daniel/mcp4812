const { SPI } = require('spi');
const MCP4812 = require('./index.js'); // replace this with `mcp4812` in your code and package.json.

const SPI_BUS = 0;
const CLOCK_SELECT_PIN = 17;

// Setup our chip select pin for the mcp4812
// we have to set it to output, and set default to HIGH.
// this pin will be pulled down to LOW when we want to write 
// to the MCP4812 peripheral.
pinMode(17, OUTPUT);
digitalWrite(17, HIGH);

// Setup our SPI bus that we'll use to communicate with the MCP4812
const spi = new SPI(SPI_BUS);
const mcp4812 = new MCP4812(spi, CLOCK_SELECT_PIN);

function loop() {

  // this read function will automatically set the state of the provided
  // chip select pin so it can communicate to the mcp4812 peripheral.
  // all you have to provide is the channel you wish to write to (0-1)
  const value = 255;
  mcp4812.setVoltage(0, value);
  mcp4812.setVoltage(1, value * 2);
  console.log(value, value * 2);
  setTimeout(loop, 10);
}

loop();