import { startCustomTimer } from "./customTimer.js";

export function initializeModalHandler() {
  const modal = document.querySelector(".custom-timer-modal"); // 모달 요소
  const overlay = document.querySelector(".modal-overlay"); // 오버레이 요소
  const customBtn = document.querySelector(".customBtn"); // 모달 열기 버튼
  const closeModalBtns = document.querySelectorAll(".modal-close"); // 모달 닫기 버튼들 (닫기 전용)
  const modalBackButton = document.querySelector(".modal-back"); // 모달 리셋 버튼
  const modalStartButton = document.querySelector(".modal-start"); // 모달 시작 버튼

  const hourInput = document.getElementById("custom-hour"); // 시간 입력 필드
  const minuteInput = document.getElementById("custom-minute"); // 분 입력 필드
  const secondInput = document.getElementById("custom-second"); // 초 입력 필드
  const cycleCheckbox = document.getElementById("custom-cycle");
  const restCheckbox = document.getElementById("custom-rest");
  const restTimeInput = document.getElementById("rest-time");
  const messageTextarea = document.getElementById("custom-message"); // 메시지 입력 필드

  // 모달 열기
  customBtn.addEventListener("click", () => {
    modal.classList.add("active"); // 모달 활성화
    overlay.classList.add("active"); // 오버레이 활성화
  });

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  // 모달 닫기
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // 모달 리셋 버튼 클릭 시 입력 필드 초기화
  modalBackButton.addEventListener("click", () => {
    hourInput.value = 0; // 시간 초기화
    minuteInput.value = 0; // 분 초기화
    secondInput.value = 0; // 초 초기화
    cycleCheckbox.checked = false; // 사이클 체크박스 초기화
    restCheckbox.checked = false; // 레스트 체크박스 초기화
    restCheckbox.disabled = true; // 레스트 체크박스 비활성화
    restTimeInput.value = 0; // 레스트 시간 초기화
    restTimeInput.disabled = true; // 레스트 시간 필드 비활성화
    messageTextarea.value = ""; // 메시지 필드 초기화
  });

  // `cycleCheckbox`의 상태 변경 이벤트 처리
  cycleCheckbox.addEventListener("change", () => {
    if (cycleCheckbox.checked) {
      // `cycle`이 선택되면 `rest` 활성화
      restCheckbox.disabled = false;
      restTimeInput.disabled = false;
    } else {
      // `cycle`이 선택 해제되면 `rest` 비활성화 및 초기화
      restCheckbox.disabled = true;
      restCheckbox.checked = false;
      restTimeInput.disabled = true;
      restTimeInput.value = 0;
    }
  });

  // 레스트 시간 입력 필드 변경 시 체크박스 상태 업데이트
  restTimeInput.addEventListener("input", () => {
    const restTimeValue = parseInt(restTimeInput.value, 10) || 0;

    if (restTimeValue > 0) {
      restCheckbox.checked = true; // 값이 0이 아니면 체크박스 체크
    } else {
      restCheckbox.checked = false; // 값이 0이면 체크박스 체크 해제
    }
  });

  // 모달 시작 버튼 클릭 시
  modalStartButton.addEventListener("click", () => {
    const hours = parseInt(hourInput.value, 10) || 0; // 입력된 시간
    const minutes = parseInt(minuteInput.value, 10) || 0; // 입력된 분
    const seconds = parseInt(secondInput.value, 10) || 0; // 입력된 초
    const cycleEnabled = cycleCheckbox.checked;
    const restTime = cycleEnabled ? parseInt(restTimeInput.value, 10) || 0 : 0;

    // 사이클/레스트 설정 확인 및 타이머 시작
    console.log({
      hours,
      minutes,
      seconds,
      cycleEnabled,
      restTime,
    });

    // class="custom" 안에 값 업데이트
    startCustomTimer(hours, minutes, seconds);

    // 모달 닫기 호출
    closeModal();
  });
}
