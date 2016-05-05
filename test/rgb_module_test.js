const chai = require('chai');
const expect = chai.expect;
const rgbToHue = require(__dirname + '/../lib/rgb_to_hue');

describe('rgb conversion', () => {
  it('should convert rgb to hue/sat values', () => {
    expect(rgbToHue(255, 0, 0).hue).to.eql(0);
    expect(rgbToHue(255, 0, 0).hue).to.eql(0);
  });
});
