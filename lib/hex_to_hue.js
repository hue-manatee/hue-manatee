const rgbToHue = require(__dirname + '/rgb_to_hue');

module.exports = exports = function(hex) {
  hex = hex.replace(/[#]/g, '');
  var red = hex.slice(0, 2);
  var green = hex.slice(2, 4);
  var blue = hex.slice(4, 6);

  return rgbToHue(parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16));
};
