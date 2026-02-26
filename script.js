window.onload = function () {

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        groundY = canvas.height - 80;
    });

    // 🟫 Floor
    let groundHeight = 80;
    let groundY = canvas.height - groundHeight;

    // 🐤 Bird
    const bird = {
        x: 120,
        y: canvas.height / 2,
        radius: 20,
        velocity: 0,
        gravity: 0.7,
        jumpPower: -12
    };

    function jump() {
        bird.velocity = bird.jumpPower;
    }

    // Controls
    document.addEventListener("keydown", e => {
        if (e.code === "Space") jump();
    });

    canvas.addEventListener("click", jump);
    canvas.addEventListener("touchstart", e => {
        e.preventDefault();
        jump();
    });

    // 🔴 Lasers
    let lasers = [];
    let laserWidth = 30;
    let laserHeight = 150;
    let laserSpeed = 5;

    function spawnLaser() {
        let yPosition = Math.random() * (groundY - laserHeight - 50) + 50;

        lasers.push({
            x: canvas.width,
            y: yPosition
        });
    }

    setInterval(spawnLaser, 1500);

    // Score
    let score = 0;
    let showPromotion = false;

    function resetGame() {
        lasers = [];
        score = 0;
        laserSpeed = 5;
        bird.y = canvas.height / 2;
        bird.velocity = 0;
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gravity
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Floor collision
        if (bird.y + bird.radius > groundY) {
            resetGame();
        }

        // Ceiling collision
        if (bird.y - bird.radius < 0) {
            bird.y = bird.radius;
            bird.velocity = 0;
        }

        // Draw floor
        ctx.fillStyle = "#444";
        ctx.fillRect(0, groundY, canvas.width, groundHeight);

        // Draw bird
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        // Move lasers
        for (let i = 0; i < lasers.length; i++) {
            let laser = lasers[i];
            laser.x -= laserSpeed;

            // Draw laser
            ctx.fillStyle = "red";
            ctx.fillRect(laser.x, laser.y, laserWidth, laserHeight);

            // Collision
            if (
                bird.x + bird.radius > laser.x &&
                bird.x - bird.radius < laser.x + laserWidth &&
                bird.y + bird.radius > laser.y &&
                bird.y - bird.radius < laser.y + laserHeight
            ) {
                resetGame();
            }

            // Score
            if (laser.x + laserWidth === bird.x) {
                score++;

                if (score % 10 === 0) {
                    laserSpeed += 1;
                    showPromotion = true;

                    setTimeout(() => {
                        showPromotion = false;
                    }, 1000);
                }
            }
        }

        lasers = lasers.filter(laser => laser.x + laserWidth > 0);

        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + score, 20, 40);

        // Promotion text
        if (showPromotion) {
            ctx.fillStyle = "gold";
            ctx.font = "50px Arial";
            ctx.fillText("PROMOTION!", canvas.width / 2 - 170, 100);
        }

        requestAnimationFrame(update);
    }

    update();
};
