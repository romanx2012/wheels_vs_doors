const backendUrl = "https://ae6b9677-7677-4e66-8e1c-d7c044f1b5ff-00-1u8ds941bs0j9.kirk.replit.dev";

// DOM elements
const scoreboard = document.getElementById("scoreboard");
const gifContainer = document.getElementById("gifContainer");
const drumroll = document.getElementById("drumroll");
const victory = document.getElementById("victory");
const fail = document.getElementById("fail");
const wheelsEl = document.getElementById("wheels-count");
const doorsEl = document.getElementById("doors-count");

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

// Get and display vote results
async function fetchResults() {
  try {
    const res = await fetch(`${backendUrl}/results`);
    const data = await res.json();
    animateScore(data.wheels, data.doors);
  } catch {
    scoreboard.textContent = "Could not load results.";
  }
}

// Animate scoreboard numbers
function animateScore(wheels, doors) {
  let currentWheels = 0;
  let currentDoors = 0;

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

// Show a fun GIF based on vote
function showGif(url) {
  gifContainer.innerHTML = `<img src="${url}" alt="result gif" class="funny-gif" />`;
}

// Handle vote button
function startDebate() {
  drumroll.play();
  gifContainer.innerHTML = '';

  setTimeout(async () => {
    const rawInput = prompt("Are you #TeamWheels or #TeamDoors?");
    if (!rawInput) return;

    const choice = rawInput.trim().toLowerCase();
    const accepted = await submitVote(choice);

    if (!accepted) return;

    if (choice === "wheels") {
      showGif("https://media.giphy.com/media/l0MYydaQCDQ6w5qre/giphy.gif");
      victory.play();
    } else if (choice === "doors") {
      showGif("https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif");
      victory.play();
    } else {
      showGif("https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif");
      fail.play();
    }
  }, 3000);
}

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("neon");
});

// Load vote count on page load
window.onload = fetchResults;