module.exports = exports = function(redRGB, greenRGB, blueRGB) {
  var red = redRGB / 255;
  var green = greenRGB / 255;
  var blue = blueRGB / 255;

  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var delta = max - min;

  var saturation = 0;
  var hue360 = 0;

  if ((max + min) / 2 < 0.5) {
    saturation = delta / (max + min);
  } else {
    saturation = delta / (2 - delta);
  }

  if (min === max) {
    saturation = 0;
    hue360 = 0;
  } else if (max === red) {
    hue360 = 60 * (green - blue) / delta;
  } else if (max === green) {
    hue360 = 60 * (2 + (blue - red)) / delta;
  } else if (max === blue) {
    hue360 = 60 * (4 + (red - green)) / delta;
  }

  if (hue360 < 0) hue360 += 360;

  var colorObj = {};
  // hue360 is on 360 degree color wheel, but our hue values support 65535
  // hue values.  This converts from 360 to 65535
  colorObj.hue = Math.round(hue360 * 182.0417);
  // the bottom of the saturation spectrum just looks white, so we capping
  // the lower end at 100 to give a better color spread
  colorObj.sat = Math.round(saturation * 154 + 100);

  return colorObj;
};
