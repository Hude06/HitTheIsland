import {Rect} from "./RectUtils.js"
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
let scoreElement = document.getElementById("score")
let score = 0
let StartButton = document.getElementById("Start")
let SettingsButton = document.getElementById("Settings")
let menu = document.getElementById("menu")
let gameScreen = document.getElementById("fullscreen")
let music = new Audio();
let hit = new Audio();
let shake = false;
hit.src = "./hit.wav"
music.src = "./music.mp3"
hit.volume = 1;
music.volume = 0.7;
music.play();
let mode = "menu"
function shakeScreen() {
    shake = true;
    setTimeout(() => {
        shake = false
      }, 150);
}
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
            shakeScreen();

            hit.play();
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
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height)

    if (shake) {
        var dx = Math.random()*15;
        var dy = Math.random()*15;
        ctx.translate(dx, dy);
    }
    scoreElement.innerHTML = score
    if (mode === "menu") {
        canvas.style.visibility = "hidden"
    }
    if (mode === "game") {
        gameScreen.style.visibility = "visible"
        canvas.style.visibility = "visible"
        paddle.draw();
        paddle.update();
        ball.draw();
        ball.update();
    }
    if (mode === "settings") {
        menu.style.visibility = "hidden"
        console.log("Settings Running")
    }
    ctx.restore();
    requestAnimationFrame(loop)
}
function init() {
    StartButton.addEventListener("click", function () {
        console.log("clicked")
        mode = "game";
      }); 
      SettingsButton.addEventListener("click", function () {
        console.log("clicked")
        mode = "settings";
        console.log("Settings")
      });
    keyboardInit();
    loop();
}
init();