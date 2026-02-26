// Get canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Make canvas fullscreen (works on phone + laptop)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Bird
const bird = {
    x: 100,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    velocity: 0,
    gravity: 0.6
};

// Jump function
function jump() {
    bird.velocity = -10;
}

// 🎮 Keyboard (Laptop)
document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        jump();
    }
});

// 🖱 Mouse (Laptop)
canvas.addEventListener("click", jump);

// 📱 Touch (Phone / Tablet)
canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    jump();
});

// Game Loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Draw bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    requestAnimationFrame(update);
}

update();
