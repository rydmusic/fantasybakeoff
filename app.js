// --- First Time Visitor Logic & Cinematic Intro ---
document.addEventListener("DOMContentLoaded", () => {
    const hasVisited = localStorage.getItem("gbbo_visited");
    
    const introSequence = document.getElementById("intro-sequence");
    const logo = document.getElementById("gbbo-logo");
    const enterText = document.getElementById("enter-text");
    
    const videoOverlay = document.getElementById("video-overlay");
    const closeVideoBtn = document.getElementById("close-video-btn");
    const iframe = document.getElementById("intro-video");

    if (!hasVisited) {
        // 1. Wait 3 seconds, then fade in the logo
        setTimeout(() => {
            logo.classList.add("fade-in");
        }, 3000);

        // 2. Wait an additional 2 seconds (5 seconds total), then fade in text
        setTimeout(() => {
            enterText.classList.add("fade-in");
        }, 5000);

        // 3. User clicks text -> Hide Intro, Show Video, Autoplay Video
        enterText.addEventListener("click", () => {
            introSequence.classList.add("hidden");
            videoOverlay.classList.remove("hidden");
            
            // Appending autoplay to the src string forces it to play
            iframe.src += "&autoplay=1"; 
        });

        // 4. User closes video to access the site
        closeVideoBtn.addEventListener("click", () => {
            videoOverlay.classList.add("hidden");
            localStorage.setItem("gbbo_visited", "true"); // Mark site as visited
            iframe.src = ""; // Clear iframe source to stop audio playing in background
        });

    } else {
        // If they have visited before, skip the intro and video completely
        introSequence.classList.add("hidden");
        videoOverlay.classList.add("hidden");
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

// Mock data for the league table
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
    
    const predictions = {
        technical: document.getElementById("technical").value,
        starBaker: document.getElementById("star-baker").value,
        leaving: document.getElementById("leaving").value,
        handshake: document.getElementById("handshake").value
    };

    alert(`Predictions saved for ${playerName}!`);
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
