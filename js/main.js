import { Game } from "./Game.js";

// Initialize the game
const canvas = document.getElementById("game");
const game = new Game(canvas);

// Start the game loop
game.start();