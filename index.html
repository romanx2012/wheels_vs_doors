const backendUrl = "https://romanx2012-wheels-vs-doors-backend.replit.app";

// DOM elements
const scoreboard = document.getElementById("scoreboard");
const gifContainer = document.getElementById("gifContainer");
const drumroll = document.getElementById("drumroll");
const victory = document.getElementById("victory");
const fail = document.getElementById("fail");

// Vote submission
async function submitVote(choice) {
  try {
    choice = choice.trim().toLowerCase();
    if (choice !== "wheels" && choice !== "doors") {
      alert("Please enter either 'wheels' or 'doors'.");
      return;
    }

    await fetch(`${backendUrl}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ choice }),
    });

    fetchResults();
  } catch (err) {
    scoreboard.textContent = "Error sending your vote. Try again later.";
  }
}

// Get updated vote totals
async function fetchResults() {
  try {
    const res = await fetch(`${backendUrl}/results`);
    const data = await res.json();
    animateScore(data.wheels, data.doors);
  } catch (err) {
    scoreboard.textContent = "Could not load results.";
  }
}

// Animate scoreboard count
function animateScore(wheels, doors) {
  const wheelsEl = document.getElementById("wheels-count");
  const doorsEl = document.getElementById("doors-count");

  let currentWheels = 0;
  let currentDoors = 0;

  const wheelsInterval = setInterval(() => {
    if (currentWheels < wheels) {
      currentWheels++;
      wheelsEl.textContent = currentWheels;
    } else {
      clearInterval(wheelsInterval);
    }
  }, 30);

  const doorsInterval = setInterval(() => {
    if (currentDoors < doors) {
      currentDoors++;
      doorsEl.textContent = currentDoors;
    } else {
      clearInterval(doorsInterval);
    }
  }, 30);
}

// Handle voting interaction
function startDebate() {
  drumroll.play();
  gifContainer.innerHTML = '';

  setTimeout(() => {
    const choice = prompt("Do you believe there are more WHEELS or DOORS in the world?");
    if (choice) {
      submitVote(choice);
      if (choice.trim().toLowerCase() === "wheels") {
        showGif("https://media.giphy.com/media/f9k1tV7HyORcngKF8v/giphy.gif");
        victory.play();
      } else if (choice.trim().toLowerCase() === "doors") {
        showGif("https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif");
        victory.play();
      } else {
        showGif("https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif");
        fail.play();
      }
    }
  }, 3000);
}

// Funny animation
function showGif(url) {
  gifContainer.innerHTML = `<img src="${url}" alt="result gif" class="funny-gif" />`;
}

// Neon mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("neon");
});

// Load results on startup
window.onload = fetchResults;