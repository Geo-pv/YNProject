// Находим элементы таблицы и поле ввода
const table = document.querySelector('table');
const searchInput = document.querySelector('#search-input');

// Добавляем обработчик события на изменение текста в поле ввода
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase(); // Приводим запрос к нижнему регистру
  const rows = table.querySelectorAll('tbody tr'); // Находим все строки таблицы
  
  // Проходим по каждой строке и скрываем те, которые не соответствуют запросу
  rows.forEach(row => {
    const columns = row.querySelectorAll('td');
    let match = false;
    
    columns.forEach(column => {
      if (column.textContent.toLowerCase().includes(query)) {
        match = true;
      }
    });
    
    if (match) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});




// Получаем ссылку на кнопку экспорта таблицы в Excel
var exportBtn = document.getElementById("export-btn");

// Добавляем обработчик события "click"
exportBtn.addEventListener("click", function() {
  // Создаем новую рабочую книгу
  var workbook = XLSX.utils.book_new();
  
  // Получаем ссылку на таблицу
  var table = document.querySelector("table");
  
  // Получаем данные из таблицы
  var data = XLSX.utils.table_to_sheet(table);
  
  // Добавляем данные в рабочую книгу
  XLSX.utils.book_append_sheet(workbook, data, "Sheet1");
  
  // Сохраняем файл
  XLSX.writeFile(workbook, "table.xlsx");
});



const pagination = document.getElementById('pagination');
const rowsPerPageSelect = document.getElementById('rows-per-page');

let currentPage = 1;
let rowsPerPage = parseInt(rowsPerPageSelect.value);

rowsPerPageSelect.addEventListener('change', () => {
  rowsPerPage = parseInt(rowsPerPageSelect.value);
  currentPage = 1;
  updateTable();
});

pagination.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.classList.contains('page-link')) {
    if (target.textContent === 'Назад') {
      currentPage--;
    } else if (target.textContent === 'Вперед') {
      currentPage++;
    } else {
      currentPage = parseInt(target.textContent);
    }

    updateTable();
  }
});

function updateTable() {
  const tableRows = document.querySelectorAll('table tbody tr');
  const firstRow = (currentPage - 1) * rowsPerPage;
  const lastRow = firstRow + rowsPerPage;

  tableRows.forEach((row, index) => {
    if (index < firstRow || index >= lastRow) {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  });

  const totalPages = Math.ceil(tableRows.length / rowsPerPage);
  const paginationList = pagination.querySelector('ul');
  paginationList.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('page-item');
    const link = document.createElement('a');
    link.classList.add('page-link');
    link.setAttribute('href', '#');
    link.textContent = i.toString();
    listItem.appendChild(link);
    paginationList.appendChild(listItem);
  }

  const prevBtn = pagination.querySelector('.page-item:first-child .page-link');
  const nextBtn = pagination.querySelector('.page-item:last-child .page-link');

  if (currentPage === 1) {
    prevBtn.parentElement.classList.add('disabled');
    prevBtn.setAttribute('aria-disabled', 'true');
  } else {
    prevBtn.parentElement.classList.remove('disabled');
    prevBtn.removeAttribute('aria-disabled');
  }

  if (currentPage === totalPages) {
    nextBtn.parentElement.classList.add('disabled');
    nextBtn.setAttribute('aria-disabled', 'true');
  } else {
    nextBtn.parentElement.classList.remove('disabled');
    nextBtn.removeAttribute('aria-disabled');
  }

  pagination.querySelectorAll('.page-item').forEach((pageItem) => {
    const pageLink = pageItem.querySelector('.page-link');

    if (pageLink.textContent === currentPage.toString()) {
      pageItem.classList.add('active');
      pageLink.setAttribute('aria-current', 'page');
    } else {
      pageItem.classList.remove('active');
      pageLink.removeAttribute('aria-current');
    }
  });
}


updateTable();


