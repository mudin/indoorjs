/**
 * @module mumath/lerp
 */
'use strict';
export default function (x, y, a) {
	return x * (1.0 - a) + y * a;
};
