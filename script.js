const checklist = document.querySelectorAll('#checklist input[type="checkbox"]');
const STORAGE_KEY = 'dailyChecklist';
const RESET_HOUR = 6;

function loadChecklist() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  checklist.forEach((box, index) => {
    box.checked = saved[index] || false;
    box.addEventListener('change', () => {
      saved[index] = box.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    });
  });
}

function resetIfNeeded() {
  const lastReset = localStorage.getItem('lastReset');
  const now = new Date();
  const todayResetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), RESET_HOUR);

  if (!lastReset || new Date(lastReset) < todayResetTime && now >= todayResetTime) {
    checklist.forEach(box => box.checked = false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    localStorage.setItem('lastReset', now.toISOString());
  }
}

loadChecklist();
resetIfNeeded();
