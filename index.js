// 1) start score with: 0 0
// 2)on either home or guest screen: onclick function when hitting +1 add 1 point to score when hitting +2 add 2 point to score, when hitting +3 add 3 point to score
// 3) reset: onclick function when hitting new game reset score board to 0 0 
// 4) Add timer: when cliking new game
// 5) Add Period
// 6) Add Fouls
// 7) Highlight leader
// 8) Add start game

let timerInterval;
let timerTime = 1 * 02; // 15 minutes in seconds
let currentPeriod = 1;

function startTimer() {
    clearInterval(timerInterval); 
    timerTime = 1 * 02; 
    currentPeriod = 1;
    updateTimerDisplay();
    checkPeriodRadio(currentPeriod);

    timerInterval = setInterval(function() {
        if (timerTime > 0) {
            timerTime--;
            updateTimerDisplay();
        } else {
            currentPeriod++;
            if (currentPeriod <= 4) {
                timerTime = 1 * 02; // reset timer for next period
                checkPeriodRadio(currentPeriod);
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                document.getElementById("timer-display").textContent = "GAME OVER";
                disableAllButtons();
            }
        }
    }, 1000); 
}

function disableAllButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        if (btn.id !== "reset-game-btn") {
            btn.disabled = true;
            btn.style.opacity = 0.4;
            btn.style.cursor = "not-allowed";
        }
    });

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.disabled = true;
    });
}

function updateTimerDisplay() {
    let minutes = Math.floor(timerTime / 60);
    let seconds = timerTime % 60;
    let formattedTime = 
        minutes.toString().padStart(2, '0') + ":" + 
        seconds.toString().padStart(2, '0');
    document.getElementById("timer-display").textContent = formattedTime;
}

function checkPeriodRadio(period) {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio, index) => {
        radio.checked = (index === period - 1); // match current period to radio button
    });
}

// On refresh, set scoreboard to - - 
window.onload = function() {
    //Look for the screens
    var homePoints = document.getElementById("home-points")
    var guestPoints = document.getElementById("guest-points")
    var homeFouls = document.getElementById("home-fouls")
    var guestFouls = document.getElementById("guest-fouls")
    //Set it to -
    homePoints.innerHTML = "-";
    guestPoints.innerHTML = "-";
    homeFouls.innerHTML = "-";
    guestFouls.innerHTML = "-";
    document.getElementById("overlay").classList.remove("hidden");
};
        
// Highlight the leader team: Add a highlightLeader() function
function highlightLeader() {
    if (countHome > countGuest) {
        homePoints.style.color = "#FF0000";   // bright red
        guestPoints.style.color = "#F94F6D";   // default
    } else if (countGuest > countHome) {
        guestPoints.style.color = "#FF0000";   // bright red
        homePoints.style.color = "#F94F6D";    // default
    } else {
        homePoints.style.color = "orange";     // tie
        guestPoints.style.color = "orange";
    }
}

// Add points to Home by clicking on one of the buttons and Call highlightLeader() inside all your increment functions after updating the scores:
let homePoints = document.getElementById("home-points")
let countHome = 0

function increment1Home() {
    countHome += 1;
    homePoints.textContent = countHome;
    highlightLeader();
}

function increment2Home() {
    countHome += 2;
    homePoints.textContent = countHome;
    highlightLeader();
}

function increment3Home() {
    countHome += 3;
    homePoints.textContent = countHome;
    highlightLeader();
}

// Add points to Guest by clicking on one of the buttons and Call highlightLeader() inside all your increment functions after updating the scores:
let guestPoints = document.getElementById("guest-points")
let countGuest = 0

function increment1Guest() {
    countGuest += 1;
    guestPoints.textContent = countGuest;
    highlightLeader();
}

function increment2Guest() {
    countGuest += 2;
    guestPoints.textContent = countGuest;
    highlightLeader();
}

function increment3Guest() {
    countGuest += 3;
    guestPoints.textContent = countGuest;
    highlightLeader();
}

// Add subtract fouls to Home by clicking button
let homeFouls = document.getElementById("home-fouls")
let countFoulsHome = 0

function incrementFoulsHome() {
    countFoulsHome += 1
    homeFouls.textContent = countFoulsHome
}

function decrementFoulsHome() {
    countFoulsHome -= 1
    homeFouls.textContent = countFoulsHome
}

// Add subtract fouls to Guest by clicking button
let guestFouls = document.getElementById("guest-fouls")
let countFoulsGuest = 0

function incrementFoulsGuest() {
    countFoulsGuest += 1
    guestFouls.textContent = countFoulsGuest
}

function decrementFoulsGuest() {
    countFoulsGuest -= 1
    guestFouls.textContent = countFoulsGuest
}

// Reset game. Set score to 0 0, radio buttons to unchecked, show start button, and set timer on 15:00
function startGame() {
      // Hide overlay smoothly
    document.getElementById("overlay").classList.add("hidden");

    // Hide button
    document.getElementById("new-game-container").style.display = "none";

    // Hide "NEW GAME" button
    document.getElementById("new-game-container").style.display = "none";
    countHome = 0;
    countGuest = 0;
    homePoints.innerHTML = "0";
    guestPoints.innerHTML = "0";
    homePoints.style.color = "#F94F6D";  // default color
    guestPoints.style.color = "#F94F6D";
    countFoulsHome = 0
    countFoulsGuest = 0
    homeFouls.innerHTML = "0";
    guestFouls.innerHTML = "0";
    startTimer(); // <<-- Start timer when new game
}

function resetGame() {
    countHome = 0;
    countGuest = 0;
    homePoints.innerHTML = "-";
    guestPoints.innerHTML = "-";
    countFoulsHome = 0;
    countFoulsGuest = 0;
    homeFouls.innerHTML = "-";
    guestFouls.innerHTML = "-";
    homePoints.style.color = "#F94F6D";
    guestPoints.style.color = "#F94F6D";

    // Re-enable buttons
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = 1;
        btn.style.cursor = "pointer";
    });

    // Uncheck and enable radios
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = false;
        radio.checked = false;
    });

    // Stop timer and reset time
    clearInterval(timerInterval);
    timerTime = 0;
    currentPeriod = 0;
    document.getElementById("timer-display").textContent = "00:00";

    // Show overlay with blur again
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("hidden");

    // Show NEW GAME button
    const newGameBtn = document.getElementById("new-game-container");
    newGameBtn.style.display = "flex";
    newGameBtn.classList.remove("hidden"); // trigger re-animation
}