# MCP4812 

Kaluma library for MCP4812 2-channel 10-bit DAC.

## Usage
```
// pass in an Kaluma SPI instance and also the pin number of your chip select pin
const mcp4812 = new MCP4812(spi, CLOCK_SELECT_PIN);

// now you can do this to write from a single channel of the mcp4812
mcp4812.setVoltage(channel, outputValue)
```

See `example.js` for more detailed example. 


## Installation


add it to your package.json directly with this repository link.

```
  "dependencies": {
    "mcp4812": "https://github.com/alexander-daniel/mcp4812.git"
  }
```

or with `npm`

```bash
npm install https://github.com/alexander-daniel/mcp4812

## Wiring
TODO
