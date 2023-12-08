let canvasWidth = 800;
let canvasHeight = 800;
let rotationSpeed = 2.60;
let flashThreshold = 2.90;
let flashSpeed = 30;
let flashColor;
let bgColor;

let fontSize = 37;
let words = ["Hi professor Talmage", "My name is Grace Lukan", "I am using p5.js for the first time", "I am a computer science major", "I love to code(somtimes haha)", "This is so cool omg" , " I like how we can write messages on here" , "and it changes color"];
let currentWordIndex = 0;
let textColor;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
  noStroke();
  flashColor = color(random(255), random(255), random(255));
  bgColor = color(30);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
}

function draw() {
  // Dynamic background color based on mouse position
  bgColor = lerpColor(color(240, 240, 240), color(100, 100, 255), map(mouseX, 0, width, 0, 1));

  background(bgColor);

  // Flash effect based on noise
  if (noise(frameCount * 0.01) > flashThreshold) {
    fill(flashColor);
    rect(0, 0, width, height);
  }

  translate(width / 2, height / 2);
  rotate(frameCount * rotationSpeed);

  // Draw rotating shapes
  for (let i = 0; i < 6; i++) {
    let shapeSize = 50 + 30 * sin(frameCount * 0.05 + i * 60);
    let shapeColor = color(
      128 + 127 * sin(frameCount * 0.02 + i * 60),
      128 + 127 * sin(frameCount * 0.02 + 120 + i * 60),
      128 + 127 * sin(frameCount * 0.02 + 240 + i * 60)
    );
    fill(shapeColor);
    ellipse(100, 0, shapeSize, shapeSize);
    rotate(60);
  }

  // Update the color with a smooth transition for text
  textColor = lerpColor(color(255, 0, 0), color(0, 0, 255), sin(frameCount * 0.02));

  fill(textColor);

  // Dynamic font size based on mouseY
  let dynamicFontSize = fontSize + sin(frameCount * 0.05) * 10;
  textSize(dynamicFontSize);

  // Move the words in a slightly animated way
  let xOffset = 10 * sin(frameCount * 0.05);
  let yOffset = 10 * cos(frameCount * 0.05);

  // Display the current word at the center of the canvas with animation
  text(words[currentWordIndex], xOffset, yOffset);

  // Change the word every 90 frames
  if (frameCount % 90 === 0) {
    currentWordIndex = (currentWordIndex + 1) % words.length;
  }
}

function mousePressed() {
  // Change the background color instantly when the mouse is clicked
  bgColor = color(random(255), random(255), random(255));
}