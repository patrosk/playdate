// The Canvas to be rendered on the page
const app = new PIXI.Application({
  width: 1000,
  height: 700,
  backgroundColor: 0xFFFCF2,
  });

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Add a start page
const startPage = new PIXI.Container();
app.stage.addChild(startPage);

// Add start image to start page (explaining the rules and how the game works)
const startImage = new PIXI.Sprite.from('/src/resources/kim.svg');
startPage.addChild(startImage);
startImage.width = app.screen.width;
startImage.height = app.screen.height;
startImage.buttonMode = true;
startImage.interactive = true;
startImage.on('click', startClick);

// Function that takes the user to the next view
function startClick() {
  startPage.visible = false;
  stage.visible = true;
  //requestAnimationFrame(update);
  generateTrashItems();
}

// Add a stage
const stage = new PIXI.Container();
stage.visible = false;
app.stage.addChild(stage);

// Add a background to the stage
const stageBackground = new PIXI.Sprite.from('/src/resources/gamebg.svg');
stage.addChild(stageBackground);
stageBackground.width = app.screen.width;
stageBackground.height = app.screen.height;

// Create a 'grid' of boxes for the objects to move in
let boxHeight = app.screen.height / 20;
let boxWidth = app.screen.width / 20;

// Text styling
const textStyle = new PIXI.TextStyle({
  fontFamily: 'Futura',
  fontSize: 32,
  fill: ['#ff8642'],
});
const text = new PIXI.Text('', textStyle);

// Kim
const kim = new PIXI.Sprite.from('/src/resources/kim_1.svg');
kim.height = 100;
kim.width = 100;
kim.y = 525;
kim.x = 450;

stage.addChild(text);
stage.addChild(kim);

let playerScore;

function score() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fontSize: 36,
    fill: ['#ff8642'],
  });

  kim.score = -1;

  playerScore = new PIXI.Text(kim.score, style);

  stage.addChild(playerScore);

  playerScore.y = 630;
  playerScore.x = 50;
}

score();

// const gameOverScreen = new PIXI.Container();
// gameOverScreen.visible = false;
// app.stage.addChild(gameOverScreen);

function animate() {
  app.render(stage);

 // checkIfCollide();
  requestAnimationFrame(animate);
}

animate();

// Function to move Kim horizontally
document.addEventListener('keydown', onKeyDown);
function onKeyDown(key) {
  if (key.keyCode === 37) {
    if (kim.position.x != 0) {
      kim.position.x -= boxWidth;
    }
  }

  if (key.keyCode === 39) {
    if (kim.position.x != app.screen.width - (boxWidth + 50)) {
      kim.position.x += boxWidth;
    }
  }
}


// Tweak this function later!
// function update() {
//   trash1.position.y -= 40;

//   if (kim.score > 8) {
//     trash1.position.y -= 6;
//   } else if (kim.score > 25) {
//     trash1.position.y -= 7;
//   } else if (kim.score > 40) {
//     trash1.position.y -= 8;
//   }
//   requestAnimationFrame(update);
// }

// Interval to spawn new trash items
let trashItems = [];
function generateTrashItems() {
  setInterval(() => {
    const newTrashItem = createTrashItem();
    trashItems.push(newTrashItem);
    fallDown(newTrashItem);
  }, 1000);
}

// Spawn trash items in random positions
let trashItem;
function createTrashItem() {
  const randomNumber = Math.floor(Math.random() * 4 + 1);
  trashItem = new PIXI.Sprite.from('/src/resources/trash_' + randomNumber + '.svg');
  trashItem.width = 30;
  trashItem.height = 40;
  trashItem.position.x = Math.floor(Math.random() * 1000 - 30);
  trashItem.position.y = 0;

  stage.addChild(trashItem);
  return trashItem;
}

// Function to make trash items move vertically
function fallDown(trashItem) {
  setInterval(() => {
    trashItem.position.y += 10;
    checkIfCollide(trashItem);
  }, 125);
}

// Function to check if Kim and trash items collide
 function checkIfCollide(trashItem) {
  console.log(trashItem.position.y);
  if (
    // trashItem.position.x > kim.position.x - boxWidth / 2 &&
    // trashItem.position.x < kim.position.x + boxWidth / 2 &&
    trashItem.position.y >= 585
  ) {
    kim.score++;
    playerScore.text = kim.score;
  }
    //gameOverScreen.visible = true;
    //stage.visible = false;
    //startPage.visible = false;

}
