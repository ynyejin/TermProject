export function initializeCircleListeners() {
  document.querySelectorAll(".circle").forEach((circle) => {
    circle.addEventListener("click", function () {
      this.querySelector(".circle-text").style.display = "none"; // 텍스트 숨기기
      this.classList.add("expand");

      document.querySelectorAll(".circle").forEach((otherCircle) => {
        if (otherCircle !== this) {
          otherCircle.style.opacity = "0";
          otherCircle.style.pointerEvents = "none";
        }
      });

      const targetContent = document.getElementById(this.dataset.target);

      setTimeout(() => {
        document.querySelectorAll(".content").forEach((content) => {
          content.classList.remove("active");
        });
        targetContent.classList.add("active");
      }, 300);
    });
  });

  document.querySelector(".Pocus").addEventListener("click", function () {
    document.querySelectorAll(".circle").forEach((circle) => {
      circle.classList.remove("expand");
      circle.style.opacity = "1";
      circle.style.pointerEvents = "auto";

      circle.querySelector(".circle-text").style.display = "block"; // 텍스트 복원
    });

    document.querySelectorAll(".content").forEach((content) => {
      content.classList.remove("active");
    });
  });
}
