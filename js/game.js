/* eslint-disable max-len */
/* eslint-disable linebreak-style */
// game.js - Main game controller
// Student Task: Implement the Game class for managing game state and main loop

import { Paddle } from './entities/paddle.js';
import { Ball } from './entities/ball.js';
import { Brick } from './entities/brick.js';
import { InputHandler } from './input-handler.js';
import { CollisionManager } from './collision.js';
import { UI } from './ui.js';
import { GAME_STATES, DEFAULTS, BRICK_CONFIG } from './constants.js';

export class Game {
  constructor(canvasId) {
    // Canvas setup
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // TODO: Initialize game state
    this.gameState = GAME_STATES.START;
    this.score = 0;
    this.lives = DEFAULTS.LIVES;
    this.debugMessage = '';

    // TODO: Initialize empty arrays/objects for game entities
    this.paddle = null;
    this.ball = null;
    this.bricks = [];

    // Game systems are provided for you
    this.ui = new UI(this);
    this.collisionManager = new CollisionManager(this);
    this.input = new InputHandler(this);

    // TODO: Call the init() method to set up the game
    this.init();

    // Set up canvas scale (provided for you)
    this.canvasScale = {
      x: this.canvas.width / this.canvas.offsetWidth,
      y: this.canvas.height / this.canvas.offsetHeight
    };

    // Add window resize listener (provided for you)
    window.addEventListener('resize', () => {
      this.updateCanvasScale();
    });
  }

  // Initialize the game
  init() {
    // TODO: Initialize the game
    this.createEntities();
    this.setupBricks();
    this.ui.showScreen(GAME_STATES.START);
  }

  // Create game entities
  createEntities() {
    // TODO: Create the paddle and ball
    // - Create a new Paddle instance and assign it to this.paddle
    this.paddle = new Paddle(this);
    // - Create a new Ball instance and assign it to this.ball
    this.ball = new Ball(this);
  }

  // Update canvas scale calculation (provided for you)
  updateCanvasScale() {
    this.canvasScale = {
      x: this.canvas.width / this.canvas.offsetWidth,
      y: this.canvas.height / this.canvas.offsetHeight
    };
  }

  // Set up brick layout
  setupBricks() {
    // TODO: Create the brick layout
    // 1. Clear the bricks array
    // 2. Use nested loops to create a grid of bricks
    //    - Outer loop for rows (BRICK_CONFIG.ROWS)
    //    - Inner loop for columns (BRICK_CONFIG.COLUMNS)
    // 3. For each brick:
    //    - Calculate its position (x, y) using BRICK_CONFIG
    //    - Assign a color based on the row (use BRICK_CONFIG.COLORS)
    //    - Create a new Brick instance and add it to the bricks array

    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    const brickWidth = canvasWidth / BRICK_CONFIG.ROWS;
    const brickHeight = canvasHeight / BRICK_CONFIG.COLUMNS;

    this.bricks = [];

    for (let row = 0; row < BRICK_CONFIG.ROWS; ++row) {
      for (let col = 0; col < BRICK_CONFIG.ROWS; ++col) {
        this.bricks.push(new Brick(this, col * brickWidth, row * brickHeight, BRICK_CONFIG.WIDTH, BRICK_CONFIG.HEIGHT, BRICK_CONFIG.COLORS[row]));
      }
    }
  }

  // Start the game
  startGame() {
    // TODO: Start the game
    // 1. Set gameState to PLAYING
    // 2. Use ui.showScreen(GAME_STATES.PLAYING) to show the playing screen
    // 3. Connect the input handler to the paddle (this.input.setPaddle(this.paddle))
    // 4. Start the game loop (call gameLoop())

    this.gameState = GAME_STATES.PLAYING;
    this.ui.showScreen(GAME_STATES.PLAYING);
    this.input.setPaddle(this.paddle);

    // Start the game loop
    this.gameLoop();
  }

  // Restart the game
  restartGame() {
    // TODO: Restart the game
    // 1. Reset game state (gameState, score, lives)
    // 2. Create new entities (call createEntities())
    // 3. Set up new bricks (call setupBricks())
    // 4. Update the input handler with the new paddle
    // 5. Update the UI stats
    // 6. Show the playing screen
    // 7. Start the game loop

    this.score = 0;
    this.lives = DEFAULTS.LIVES;
    this.createEntities();
    this.setupBricks();
    this.score = 0;
    this.lives = DEFAULTS.LIVES;
    this.ui.updateStats();
    this.startGame();
  }

  // Main game loop
  gameLoop() {
    // TODO: Implement the main game loop
    // 1. Check if the game is still in PLAYING state, return if not
    // 2. Clear the canvas (ctx.clearRect)
    // 3. Update game entities (paddle and ball)
    // 4. Check for collisions (collisionManager.checkCollisions())
    // 5. Draw all game entities (paddle, ball, and all non-broken bricks)
    // 6. Check for win condition (all bricks broken)
    // 7. Render debug message if there is one
    // 8. Request the next animation frame to continue the loop

    if (this.gameState !== GAME_STATES.PLAYING) {
      return;
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update entities
    this.paddle.update();
    this.ball.update();

    // Check for collisions
    this.collisionManager.checkCollisions();

    // Draw all game entities
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);

    // Draw bricks and check for win
    let remainingBricks = 0;
    this.bricks.forEach(brick => {
      if (!brick.broken) {
        remainingBricks++;
        brick.draw(this.ctx);
      }
    });

    // Win condition
    if (remainingBricks === 0) {
      this.win();
      return;
    }

    // Debug message
    this.ui.renderDebug(this.ctx, this.debugMessage);

    // Continue game loop
    requestAnimationFrame(() => this.gameLoop());
  }

  // Handle ball out of bounds
  ballLost() {
    // TODO: Handle the ball going below the bottom edge
    // 1. Decrease lives
    // 2. Update the UI stats
    // 3. Check if the player is out of lives (call gameOver() if so)
    // 4. If the player still has lives, reset the ball position
    --this.lives;
    this.ui.updateStats();

    if (this.lives <= 0) {
      this.gameOver();
    } else {
      this.ball.reset();
    }
  }

  // Handle game over
  gameOver() {
    // TODO: Handle game over
    // 1. Set gameState to GAMEOVER
    // 2. Show the game over screen
    this.gameState = GAME_STATES.GAMEOVER;
    this.ui.showScreen(GAME_STATES.GAMEOVER);
  }

  // Handle win
  win() {
    // TODO: Handle win condition
    // 1. Set gameState to WIN
    // 2. Show the win screen
    this.gameState = GAME_STATES.WIN;
    this.ui.showScreen(GAME_STATES.WIN);
  }

  // Add to score
  addScore(points) {
    // TODO: Add points to the score
    // 1. Increase the score by the given points
    // 2. Update the UI stats
    this.score += points;
    this.ui.updateStats();
  }

  // Debug message helper (provided for you)
  debug(message) {
    this.debugMessage = message;
  }
}