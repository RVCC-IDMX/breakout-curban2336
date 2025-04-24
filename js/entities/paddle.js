/* eslint-disable linebreak-style */
// paddle.js - Paddle entity
// This file contains the Paddle class that represents the player-controlled paddle

import { DEFAULTS } from '../constants.js';

export class Paddle {
  constructor(game) {
    // TODO: Initialize the paddle properties
    // - Set the game reference
    // - Set width and height using DEFAULTS.PADDLE_WIDTH and DEFAULTS.PADDLE_HEIGHT
    // - Set initial x position to center the paddle horizontally
    // - Set y position near the bottom of the canvas
    // - Set the paddle speed using DEFAULTS.PADDLE_SPEED
    // - Initialize the direction of movement (dx) to 0

    this.game = game;
    this.width = DEFAULTS.PADDLE_WIDTH;
    this.height = DEFAULTS.PADDLE_HEIGHT;
    this.x = (game.width - this.width) / 2;
    this.y = game.height - this.height - 10;
    this.speed = DEFAULTS.PADDLE_SPEED;
    this.dx = 0; // Direction of movement
    this.totalWidth = game.width;
  }

  update() {
    // TODO: Update the paddle position based on its current direction
    // - Add dx to the x position
    // - Make sure the paddle stays within the game boundaries (doesn't go off-screen)

    this.x += this.dx;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }


  }

  draw(ctx) {
    // TODO: Draw the paddle on the canvas
    // - Set the fillStyle to '#0095DD' (or another color of your choice)
    // - Use fillRect to draw the paddle at (x, y) with the correct width and height
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    // TODO: Set the paddle's direction to move left
    // - Set dx to negative paddle speed
    this.dx = -1 * this.speed;
  }

  moveRight() {
    // TODO: Set the paddle's direction to move right
    // - Set dx to positive paddle speed
    this.dx = this.speed;
  }

  stop() {
    // TODO: Stop the paddle's movement
    // - Set dx to 0
    this.dx = 0;
  }

  setPosition(x) {
    // TODO: Set the paddle's position based on mouse/touch input
    // - Set the paddle's x position, centering it on the input x
    // - Make sure the paddle stays within the game boundaries
    this.x = x;
    if (this.x > this.totalWidth) {
      this.x = this.totalWidth - this.x;
    }
  }
}