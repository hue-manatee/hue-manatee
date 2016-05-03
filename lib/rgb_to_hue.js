module.exports = exports = function(redRGB, greenRGB, blueRGB) {
  var red = redRGB / 255;
  var green = greenRGB / 255;
  var blue = blueRGB / 255;

  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var delta = max - min;

  var luminace = (max + min) / 2;

  var saturation = 0;
  var hueCalc = 0;

  if (luminace < 0.5) {
    saturation = delta / (max + min);
  } else {
    saturation = delta / (2 - delta);
  }

  if (min === max) {
    saturation = 0;
    hueCalc = 0;
  } else if (max === red) {
    hueCalc = (green - blue) / delta;
  } else if (max === green) {
    hueCalc = 2 + (blue - red) / delta;
  } else if (max === blue) {
    hueCalc = 4 + (red - green) / delta;
  }

  var hue360 = hueCalc * 60;
  if (hue360 < 0) hue360 += 360;

  var colorObj = {};
  colorObj.hueActual = Math.round(hue360 * 182.0417);
  // the bottom of the saturation spectrum just looks white, so we capping
  // the lower end at 100 to give a better color spread
  colorObj.satActual = Math.round(saturation * 155 + 100);

  console.log(`The hue is ${colorObj.hueActual}`);
  console.log(`The saturation is ${colorObj.satActual}`);
};
