function sumSalary(salaries) {
  let salary = 0;
  for (let i in salaries) {
    if (typeof salaries[i] == "undefined") {
      return 0;
    } else if (typeof salaries[i] == "number") {
      if (!Number.isNaN(salaries[i]) && Number.isFinite(salaries[i])) {
        salary += salaries[i];
      }
    }
  }
  return salary;
}
