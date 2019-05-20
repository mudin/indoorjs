
// Type definitions for almost-equal 1.1
// Project: https://github.com/mikolalysenko/almost-equal#readme
// Definitions by: Curtis Maddalozzo <https://github.com/cmaddalozzo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

var abs = Math.abs;
var min = Math.min;

function almostEqual(a, b, absoluteError, relativeError) {
  var d = abs(a - b)
  
  if (absoluteError == null) absoluteError = almostEqual.DBL_EPSILON;
  if (relativeError == null) relativeError = absoluteError;
  
  if(d <= absoluteError) {
    return true
  }
  if(d <= relativeError * min(abs(a), abs(b))) {
    return true
  }
  return a === b
}

export const FLT_EPSILON = 1.19209290e-7
export const DBL_EPSILON = 2.2204460492503131e-16

almostEqual.FLT_EPSILON = FLT_EPSILON;
almostEqual.DBL_EPSILON = DBL_EPSILON;

export default almostEqual;