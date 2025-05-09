const backendUrl = "https://romanx2012-wheels-vs-doors-backend.replit.app";

// Submit vote
async function submitVote(choice) {
  try {
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