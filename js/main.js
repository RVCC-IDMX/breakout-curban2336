/* eslint-disable linebreak-style */
// main.js - Entry point for the Breakout game

import { Game } from './game.js';

// Initialize the game when the window loads
window.addEventListener('load', () => {
  new Game('gameCanvas');
});