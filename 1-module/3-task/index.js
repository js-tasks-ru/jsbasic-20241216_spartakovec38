function ucFirst(str) {
  let letterFirst = str.slice(0, 1).toUpperCase();
  let letterOther = str.slice(1, str.length);
  return letterFirst + letterOther;
}
