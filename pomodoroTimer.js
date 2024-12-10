export function initializePomodoroTimer() {
  const startButton = document.querySelector(".start");
  const minutesSelect = document.querySelector(".min");
  const minuteDisplay = document.querySelector(".minute-display");
  const secondsDiv = document.querySelector(".sec");
  const backButton = document.querySelector(".pomo-back");

  let timerInterval = null;
  let remainingMinutes = 0;
  let remainingSeconds = 0;
  let isPaused = false;

  startButton.addEventListener("click", function () {
    if (startButton.textContent === "start") {
      startButton.textContent = "stop";
      minutesSelect.classList.add("hidden");
      minuteDisplay.classList.add("active");

      if (!isPaused) {
        remainingMinutes = parseInt(minutesSelect.value, 10);
        remainingSeconds = 0;
        minuteDisplay.textContent = remainingMinutes.toString();
        secondsDiv.textContent = "00";
      }

      isPaused = false;

      timerInterval = setInterval(() => {
        if (remainingMinutes === 0 && remainingSeconds === 0) {
          clearInterval(timerInterval);
          startButton.textContent = "start";
          minutesSelect.classList.remove("hidden");
          minuteDisplay.classList.remove("active");
          isPaused = false;
          alert("Time's up!");
        } else {
          if (remainingSeconds === 0) {
            remainingSeconds = 59;
            remainingMinutes--;
          } else {
            remainingSeconds--;
          }
        }

        minuteDisplay.textContent = remainingMinutes.toString();
        secondsDiv.textContent = remainingSeconds.toString().padStart(2, "0");
      }, 1000);
    } else {
      startButton.textContent = "start";
      clearInterval(timerInterval);
      isPaused = true;
    }
  });
  // 초기화 함수
  function resetPomodoroTimer() {
    if (timerInterval) {
      clearInterval(timerInterval); // 타이머 중지
      timerInterval = null; // 타이머 상태 초기화
    }

    // 상태 초기화
    isPaused = false;
    remainingMinutes = 0;
    remainingSeconds = 0;

    // DOM 요소 초기화
    startButton.textContent = "start"; // 시작 버튼 초기화
    minutesSelect.classList.remove("hidden"); // 드롭다운 표시
    minuteDisplay.classList.remove("active"); // 활성화 상태 제거
    minutesSelect.value = "25"; // 드롭다운 초기값 설정
    minuteDisplay.textContent = "25"; // 디스플레이 초기화
    secondsDiv.textContent = "00"; // 초 초기화
  }

  // Back 버튼 클릭 이벤트
  backButton.addEventListener("click", resetPomodoroTimer);
}
