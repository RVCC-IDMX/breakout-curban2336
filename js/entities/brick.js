/* eslint-disable linebreak-style */
// brick.js - Brick entity
// This file contains the Brick class that represents the breakable bricks

export class Brick {
  constructor(game, x, y, width, height, color) {
    // TODO: Initialize the brick properties
    // - Set the game reference
    // - Set the x and y position
    // - Set the width and height
    // - Set the color
    // - Initialize the broken state to false

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.broken = false;
  }

  draw(ctx) {
    // TODO: Draw the brick on the canvas if it's not broken
    // - Check if the brick is broken, if so, don't draw anything
    // - Set the fillStyle to the brick's color
    // - Use fillRect to draw the brick
    // - Add a border by using strokeStyle and strokeRect

    if (!this.broken) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // Add a border around the brick
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  break() {
    // TODO: Mark the brick as broken
    // - Set the broken property to true
    this.broken = true;
  }
}