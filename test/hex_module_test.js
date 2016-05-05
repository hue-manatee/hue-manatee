const chai = require('chai');
const expect = chai.expect;
const hexToHue = require(__dirname + '/../lib/hex_to_hue');

describe('hex conversion', () => {
  it('should convert hex to hue', () => {
    expect(hexToHue('00FF00').hue).to.eql(21845);
    expect(hexToHue('00FF00').sat).to.eql(254);
  });
});
