export function initializestopwatch() {
  // 요소 가져오기
  const hourElement = document.querySelector(".stopwatch-hour");
  const minuteElement = document.querySelector(".stopwatch-min");
  const secondElement = document.querySelector(".stopwatch-sec");
  const startButton = document.querySelector(".stopwatch-start");

  let timerInterval = null; // 타이머 인터벌 ID
  let isRunning = false; // 타이머 실행 상태
  let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0; // 시간, 분, 초, 밀리초 초기화

  // 밀리초 표시 요소 추가
  const contentDiv = document.getElementById("stopwatch-content");
  const millisecondElement = document.createElement("div");
  millisecondElement.classList.add("stopwatch-millisec");
  millisecondElement.textContent = "00";
  contentDiv.appendChild(millisecondElement);

  // 스톱워치 업데이트 함수
  const updateStopwatch = () => {
    milliseconds += 1; // 1 밀리초 증가
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }

    // UI 업데이트
    hourElement.textContent = hours.toString().padStart(2, "0");
    minuteElement.textContent = minutes.toString().padStart(2, "0");
    secondElement.textContent = seconds.toString().padStart(2, "0");
    millisecondElement.textContent = milliseconds.toString().padStart(2, "0");
  };

  // start 버튼 클릭 이벤트
  startButton.addEventListener("click", () => {
    if (isRunning) {
      // 이미 실행 중이면 스톱워치 정지
      clearInterval(timerInterval);
      isRunning = false;
      startButton.textContent = "start"; // 버튼 텍스트 변경
    } else {
      // 스톱워치 시작
      timerInterval = setInterval(updateStopwatch, 10); // 10밀리초마다 업데이트
      isRunning = true;
      startButton.textContent = "stop"; // 버튼 텍스트 변경
    }
  });
}
