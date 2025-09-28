// 체크박스 초기화 및 저장
function resetCheckboxes(targetClass) {
  document.querySelectorAll(`.${targetClass}-checkbox`).forEach(cb => {
    cb.checked = false;
    localStorage.setItem(cb.id, 'false');
  });
}

// 버튼 이벤트
document.querySelectorAll('.reset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target; // daily or weekly
    resetCheckboxes(target);
  });
});

// 체크박스 상태 저장 & 불러오기
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    localStorage.setItem(cb.id, cb.checked);
  });
  if(localStorage.getItem(cb.id) === 'true') cb.checked = true;
});
