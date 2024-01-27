const changeMessage = document.getElementById("change-message");
const stopwatchElement = document.getElementById("timer");
const resetButton = document.getElementById("reset");
const userText = document.getElementById("user-text");
const messageText = document.querySelector("div h3");

const messages = [
  "Hello, world!",
  "How are you today?",
  "JavaScript is fun!",
  "Random message generator.",
  "Have a great day!",
];
let startTime;
let isRunning = false;
let interval;

function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];
  messageText.innerHTML = message;
}

function updateStopwatch() {
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime;
  let seconds = Math.floor(elapsedTime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hundredths = Math.floor((elapsedTime % 1000) / 10);

  seconds = seconds % 60;

  stopwatchElement.textContent = `${minutes}:${String(seconds).padStart(
    2,
    "0"
  )}:${String(hundredths).padStart(2, "0")}`;
}

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now();
    isRunning = true;
    interval = setInterval(updateStopwatch, 10); // Update every 10 milliseconds for hundredths
  }
}

function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
  }
}

function resetStopwatch() {
  isRunning = false;
  stopwatchElement.innerHTML = "00:00:00";
}

function startOnText() {
  let userTextLength = userText.value.length;
  if (userTextLength == 0 && !isRunning) startStopwatch();
}

function spellCheck() {
  let textEntered = userText.value;
  let messageTextMatch = messageText.innerHTML.substring(0, textEntered.length);
  if (textEntered == messageText.innerHTML) {
    userText.style.borderColor = "green";
    stopStopwatch();
  } else {
    if (textEntered == messageTextMatch) {
      userText.style.borderColor = "tomato";
    } else {
      userText.style.borderColor = "red";
    }
  }
}

function reset() {
  resetStopwatch();
  userText.value = "";
  userText.style.borderColor = "rgb(82, 81, 81)";
  clearInterval(interval);
  interval = null;
}

userText.addEventListener("keypress", startOnText);
userText.addEventListener("keyup", spellCheck);
changeMessage.addEventListener("click", getRandomMessage);
resetButton.addEventListener("click", reset);
