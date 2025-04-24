/* eslint-disable linebreak-style */
// collision.js - Handles collision detection and response
// This file manages all collision-related logic in the game

import { DEFAULTS } from './constants.js';

export class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  // Check for all collisions in the game
  checkCollisions() {
    if (!this.game.ball || !this.game.paddle) {
      return;
    }

    // TODO: Call the methods to check different types of collisions
    this.checkPaddleCollision();
    this.checkBrickCollisions();
  }

  // Check if ball collides with paddle
  async checkPaddleCollision() {
    // TODO: Implement paddle collision detection and response
    // 1. Get references to the ball and paddle from the game object
    // 2. Check if the ball overlaps with the paddle:
    //    - Ball's bottom edge is below paddle's top edge
    //    - Ball's bottom edge is above paddle's bottom edge
    //    - Ball's horizontal position is between paddle's left and right edges
    // 3. If a collision is detected:
    //    - Reverse the ball's vertical direction (set dy to negative)
    //    - Adjust the horizontal direction based on where the ball hit the paddle
    //      (This creates different bounce angles depending on where the ball hits)
    const ball = this.game.ball;
    const paddle = this.game.paddle;

    if (
      ball.y + ball.size > paddle.y &&
      ball.y + ball.size < paddle.y + paddle.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      // Reverse the vertical direction
      ball.dy = -ball.dy;

      // Calculate impact factor based on where the ball hit the paddle
      // -1 for left edge, 0 for center, 1 for right edge
      const impactFactor = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

      // Apply angle variation (maximum angle of about 60 degrees)
      ball.dx = ball.speed * impactFactor * 1.5;

      // Ensure minimum horizontal movement
      if (Math.abs(ball.dx) < 0.5) {
        ball.dx = ball.dx > 0 ? 0.5 : -0.5;
      }

      // Ensure the ball's overall speed remains consistent
      const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = ball.dx / currentSpeed * ball.speed;
      ball.dy = ball.dy / currentSpeed * ball.speed;

      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // Check if ball collides with any bricks
  checkBrickCollisions() {
    // TODO: Implement brick collision detection and response
    // 1. Get reference to the ball from the game object
    // 2. Loop through all bricks in the game
    // 3. For each brick that isn't broken:
    //    - Check if the ball collides with it using ball.collidesWith(brick)
    //    - If collision detected:
    //      a. Call brick.break() to break the brick
    //      b. Add points to the score using game.addScore(DEFAULTS.POINTS_PER_BRICK)
    //      c. Call calculateBounceDirection() to determine how the ball should bounce

    const ball = this.game.ball;

    for (const brick of this.game.bricks) {
      if (!brick.broken && ball.collidesWith(brick)) {
        // Break the brick and award points
        brick.break();
        this.game.addScore(DEFAULTS.POINTS_PER_BRICK);

        // Calculate bounce direction
        this.calculateBounceDirection(ball, brick);

        // Only handle one brick collision per frame
        // (prevents multiple collisions in a single frame)
        break;
      }
    }
  }

  // Calculate how the ball should bounce after hitting a brick
  calculateBounceDirection(ball, brick) {
    // TODO: Determine how the ball should bounce off a brick
    // 1. Calculate the distances from the ball's center to each edge of the brick
    // 2. Find the shortest distance to determine which side was hit
    // 3. If the ball hit the left or right side of the brick, reverse ball.dx
    // 4. If the ball hit the top or bottom of the brick, reverse ball.dy

    // Calculate distances to each edge of the brick
    const distBottom = Math.abs((brick.y + brick.height) - (ball.y - ball.size));
    const distTop = Math.abs((brick.y) - (ball.y + ball.size));
    const distRight = Math.abs((brick.x + brick.width) - (ball.x - ball.size));
    const distLeft = Math.abs((brick.x) - (ball.x + ball.size));

    // Find the smallest distance to determine which side was hit
    const minDist = Math.min(distBottom, distTop, distRight, distLeft);

    // Reverse the appropriate velocity component
    if (minDist === distBottom || minDist === distTop) {
      // Hit top or bottom - reverse vertical direction
      ball.dy = -ball.dy;
    } else {
      // Hit left or right - reverse horizontal direction
      ball.dx = -ball.dx;
    }
  }
}