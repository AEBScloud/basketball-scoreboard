// Points and fouls
const scores = {
    home: { points: 0, fouls: 0 },
    guest: { points: 0, fouls: 0 }
};

// Update display
function updateDisplay() {
    document.getElementById("home-points").textContent = scores.home.points;
    document.getElementById("guest-points").textContent = scores.guest.points;
    document.getElementById("home-fouls").textContent = scores.home.fouls;
    document.getElementById("guest-fouls").textContent = scores.guest.fouls;
}

// Handle scoring and fouls
document.body.addEventListener("click", (e) => {
    const target = e.target;

    // Score buttons
    if (target.classList.contains("points-btn")) {
        const team = target.dataset.team;
        const points = parseInt(target.dataset.points);
        scores[team].points += points;
        updateDisplay();
    }

    // Foul buttons
    if (target.classList.contains("fouls-btn")) {
        const team = target.dataset.team;
        const foulChange = parseInt(target.dataset.foul);
        scores[team].fouls = Math.max(0, scores[team].fouls + foulChange);
        updateDisplay();
    }

    // Start game button (overlay)
    if (target.id === "start-btn") {
        document.getElementById("overlay").style.display = "none";
    }

    // Reset game
    if (target.id === "reset-game-btn") {
        scores.home.points = 0;
        scores.guest.points = 0;
        scores.home.fouls = 0;
        scores.guest.fouls = 0;
        resetTimer();
        updateDisplay();
        document.getElementById("period").value = "1";
    }
});

// Timer functionality
let timerInterval;
let timeRemaining = 12 * 60;

const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-timer-btn");
const stopBtn = document.getElementById("stop-timer-btn");
const resetBtn = document.getElementById("reset-timer-btn");

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (timerInterval) return;

    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            stopTimer();
            return;
        }
        timeRemaining--;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function resetTimer() {
    stopTimer();
    timeRemaining = 12 * 60;
    updateTimerDisplay();
}

// Timer control buttons
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial setup
updateDisplay();
updateTimerDisplay();