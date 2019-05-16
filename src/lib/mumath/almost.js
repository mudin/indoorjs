/**
 * MIT: https://github.com/scijs/almost-equal
 */

"use strict"

var abs = Math.abs
  , min = Math.min

function almost(a, b, absoluteError, relativeError) {
  var d = abs(a - b)
  
  if (absoluteError == null) absoluteError = almost.DBL_EPSILON;
  if (relativeError == null) relativeError = absoluteError;
  
  if(d <= absoluteError) {
    return true
  }
  if(d <= relativeError * min(abs(a), abs(b))) {
    return true
  }
  return a === b
}

almost.FLT_EPSILON = 1.19209290e-7
almost.DBL_EPSILON = 2.2204460492503131e-16

export default almost;