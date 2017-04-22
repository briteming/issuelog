import parse from 'parse-link-header';

export function dateFormat (dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = dateUnitFormat(date.getMonth() + 1);
  const day = dateUnitFormat(date.getDate());
  return `${year}-${month}-${day}`;
}

export function datetimeFormat (dateStr) {
  const date = new Date(dateStr);
  const hour = dateUnitFormat(date.getHours());
  const minute = dateUnitFormat(date.getMinutes());
  const second = dateUnitFormat(date.getSeconds());
  return `${dateFormat(dateStr)} ${hour}:${minute}:${second}`;
}

function dateUnitFormat (unit) {
  return ('0' + unit).slice(-2);
}

export function except (text, length) {
  const textArr = text.split('<!--more-->');
  if (textArr.length > 1) return textArr[0];
  if (length) return text.substring(0, length);
  return text;
}

export function parseHeaderLink (headers) {
  const link = headers['link'];
  if (!link) return 1;
  const pagination = parse(link);
  return pagination.last.page / 1;
}

export function isDarkColor (colorHex) {
  const rgb = parseInt(colorHex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  if (luma > 120) return false;
  return true;
}
