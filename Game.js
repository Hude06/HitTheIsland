import {Rect} from "./RectUtils.js"
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
let scoreElement = document.getElementById("score")
let score = 0
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
      currentKey.set(event.key, true);
    });
    window.addEventListener("keyup", function (event) {
      currentKey.set(event.key, false);
    });
}
class Paddle {
    constructor() {
        this.bounds = new Rect(800,700,100,10)
        this.speed = 3;
    }
    draw() {
        ctx.fillStyle = "black"
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
            this.bounds.x -= this.speed
        }
        if (currentKey.get("d") || currentKey.get("ArrowRight")) {
            this.bounds.x += this.speed
        }
    }
}
class Ball {
    constructor() {
        this.bounds = new Rect(500,200,10,10)
        this.direction = 10;
        this.speed = 1;
        this.gravity = 0.08;
        this.velocity = 0.1;
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        this.bounds.x += this.direction/5
        this.velocity += this.gravity
        this.bounds.y += this.velocity
        if (this.bounds.x >= canvas.width-20) {
            this.direction = -10
        }
        if (this.bounds.x <= 10) {
            this.direction = 10
        }
        if (this.bounds.intersects(paddle.bounds) || paddle.bounds.intersects(this.bounds)) {
            score += 1
            console.log("w")
            if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
                this.direction = 5
            }
            if (currentKey.get ("d") || currentKey.get("ArrowRight")) {
                this.direction = -5
                console.log(this.direction)
            }
            this.velocity = -10;
        }

    }
}
let paddle = new Paddle();
let ball = new Ball();
function loop() {   
    ctx.clearRect(0,0,canvas.width,canvas.height)
    scoreElement.innerHTML = score
    paddle.draw();
    paddle.update();
    ball.draw();
    ball.update();
    requestAnimationFrame(loop)
}
function init() {
    keyboardInit();
    loop();
}
init();