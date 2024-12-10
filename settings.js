export function initializeSettings() {
  const theme = document.getElementById("theme");
  const defaultPomodoro = document.getElementById("default-pomodoro");
  const resetButton = document.getElementById("reset-settings");

  // 초기 값 설정
  const defaultSettings = {
    theme: "light",
    defaultPomodoro: 25,
  };
  const settings = JSON.parse(localStorage.getItem("settings")) || {
    ...defaultSettings,
  };

  // UI에 초기 값 반영
  const updateUI = () => {
    theme.value = settings.theme;
    defaultPomodoro.value = settings.defaultPomodoro;
    document.body.className = settings.theme; // 테마 적용
  };
  updateUI();

  // 테마 변경 이벤트
  theme.addEventListener("change", () => {
    settings.theme = theme.value;
    document.body.className = settings.theme; // 즉시 테마 변경
    localStorage.setItem("settings", JSON.stringify(settings));
  });

  // 기본 Pomodoro 시간 변경 이벤트
  defaultPomodoro.addEventListener("input", () => {
    const newValue = parseInt(defaultPomodoro.value, 10);
    if (newValue >= 1 && newValue <= 60) {
      settings.defaultPomodoro = newValue;
      localStorage.setItem("settings", JSON.stringify(settings));
    } else {
      alert("Pomodoro time must be between 1 and 60 minutes.");
      defaultPomodoro.value = settings.defaultPomodoro;
    }
  });

  // 초기화 버튼 이벤트
  resetButton.addEventListener("click", () => {
    // 설정을 기본값으로 복원
    Object.assign(settings, defaultSettings);
    localStorage.setItem("settings", JSON.stringify(settings));
    updateUI(); // UI 업데이트
    alert("Settings have been reset to default.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const settingButton = document.querySelector(".setting"); // Setting 버튼

  // 설정 초기화 함수 호출
  initializeSettings();
});
