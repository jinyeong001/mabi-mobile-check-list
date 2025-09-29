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

function resetChecklistGroup(tableIds) {
  tableIds.forEach(id => resetChecklist(id));
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

function toggleGroupSections(groupClass) {
  const sections = document.querySelectorAll(`.${groupClass} .section-content`);
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

function shouldResetDaily() {
  const now = new Date();
  const lastReset = localStorage.getItem('dailyResetTime');
  const today6am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

  return !lastReset || now > today6am && new Date(lastReset) < today6am;
}

function shouldResetWeekly() {
  const now = new Date();
  const lastReset = localStorage.getItem('weeklyResetTime');
  const today6am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

  const isMonday = now.getDay() === 1; // 0: Sunday, 1: Monday
  const lastResetDate = lastReset ? new Date(lastReset) : null;

  return isMonday && (!lastReset || lastResetDate.getDate() !== now.getDate());
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('table').forEach(table => {
    loadChecklist(table.id);
  });

  if (shouldResetDaily()) {
    resetChecklistGroup([
      'dailyTodoTable',
      'tirTable','dunbartonTable','colhenTable','banhornTable','imenTable','exTable'
    ]);
    localStorage.setItem('dailyResetTime', new Date().toISOString());
  }

  if (shouldResetWeekly()) {
    resetChecklistGroup([
      'weeklyTodoTable',
      'weeklyBanhornTable','weeklyImenTableSection'
    ]);
    localStorage.setItem('weeklyResetTime', new Date().toISOString());
  }
});

