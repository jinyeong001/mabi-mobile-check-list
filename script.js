function loadChecklist(tableId) {
  const table = document.getElementById(tableId);
  const checkboxes = table.querySelectorAll('input[type="checkbox"]');
  const saved = JSON.parse(localStorage.getItem(tableId)) || {};

  checkboxes.forEach((box, index) => {
    box.checked = saved[index] || false;
  });

  updateRowHighlight(tableId);

  checkboxes.forEach((box, index) => {
    box.addEventListener('change', () => {
      saved[index] = box.checked;
      localStorage.setItem(tableId, JSON.stringify(saved));
      updateRowHighlight(tableId);
    });
  });
}


function resetChecklist(tableId) {
  const table = document.getElementById(tableId);
  const checkboxes = table.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(box => {
    box.checked = false;
  });
  localStorage.setItem(tableId, JSON.stringify({}));
  updateRowHighlight(tableId);
}

function resetAll() {
  document.querySelectorAll('table').forEach(table => {
    resetChecklist(table.id);
  });
}


function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function toggleAllSections() {
  const sections = document.querySelectorAll('.section-content');
  const allOpen = Array.from(sections).every(section => section.style.display === 'block');

  sections.forEach(section => {
    section.style.display = allOpen ? 'none' : 'block';
  });
}

function updateRowHighlight(tableId) {
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);

  rows.forEach(row => {
    const checkboxes = row.querySelectorAll('input[type="checkbox"]');
    const allChecked = checkboxes.length > 0 &&
                       Array.from(checkboxes).every(cb => cb.checked);

    row.classList.toggle('checked-row', allChecked);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('table').forEach(table => {
    loadChecklist(table.id);
  });
});
