/**
 * MIT © Sindre Sorhus
 * https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
 */
export default (value) => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.getPrototypeOf({});
};
