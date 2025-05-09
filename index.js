const backendUrl = "https://romanx2012-wheels-vs-doors-backend.replit.app";

// DOM elements
const scoreboard = document.getElementById("scoreboard");
const gifContainer = document.getElementById("gifContainer");
const drumroll = document.getElementById("drumroll");
const victory = document.getElementById("victory");
const fail = document.getElementById("fail");

// Submit vote
async function submitVote(choice) {
  choice = choice.trim().toLowerCase();

  if (choice !== "wheels" && choice !== "doors") {
    alert("Please enter only 'wheels' or 'doors'!");
    return false;
  }

  try {
    await fetch(`${backendUrl}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice }),
    });

    fetchResults();
    return true;
  } catch (err) {
    scoreboard.textContent = "Error sending your vote. Try again later.";
    return false;
  }
}

// Fetch and animate results
async function fetchResults() {
  try {
    const res = await fetch(`${backendUrl}/results`);
    const data = await res.json();
    animateScore(data.wheels, data.doors);
  } catch {
    scoreboard.textContent = "Could not load results.";
  }
}

// Animate live score updates
function animateScore(wheels, doors) {
  const wheelsEl = document.getElementById("wheels-count");
  const doorsEl = document.getElementById("doors-count");
  let currentWheels = 0, currentDoors = 0;

  const wheelsInterval = setInterval(() => {
    if (currentWheels < wheels) {
      currentWheels++;
      wheelsEl.textContent = currentWheels;
    } else {
      clearInterval(wheelsInterval);
    }
  }, 20);

  const doorsInterval = setInterval(() => {
    if (currentDoors < doors) {
      currentDoors++;
      doorsEl.textContent = currentDoors;
    } else {
      clearInterval(doorsInterval);
    }
  }, 20);
}

// Handle vote interaction
async function startDebate() {
  drumroll.play();
  gifContainer.innerHTML = '';

  setTimeout(async () => {
    const rawInput = prompt("Are you #TeamWheels or #TeamDoors?");
    if (!rawInput) return;

    const choice = rawInput.trim().toLowerCase();
    const voteSuccess = await submitVote(choice);

    if (!voteSuccess) return;

    if (choice === "wheels") {
      showGif("https://media.giphy.com/media/f9k1tV7HyORcngKF8v/giphy.gif");
      victory.play();
    } else if (choice === "doors") {
      showGif("https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif");
      victory.play();
    } else {
      showGif("https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif");
      fail.play();
    }
  }, 3000);
}

// Show funny result gif
function showGif(url) {
  gifContainer.innerHTML = `<img src="${url}" alt="result gif" class="funny-gif" />`;
}

// Neon theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("neon");
});

// Load initial results
window.onload = fetchResults;