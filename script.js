let timer;
let DEFAULT_TIME = 25 * 60;
let timeLeft = DEFAULT_TIME;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const progressBar = document.getElementById("progressBar");
const timerLengthSelect = document.getElementById("timerLength");
const pomodoroSound = new Audio("ding.mp3");

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
  if (progressBar) {
    progressBar.max = DEFAULT_TIME;
    progressBar.value = DEFAULT_TIME - timeLeft;
  }
};

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Pomodoro complete!");
      pomodoroSound.play();
      isRunning = false;
      startBtn.disabled = false;
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = DEFAULT_TIME;
  updateDisplay();
  isRunning = false;
  startBtn.disabled = false;
}

if (timerLengthSelect) {
  timerLengthSelect.addEventListener("change", () => {
    DEFAULT_TIME = parseInt(timerLengthSelect.value);
    timeLeft = DEFAULT_TIME;
    updateDisplay();
  });
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay(); // Call once on load



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

// To do 
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
document.getElementById("taskCount").textContent = `Tasks: ${tasks.length}`;

function renderDashboardTasks() {
  const container = document.getElementById("dashboardTasksPreview");
  if (!container) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const latest = [...tasks].reverse().slice(0, 2); // Show last 2 tasks

  container.innerHTML = "";
  latest.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-preview";
    div.textContent = task.text || task.title || "Untitled Task";
    container.appendChild(div);
  });

  // Update count
  const taskCountEl = document.getElementById("taskCount");
  if (taskCountEl) {
    taskCountEl.textContent = `Tasks: ${tasks.length}`;
  }
}

// Motivation logic

const quotes = [
  "Believe in yourself!",
  "Every day is a fresh start.",
  "Push through the pain — growth lives there.",
  "Stay focused and never give up.",
  "You are capable of amazing things.",
  "Make today count!",
  "Dream big. Work hard. Stay humble.",
  "The secret to getting ahead is getting started."
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('quoteDisplay').textContent = `"${quotes[randomIndex]}"`;
}

// Initial quote on page load
window.addEventListener('DOMContentLoaded', generateQuote);

// Notes section
function renderDashboardNotes() {
  const container = document.getElementById("dashboardNotesPreview");
  if (!container) return;

  const notes = JSON.parse(localStorage.getItem("notesList")) || [];
  const latest = [...notes].reverse().slice(0, 2); // Show last 2 saved notes

  container.innerHTML = "";
  latest.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-preview";
    div.textContent = note.text;
    container.appendChild(div);
  });
}


// Time table secction

function renderDashboardTimetable() {
  const container = document.getElementById("dashboardTimetablePreview");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("timetableData")) || {};
  const days = Object.keys(data);
  const previewItems = [];

  for (let day of days) {
    const periods = data[day];
    for (let period in periods) {
      const subject = periods[period];
      if (subject && subject.trim()) {
        previewItems.push(`${day} - Period ${+period + 1}: ${subject}`);
        if (previewItems.length >= 3) break;
      }
    }
    if (previewItems.length >= 3) break;
  }

  container.innerHTML = "";
  if (previewItems.length === 0) {
    container.innerHTML = `<p style="font-size: 0.85em; opacity: 0.8;">No upcoming classes saved.</p>`;
    return;
  }

  previewItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "timetable-preview-row";
    div.textContent = item;
    container.appendChild(div);
  });
}

// Call with notes and tasks render
window.addEventListener("DOMContentLoaded", () => {
  renderDashboardNotes();
  renderDashboardTasks(); 
  renderDashboardTimetable();
});
