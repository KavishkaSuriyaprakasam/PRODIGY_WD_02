let startTime, updatedTime, difference, tInterval, running = false, lapCount = 0;
const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startPauseTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        startPauseBtn.innerText = 'Pause';
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.innerText = 'Start';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.innerText = "00:00:00.000";
    startPauseBtn.innerText = 'Start';
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
    lapCount = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;

    timeDisplay.innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    lapCount++;
    const lapTime = document.createElement('li');
    lapTime.innerText = `Lap ${lapCount}: ${timeDisplay.innerText}`;
    lapsList.appendChild(lapTime);
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
