const checklistSection = document.getElementById('checklistSection');
const toggleTitle = document.querySelector('.toggle-title');
const resetBtn = document.getElementById('resetBtn');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const STORAGE_KEY = 'darkChecklist';

toggleTitle.addEventListener('click', () => {
  checklistSection.classList.toggle('collapsed');
});

checkboxes.forEach((box, index) => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  box.checked = saved[index] || false;

  box.addEventListener('change', () => {
    saved[index] = box.checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  });
});

resetBtn.addEventListener('click', () => {
  checkboxes.forEach(box => box.checked = false);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
});
