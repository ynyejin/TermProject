let timerInterval = null; // 타이머 인터벌 변수
let isPaused = false; // 타이머 일시정지 상태 확인

export function startCustomTimer(hours, minutes, seconds) {
  const customHour = document.getElementById("input-hour"); // 시간 표시 요소
  const customMinute = document.getElementById("input-min"); // 분 표시 요소
  const customSecond = document.getElementById("input-sec"); // 초 표시 요소
  const stopButton = document.getElementById("custom-stop"); // 타이머 정지 버튼 추가
  const restCheckbox = document.getElementById("custom-rest"); // Rest 체크박스
  const restTimeInput = document.getElementById("rest-time"); // Rest 입력 필드

  if (!customHour || !customMinute || !customSecond) {
    console.error("Timer UI elements are missing in the DOM!");
    return;
  }

  // **Rest 입력 필드 변경 이벤트**
  restTimeInput.addEventListener("input", () => {
    const restTimeValue = parseInt(restTimeInput.value, 10) || 0;
    restCheckbox.checked = restTimeValue > 0;
  });

  // 기존 타이머 종료
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false; // 상태 초기화
    stopButton.textContent = "Stop"; // 버튼 상태 초기화
  }

  customHour.textContent = hours.toString().padStart(2, "0");
  customMinute.textContent = minutes.toString().padStart(2, "0");
  customSecond.textContent = seconds.toString().padStart(2, "0");

  let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

  // 타이머 시작 및 정지 기능 추가
  const toggleTimer = () => {
    if (isPaused) {
      isPaused = false;
      stopButton.textContent = "Stop";
      timerInterval = setInterval(updateTimer, 1000); // 1초마다 실행
    } else {
      isPaused = true;
      stopButton.textContent = "Start";
      clearInterval(timerInterval);
    }
  };

  // 정지 버튼 클릭 이벤트 추가 전에 기존 리스너 제거
  stopButton.removeEventListener("click", toggleTimer);
  stopButton.addEventListener("click", toggleTimer);

  // 타이머 업데이트 함수
  const updateTimer = () => {
    if (totalTimeInSeconds <= 0) {
      clearInterval(timerInterval); // 타이머 종료
      stopButton.textContent = "Start"; // 버튼 초기화
      alert("타이머가 종료되었습니다!"); // 알림창 표시
      return;
    }
    totalTimeInSeconds--; // 남은 시간 1초 감소

    // 시간, 분, 초 계산
    const displayHours = Math.floor(totalTimeInSeconds / 3600);
    const displayMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const displaySeconds = totalTimeInSeconds % 60;

    // UI 업데이트
    customHour.textContent = displayHours.toString().padStart(2, "0");
    customMinute.textContent = displayMinutes.toString().padStart(2, "0");
    customSecond.textContent = displaySeconds.toString().padStart(2, "0");
  };

  // 초기 상태에서 타이머 시작
  timerInterval = setInterval(updateTimer, 1000);

  // 정지 버튼 클릭 이벤트
  stopButton.addEventListener("click", toggleTimer);
}

// 초기화 함수
export function initializeCustomTimer() {
  const customHour = document.getElementById("input-hour"); // 시간 표시 요소
  const customMinute = document.getElementById("input-min"); // 분 표시 요소
  const customSecond = document.getElementById("input-sec"); // 초 표시 요소

  return {
    customHour,
    customMinute,
    customSecond,
  };
}
