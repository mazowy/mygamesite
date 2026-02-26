window.onload = function() {

    // Get canvas
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const bird = {
        x: 100,
        y: canvas.height / 2,
        width: 40,
        height: 40,
        velocity: 0,
        gravity: 0.6
    };

    function jump() {
        bird.velocity = -10;
    }

    document.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            jump();
        }
    });

    canvas.addEventListener("click", jump);

    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        jump();
    });

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        ctx.fillStyle = "yellow";
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

        requestAnimationFrame(update);
    }

    update();
};
