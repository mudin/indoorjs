/**
 * Base 10 logarithm
 *
 * @module mumath/log10
 */
'use strict';
export default Math.log10 || function (a) {
	return Math.log(a) / Math.log(10);
};
