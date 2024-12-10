import { initializeCircleListeners } from "./circleHandler.js";
import { initializePomodoroTimer } from "./pomodoroTimer.js";
import { initializeCustomTimer } from "./customTimer.js";
import { initializeModalHandler } from "./modalHandler.js";
import { initializestopwatch } from "./stopwatch.js";
import { initializeSettings } from "./settings.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCircleListeners();
  initializePomodoroTimer();
  initializeCustomTimer();
  initializeModalHandler();
  initializestopwatch();
  initializeSettings();
});
