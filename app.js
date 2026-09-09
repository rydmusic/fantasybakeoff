// --- First Time Visitor Logic ---
document.addEventListener("DOMContentLoaded", () => {
    const hasVisited = localStorage.getItem("gbbo_visited");
    const videoOverlay = document.getElementById("video-overlay");
    const enterBtn = document.getElementById("enter-site-btn");

    if (!hasVisited) {
        // Show video overlay on first visit
        videoOverlay.classList.remove("hidden");
        
        // Add autoplay parameter to the iframe src
        const iframe = document.getElementById("intro-video");
        iframe.src += "&autoplay=1";

        enterBtn.addEventListener("click", () => {
            videoOverlay.classList.add("hidden");
            localStorage.setItem("gbbo_visited", "true");
            // Stop the video
            iframe.src = ""; 
        });
    }

    renderLeaderboard();
});

// --- Points System Configuration ---
const POINTS = {
    technical: 3,
    starBaker: 5,
    leaving: 2,
    handshake: 10
};

// Mock data for the league table (In a real app, you'd fetch this from Firebase/Supabase)
let players = [
    { name: "Alice", score: 12 },
    { name: "Bob", score: 8 },
    { name: "Charlie", score: 18 }
];

// --- Form Submission Logic ---
const form = document.getElementById("prediction-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerName = document.getElementById("player-name").value;
    
    // In a fully working app with a backend, you would send this data to a database here.
    const predictions = {
        technical: document.getElementById("technical").value,
        starBaker: document.getElementById("star-baker").value,
        leaving: document.getElementById("leaving").value,
        handshake: document.getElementById("handshake").value
    };

    alert(`Predictions saved for ${playerName}! (Backend database required to keep these permanently)`);
    form.reset();
});

// --- Leaderboard Logic ---
function renderLeaderboard() {
    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";

    // Sort players by highest score
    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;
        tbody.appendChild(row);
    });
}