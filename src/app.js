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
const kim1 = new PIXI.Sprite.from('/src/resources/kim_1.svg');
kim1.height = 100;
kim1.width = 100;
kim1.y = 525;
kim1.x = 450;

// Trash
// const trash1 = new PIXI.Sprite.from('/src/resources/trash_1.svg');
// trash1.height = 40;
// trash1.width = 30;
// const trash2 = new PIXI.Sprite.from('/src/resources/trash_2.svg');
// trash2.height = 40;
// trash2.width = 30;
// const trash3 = new PIXI.Sprite.from('/src/resources/trash_3.svg');
// trash3.height = 40;
// trash3.width = 30;
//const trash4 = new PIXI.Sprite.from('/src/resources/trash_4.svg');
// trash4.height = 40;
// trash4.width = 30;

stage.addChild(text);
stage.addChild(kim1);
//stage.addChild(trash1);

// Tweak this function later!
// function update() {
//   trash1.position.y -= 40;

//   if (kim1.score > 8) {
//     trash1.position.y -= 6;
//   } else if (kim1.score > 25) {
//     trash1.position.y -= 7;
//   } else if (kim1.score > 40) {
//     trash1.position.y -= 8;
//   }
//   requestAnimationFrame(update);
// }

let playerScore;

function score() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fontSize: 36,
    fill: ['#ff8642'],
  });

  kim1.score = -1;

  playerScore = new PIXI.Text(kim1.score, style);

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

// function checkIfCollide() {
//   if (
//     trash1.position.x > kim1.position.x - boxWidth / 2 &&
//     trash1.position.x < kim1.position.x + boxWidth / 2 &&
//     trash1.position.y === kim1.position.y
//   ) {
//     goalBoxSpawn();
//     kim1.score++;
//     playerScore.text = kim1.score;
//   } else if (trash1.position.x === 0) {
//     //gameOverScreen.visible = true;
//     //stage.visible = false;
//     //startPage.visible = false;
//   }
// }


// Function to move Kim horizontally
document.addEventListener('keydown', onKeyDown);
function onKeyDown(key) {
  if (key.keyCode === 37) {
    if (kim1.position.x != 0) {
      kim1.position.x -= boxWidth;
    }
  }

  if (key.keyCode === 39) {
    if (kim1.position.x != app.screen.width - (boxWidth + 50)) {
      kim1.position.x += boxWidth;
    }
  }
}

// Interval to spawn new trash items
let trashItems = [];
function generateTrashItems() {
  setInterval(() => {
    const newTrashItem = createTrashItem();
    trashItems.push(newTrashItem);
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
