// 1. Data Definitions
const data = {
    insults: ["Your ex wasn't special, just emotionally unavailable.", "They blocked you but still watch your stories from a fake account.", "They were a 4, you were a 10. Math doesn't lie."],
    music: ["Lofi Hip Hop for Lonely Souls", "Someone Like You (Gully Remix)", "Mr. Brightside (but it's just the 'I'm fine' part)"],
    motivate: ["Gym + Money = The best revenge.", "Build your career; it won't wake up one day and stop loving you.", "You are the CEO of your own life. Don't hire interns."],
    reality: ["It's okay to be single. It's not okay to beg.", "Netflix costs 500, a date costs 5000. Do the math.", "Love is a chemical reaction; so is a house fire."],
    timeline: [
        { day: "Rose Day", lie: "Flowers", reality: "Smelling flowers in someone else's story" },
        { day: "Propose Day", lie: "Engagement", reality: "Proposing a new feature to your GitHub" },
        { day: "Chocolate Day", lie: "Gift box", reality: "Buying the 50% off candy for yourself" },
        { day: "Valentine's", lie: "Date Night", reality: "LeetCode & Sleep" }
    ]
};

// 2. Change Mood/Theme
function changeMood(mood) {
    document.body.className = `mood-${mood} font-sans min-h-screen`;
    localStorage.setItem('user-mood', mood);
}

// 3. Survival Actions
function survivalAction(type) {
    const display = document.getElementById('display-text');
    const list = data[type];
    const random = list[Math.floor(Math.random() * list.length)];
    display.innerText = random;
}

// 4. Progress Bar Logic
let currentStatus = 99;
function updateMeter(val) {
    currentStatus = Math.min(Math.max(currentStatus + val, 0), 100);
    document.getElementById('status-bar').style.width = currentStatus + "%";
    document.getElementById('meter-label').innerText = `Single Level: ${currentStatus}%`;
}

// 5. Render Timeline
const timelineBody = document.getElementById('timeline-body');
data.timeline.forEach(item => {
    timelineBody.innerHTML += `
        <tr class="border-b border-zinc-800">
            <td class="p-4 font-bold">${item.day}</td>
            <td class="p-4 line-through text-zinc-500">${item.lie}</td>
            <td class="p-4 text-green-400">${item.reality}</td>
        </tr>
    `;
});

// Load saved mood
window.onload = () => {
    const saved = localStorage.getItem('user-mood') || 'dark';
    changeMood(saved);
};

const memes = [
    "Me on Valentine's: Avoiding couples like merge conflicts.",
    "My relationship status? 404 Not Found.",
    "I'm not single, I'm just in a long-distance relationship with my career.",
    "Roses are red, violets are blue, I'm coding alone, and I like it too.",
    "My code works. That's more than I can say for my last relationship."
];

function generateMeme() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const quote = memes[Math.floor(Math.random() * memes.length)];

    // 1. Draw Background
    ctx.fillStyle = "#18181b"; // Zinc-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Decorative Border
    ctx.strokeStyle = "#dc2626"; // Red-600
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // 3. Draw "Survival Badge" Header
    ctx.fillStyle = "#dc2626";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("VALENTINE SURVIVOR 2026", canvas.width / 2, 60);

    // 4. Draw Main Quote (with wrapping logic)
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 24px Georgia";
    wrapText(ctx, quote, canvas.width / 2, canvas.height / 2, 400, 30);

    // 5. Update Download Link
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.href = canvas.toDataURL("image/png");
}

// Helper function to wrap text on canvas
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testY = y;

    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, testY);
            line = words[n] + ' ';
            testY += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, testY);
}

// Initialize the first meme on load
window.addEventListener('DOMContentLoaded', generateMeme);