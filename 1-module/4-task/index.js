function checkSpam(str) {
  str = str.toLowerCase();
  if (str.indexOf("xxx") >= 0 || str.indexOf("1xbet") >= 0) {
    return true;
  } else {
    return false;
  }
}
