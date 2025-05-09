const backendUrl = "https://romanx2012-wheels-vs-doors-backend.replit.app";

// Submit vote
async function submitVote(choice) {
  try {
    choice = choice.trim().toLowerCase(); // sanitize input
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
    document.getElementById("results").textContent =
      "Error sending your vote. Try again later.";
  }
}

// Get results
async function fetchResults() {
  try {
    const res = await fetch(`${backendUrl}/results`);
    const data = await res.json();
    document.getElementById("results").textContent = `Wheels: ${data.wheels} | Doors: ${data.doors}`;
  } catch (err) {
    document.getElementById("results").textContent = "Could not load results.";
  }
}

// Button interaction
function startDebate() {
  drumroll.play();
  gifContainer.innerHTML = '';
  setTimeout(() => {
    const choice = prompt("Do you believe there are more WHEELS or DOORS in the world?");
    if (choice) {
      submitVote(choice);
    }
  }, 3000);
} 

// Immediately fetch and display results when page loads
window.onload = fetchResults;