export default alpha;

function alpha (color, value) {
	let obj = color.replace(/[^\d,]/g, '').split(',');
  if (value == null) value = obj[3] || 1;
  obj[3] = value;
	return 'rgba('+obj.join(',')+')';
}
