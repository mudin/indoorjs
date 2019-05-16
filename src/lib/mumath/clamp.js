/**
 * Clamp value.
 * Detects proper clamp min/max.
 *
 * @param {number} a Current value to cut off
 * @param {number} min One side limit
 * @param {number} max Other side limit
 *
 * @return {number} Clamped value
 */

function clamp(a, min, max) {
	return max > min ? Math.max(Math.min(a,max),min) : Math.max(Math.min(a,min),max);
};

export default clamp;
