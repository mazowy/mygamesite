window.onload = function () {

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // 🐤 Bird (Round)
    const bird = {
        x: 120,
        y: canvas.height / 2,
        radius: 20,
        velocity: 0,
        gravity: 0.6,
        jumpPower: -10
    };

    function jump() {
        bird.velocity = bird.jumpPower;
    }

    // Controls (Laptop + Phone)
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
    let laserWidth = 40;
    let laserGap = 200;
    let laserSpeed = 4;

    function spawnLaser() {
        let topHeight = Math.random() * (canvas.height - laserGap - 100) + 50;

        lasers.push({
            x: canvas.width,
            topHeight: topHeight
        });
    }

    setInterval(spawnLaser, 1500);

    // 📈 Score
    let score = 0;
    let promotionText = "";
    let showPromotion = false;

    function showPromotionMessage() {
        promotionText = "PROMOTION!";
        showPromotion = true;

        setTimeout(() => {
            showPromotion = false;
        }, 1000);
    }

    function resetGame() {
        lasers = [];
        score = 0;
        laserSpeed = 4;
        bird.y = canvas.height / 2;
        bird.velocity = 0;
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gravity
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Ground / ceiling collision
        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
            resetGame();
        }

        // Draw bird
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        // Move and draw lasers
        for (let i = 0; i < lasers.length; i++) {
            let laser = lasers[i];
            laser.x -= laserSpeed;

            // Top laser
            ctx.fillStyle = "red";
            ctx.fillRect(laser.x, 0, laserWidth, laser.topHeight);

            // Bottom laser
            ctx.fillRect(
                laser.x,
                laser.topHeight + laserGap,
                laserWidth,
                canvas.height - laser.topHeight - laserGap
            );

            // Collision
            if (
                bird.x + bird.radius > laser.x &&
                bird.x - bird.radius < laser.x + laserWidth &&
                (
                    bird.y - bird.radius < laser.topHeight ||
                    bird.y + bird.radius > laser.topHeight + laserGap
                )
            ) {
                resetGame();
            }

            // Score
            if (laser.x + laserWidth === bird.x) {
                score++;

                if (score % 10 === 0) {
                    laserSpeed += 1;   // ⚡ Increase speed
                    showPromotionMessage();
                }
            }
        }

        // Remove off-screen lasers
        lasers = lasers.filter(laser => laser.x + laserWidth > 0);

        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + score, 20, 40);

        // Promotion text
        if (showPromotion) {
            ctx.fillStyle = "gold";
            ctx.font = "50px Arial";
            ctx.fillText(promotionText, canvas.width / 2 - 150, 100);
        }

        requestAnimationFrame(update);
    }

    update();
};
