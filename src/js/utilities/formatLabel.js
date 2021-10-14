export default (text, unit, hasPercent = true) => {
  let value = parseFloat(text.replace(/ /g, ''));
  if (isNaN(value) || Math.abs(value) <= 0.00001)
    return '-';
  if (unit === 0) {
    value = value.toFixed(2).toString();
    if (hasPercent)
      value += '%';
  } else {
    value = (value / 1000000.0).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  return value;
} 