// The Canvas to be rendered on the page
const app = new PIXI.Application({
  width: 1000,
  height: 700,
  backgroundColor: 0xfffcf2,
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Add a start page
const startScreen = new PIXI.Container();
app.stage.addChild(startScreen);

// Add start image to start page
const startImage = new PIXI.Sprite.from('/src/resources/neutral.svg');
startScreen.addChild(startImage);
startImage.width = app.screen.width;
startImage.height = app.screen.height;
startImage.buttonMode = true;
startImage.interactive = true;
startImage.on('click', startClick);

// Add info box to start page (explaining the rules and how the game works)
const infoBox = new PIXI.Graphics();
infoBox.beginFill(0xfffcf2);
infoBox.drawRect(0, 0, 600, 400);
infoBox.position.set(200, 150);
startScreen.addChild(infoBox);

// Format text styles
const headerStyle = new PIXI.TextStyle({
  fontFamily: 'Futura',
  fontSize: 36,
  fill: ['#ff8642'],
});

const textStyle = new PIXI.TextStyle({
  fontFamily: 'Futura',
  fontSize: 24,
  fill: ['#ff8642'],
  wordWrap: true,
  wordWrapWidth: 500,
});

// Add text and images to info box
const infoHeader = new PIXI.Text('Rädda miljön med Kim', headerStyle);
infoHeader.x = 50;
const infoText = new PIXI.Text(
  'Hjälp Nallebjörnen Kim att samla skräp och ta hand om naturen. Se upp så att skräpet inte träffar marken! Du flyttar Kim med piltangenterna åt höger och vänster. Klicka för att börja spelet. ',
  textStyle
);
infoText.x = 50;
infoText.y = 80;
infoBox.addChild(infoHeader);
infoBox.addChild(infoText);
const kim1 = new PIXI.Sprite.from('/src/resources/kim_1.svg');
kim1.height = 100;
kim1.width = 100;
kim1.y = 275;
kim1.x = 25;
infoBox.addChild(kim1);
const kim2 = new PIXI.Sprite.from('/src/resources/kim_2.svg');
kim2.height = 100;
kim2.width = 100;
kim2.y = 275;
kim2.x = 175;
infoBox.addChild(kim2);
const kim3 = new PIXI.Sprite.from('/src/resources/kim_3.svg');
kim3.height = 100;
kim3.width = 100;
kim3.y = 275;
kim3.x = 325;
infoBox.addChild(kim3);
const kim4 = new PIXI.Sprite.from('/src/resources/kim_4.svg');
kim4.height = 100;
kim4.width = 100;
kim4.y = 275;
kim4.x = 475;
infoBox.addChild(kim4);

let isGameOver = false;

// Function that takes the user to the next view
function startClick() {
  startScreen.visible = false;
  stage.visible = true;
  if (isGameOver == false) {
    generateTrashItems();
    score();
  }
  isGameOver == false;
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

// Kim
const kim = new PIXI.Sprite.from('/src/resources/kim_1.svg');
kim.height = 100;
kim.width = 100;
kim.y = 525;
kim.x = 450;

stage.addChild(kim);

// Create playerscore
let playerScore;
// Function to add score to the stage
function score() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fontSize: 36,
    fill: ['#ff8642'],
  });

  kim.score = 0;

  playerScore = new PIXI.Text(kim.score, style);

  stage.addChild(playerScore);

  playerScore.y = 630;
  playerScore.x = 50;
}

// Game over screen
const gameOverScreen = new PIXI.Container();
gameOverScreen.visible = false;
app.stage.addChild(gameOverScreen);
gameOverScreen.buttonMode = true;
gameOverScreen.interactive = true;
gameOverScreen.on('click', playAgain);

// Function to move Kim horizontally
document.addEventListener('keydown', onKeyDown);
function onKeyDown(key) {
  if (key.keyCode === 37) {
    if (kim.position.x != 0) {
      kim.position.x -= 10;
    }
  }

  if (key.keyCode === 39) {
    if (kim.position.x != app.screen.width - kim.width) {
      kim.position.x += 10;
    }
  }
}

// Interval to spawn new trash items
let generate = null;
function generateTrashItems() {
  generate = setInterval(() => {
    const newTrashItem = createTrashItem();
    fallDown(newTrashItem);
  }, 1000);
  if (isGameOver == true) {
    clearInterval(generate);
  }
}

// Spawn trash items in random positions
let trashItem;
function createTrashItem() {
  const randomNumber = Math.floor(Math.random() * 4 + 1);
  trashItem = new PIXI.Sprite.from(
    '/src/resources/trash_' + randomNumber + '.svg'
  );
  trashItem.width = 30;
  trashItem.height = 40;
  let randomX = Math.floor(Math.random() * 1000);
  if (randomX > 0 && randomX <= 30) {
    randomX = randomX;
  } else {
    randomX = randomX - 30;
  }
  trashItem.position.x = randomX;
  trashItem.position.y = 0;
  stage.addChild(trashItem);
  return trashItem;
}

// Function to make trash items move vertically
let fall = null;
function fallDown(trashItem) {
  fall = setInterval(() => {
    checkIfCollide(trashItem);
    trashItem.position.y += 10;
  }, 125);
  if (isGameOver == true) {
    clearInterval(fall);
  }
}

let trashOnGround = 0;

// Function to check trash items collide with Kim or the ground
function checkIfCollide(trashItem) {
  // If trash item is caught by Kim
  if (
    trashItem.position.x >= kim.position.x - trashItem.width &&
    trashItem.position.x <= kim.position.x + kim.width &&
    trashItem.position.y >= kim.position.y - trashItem.height &&
    trashItem.position.y <= kim.position.y + kim.height
  ) {
    trashItem.position.y = -100;
    trashItem.position.x = -100;
    stage.removeChild(trashItem);
    kim.score++;
    playerScore.text = kim.score;
  }
  // If trash item hits the ground
  else if (trashItem.position.y == 600) {
    trashItem.position.y = -100;
    trashItem.position.x = -100;
    stage.removeChild(trashItem);
    trashOnGround++;
    if (trashOnGround >= 10) {
      isGameOver = true;
      let result;
      if (kim.score - trashOnGround > 9) {
        result = 'neutral';
      } else if (kim.score - trashOnGround < 10) {
        result = 'bad';
      } else if (kim.score - trashOnGround > 19) {
        result = 'good';
      }
      gameOver(result);
    }
    console.log(trashOnGround);
  }
}

function gameOver(result) {
  gameOverScreen.visible = true;
  stage.visible = false;
  startScreen.visible = false;
  let gameOverBackground;
  let resultText;
  if (result == 'good') {
    gameOverBackground = new PIXI.Sprite.from('/src/resources/good.svg');
    resultText =
      'Wow, se så grönt och fint det blev! Idag har du varit med och räddat miljön!';
  } else if (result == 'bad') {
    gameOverBackground = new PIXI.Sprite.from('/src/resources/bad.svg');
    resultText =
      'Hoppsan! Du hann inte plocka tillräckligt mycket skräp och naturen mår inte så bra.';
  } else {
    gameOverBackground = new PIXI.Sprite.from('/src/resources/neutral.svg');
    resultText = 'Bra jobbat! Men du kan nog samla in ännu mer skräp.';
  }
  gameOverScreen.addChild(gameOverBackground);
  gameOverBackground.width = app.screen.width;
  gameOverBackground.height = app.screen.height;
  const gameOverBox = new PIXI.Graphics();
  gameOverBox.beginFill(0xfffcf2);
  gameOverBox.drawRect(0, 0, 600, 225);
  gameOverBox.position.set(200, 300);
  gameOverScreen.addChild(gameOverBox);
  const gameOverHeader = new PIXI.Text('GAME OVER', headerStyle);
  gameOverHeader.x = 50;
  const gameOverText = new PIXI.Text(resultText, textStyle);
  gameOverText.x = 50;
  gameOverText.y = 80;
  const playAgainText = new PIXI.Text('Klicka för att spela igen!', textStyle);
  playAgainText.x = 50;
  playAgainText.y = 175;
  gameOverBox.addChild(gameOverHeader);
  gameOverBox.addChild(gameOverText);
  gameOverBox.addChild(playAgainText);
}

function playAgain() {
  location.reload();
}
