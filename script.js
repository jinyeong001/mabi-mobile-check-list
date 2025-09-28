function loadChecklist(tableId) {
  const table = document.getElementById(tableId);
  const checkboxes = table.querySelectorAll('input[type="checkbox"]');
  const saved = JSON.parse(localStorage.getItem(tableId)) || {};

  checkboxes.forEach((box, index) => {
    const row = box.closest('tr');
    box.checked = saved[index] || false;
    if (box.checked) row.classList.add('checked-row');

    box.addEventListener('change', () => {
      saved[index] = box.checked;
      localStorage.setItem(tableId, JSON.stringify(saved));
      row.classList.toggle('checked-row', box.checked);
    });
  });
}

function resetChecklist(tableId) {
  const table = document.getElementById(tableId);
  const checkboxes = table.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(box => {
    box.checked = false;
    const row = box.closest('tr');
    row.classList.remove('checked-row');
  });
  localStorage.setItem(tableId, JSON.stringify({}));
}

function resetAll() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    resetChecklist(table.id);
  });
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function toggleAllSections() {
  document.querySelectorAll('.section-content').forEach(section => {
    section.style.display = 'block';
  });
}

// 초기 로딩: 모든 테이블에 대해 체크박스 상태 불러오기
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('table').forEach(table => {
    loadChecklist(table.id);
  });
});
