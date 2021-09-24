//fruta,agrandar serpiente ,importante serpiente movimiento cuando crece

const styles = {
    board_background : 'white',
    board_border : 'black',
    snake_col : 'lightblue',
    snake_border : 'darkgrey'
}
let snake = [{
x: 200,y :200}]
let counter = 0;

let changingDirection = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;
const counter_div = document.getElementById('counter');
const board = document.getElementById('snakeboard');
const ctx = board.getContext('2d');
start()
gen_food();
document.addEventListener("keydown",snake_direction);

function start() {
    if (has_game_ended()){alert('YOU LOSE');document.reload()};
    changingDirection = false;
    setTimeout(function onTick() {
        drawBoard();
        drawFood();
        snake_move();
        drawSnake();
        start();
    }, 100)
}

function drawSnakeParts(part) {
    ctx.fillStyle = styles.snake_col;
    ctx.strokestyle = styles.snake_border;
    ctx.fillRect(part.x, part.y, 10, 10);
    ctx.strokeRect(part.x, part.y, 10, 10)
}

function drawSnake() {
    snake.forEach(drawSnakeParts);
}

function drawBoard() {
    ctx.fillStyle = styles.board_background;
    ctx.strokestyle = styles.board_border;
    ctx.fillRect(0, 0, board.width, board.height);
    ctx.strokeRect(0, 0, board.width, board.height);
}

function snake_move() {
    const snake_head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(snake_head)
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
    gen_food();
    counter++;
    counter_div.innerHTML = counter;
    snake.push({x: 200, y: snake[snake.length-1].y-10});

    }
    snake.pop();
}
function has_game_ended() {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > board.width -10;
    const hitUpWall = snake[0].y <0;
    const hitDownWall = snake[0].y > board.width -10;
    return hitLeftWall || hitRightWall || hitUpWall || hitDownWall;
}
function drawFood() {
  ctx.fillStyle = 'lightgreen';
  ctx.strokestyle = 'darkgreen';
  ctx.fillRect(food_x, food_y,10,10);
  ctx.strokeRect(food_x, food_y,10,10);
}
function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
function gen_food() {
  food_x = random_food(0,snakeboard.width -10);
  food_y = random_food(0,snakeboard.height -10);
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}
function snake_direction(event) {
    const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
    // Prevent the snake from reversing
    
      if (changingDirection) return;
      changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }