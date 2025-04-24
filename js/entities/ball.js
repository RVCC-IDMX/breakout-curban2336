/* eslint-disable linebreak-style */
// ball.js - Ball entity
// This file contains the Ball class that represents the bouncing ball

import { DEFAULTS } from '../constants.js';

export class Ball {
  constructor(game) {
    // TODO: Initialize the ball properties
    // - Set the game reference
    // - Set the size (radius) using DEFAULTS.BALL_SIZE
    // - Set initial position to the center horizontally and just above the paddle
    // - Set the ball speed using DEFAULTS.BALL_SPEED
    // - Set initial direction: dx to a positive value and dy to a negative value
    //   (This will make the ball move up and to the right initially)

    this.game = game;
    this.size = DEFAULTS.BALL_SIZE;
    this.x = game.width / 2;
    this.originX = game.width / 2;
    this.y = game.height - 40;
    this.originY = game.height - 40;
    this.speed = DEFAULTS.BALL_SPEED;
    this.dx = this.speed;
    this.dy = -this.speed;
  }

  update() {
    // TODO: Update the ball position and handle wall collisions
    // 1. Update position based on direction (add dx to x, add dy to y)
    // 2. Handle wall collisions:
    //    - If ball hits left or right wall, reverse dx
    //    - If ball hits top wall, reverse dy
    //    - If ball goes below bottom edge, call game.ballLost()

    this.x += this.dx;
    this.y += this.dy;

    // Wall collision detection
    if (this.x + this.size > this.game.width ||
      this.x - this.size < 0) {
      this.dx = -this.dx;
    }

    if (this.y - this.size < 0) {
      this.dy = -this.dy;
    } else if (this.y + this.size > this.game.height) {
      this.game.ballLost();
    }
  }

  draw(ctx) {
    // TODO: Draw the ball on the canvas
    // - Use beginPath(), arc(), fillStyle, and fill() to draw a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  collidesWith(object) {
    // TODO: Check if the ball collides with a rectangular object (brick or paddle)
    // - Return true if the ball's bounding box overlaps with the object's rectangle
    // - Remember to account for the ball's radius in the calculation

    // Find the closest point on the rectangle to the ball's center
    const closestX = Math.max(object.x, Math.min(this.x, object.x + object.width));
    const closestY = Math.max(object.y, Math.min(this.y, object.y + object.height));

    // Calculate the distance from the closest point to the ball's center
    const distanceX = this.x - closestX;
    const distanceY = this.y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    // If the distance is less than the ball's radius, they collide
    return distanceSquared <= (this.size * this.size);
  }

  reset() {
    // TODO: Reset the ball position after losing a life
    // - Set position back to initial values
    // - Reset direction to initial values
    this.x = this.originX;
    this.y = this.originY;
    this.speed = DEFAULTS.BALL_SPEED;
    this.dx = this.speed;
    this.dy = -this.speed;
  }
}