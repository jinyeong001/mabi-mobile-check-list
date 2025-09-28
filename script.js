// 체크박스 초기화 시간 기준
const now = new Date();
const dailyResetHour = 6; // 오전 6시
const weeklyResetDay = 1; // 월요일(0:일요일,1:월요일)

function shouldResetDaily() {
  const lastReset = localStorage.getItem('dailyReset');
  if (!lastReset) return true;
  const lastDate = new Date(lastReset);
  return lastDate.getDate() !== now.getDate();
}

function shouldResetWeekly() {
  const lastReset = localStorage.getItem('weeklyReset');
  if (!lastReset) return true;
  const lastDate = new Date(lastReset);
  // 월요일 && 지난주인지 확인
  const lastWeek = getWeekNumber(lastDate);
  const thisWeek = getWeekNumber(now);
  return now.getDay() === weeklyResetDay && lastWeek !== thisWeek;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

function resetCheckboxes() {
  if (shouldResetDaily()) {
    document.querySelectorAll('.daily-checkbox').forEach(cb => cb.checked = false);
    localStorage.setItem('dailyReset', now);
  }
  if (shouldResetWeekly()) {
    document.querySelectorAll('.weekly-checkbox').forEach(cb => cb.checked = false);
    localStorage.setItem('weeklyReset', now);
  }
}

// 페이지 로드 시 실행
window.onload = () => {
  resetCheckboxes();

  // 체크박스 상태 저장
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      localStorage.setItem(cb.id, cb.checked);
    });
    // 저장된 상태 불러오기
    if(localStorage.getItem(cb.id) === 'true') cb.checked = true;
  });
};
