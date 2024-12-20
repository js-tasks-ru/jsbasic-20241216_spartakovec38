function factorial(n) {
  let valueFactorial = 1;
  if (n == 0 || n == 1) {
    return valueFactorial;
  }
  for (let i = 2; n >= i; n--) {
    valueFactorial *= n;
  }
  return valueFactorial;
}
