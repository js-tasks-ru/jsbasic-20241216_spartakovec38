function highlight(table) {
  let rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    let cells = row.querySelectorAll("td");

    let ageCell = cells[1];
    let genderCell = cells[2];
    let statusCell = cells[3];
    let dataAvailable = statusCell.getAttribute("data-available");

    if (dataAvailable === null) {
      row.hidden = true;
    } else {
      if (dataAvailable === "true") {
        row.classList.add("available");
      } else if (dataAvailable === "false") {
        row.classList.add("unavailable");
      }
    }

    if (genderCell.textContent.trim() === "m") {
      row.classList.add("male");
    } else if (genderCell.textContent.trim() === "f") {
      row.classList.add("female");
    }

    if (parseInt(ageCell.textContent.trim(), 10) < 18) {
      row.style.textDecoration = "line-through";
    }
  });
}
