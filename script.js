// Pomodoro logic
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Pomodoro complete!");
      isRunning = false;
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateDisplay();
  isRunning = false;
}

// Event Listeners for start, pause and reset func in timer
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay(); // Initialize display on load


// Dark Mode
const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Optional: toggle button text or emoji
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️ ";
  } else {
    toggleBtn.textContent = "🌙 ";
  }
});
