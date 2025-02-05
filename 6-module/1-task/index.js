/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
  }

  createTable() {
    let container = document.createElement("div");
    let tableHTML = `
    <table>
      <thead>
        <tr>  
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
        </tr>
      </thead>
      <tbody>
      `;

    this.rows.forEach((rowData) => {
      tableHTML += `
      <tr>
        <td>${rowData.name}</td>
        <td>${rowData.age}</td>
        <td>${rowData.salary}</td>
        <td>${rowData.city}</td>
        <td><button class = 'delete-btn'>X</button>
      </tr>  
        `;
    });

    tableHTML += `</tbody>
    </table>
    `;

    container.insertAdjacentHTML("beforeend", tableHTML);

    container.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        let row = event.target.closest("tr");
        row.remove();
      }
    });
    return container;
  }
}
