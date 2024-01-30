import createKeyboardListener from "./keyboard-listener.js";
import createGame from "./game.js";
import renderScreen from "./render-screen.js";

const game = createGame();
const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(game.movePlayer);

const screen = document.getElementById('gameArea');
renderScreen(screen, game, requestAnimationFrame);

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0});
game.addPlayer({playerId: 'player2', playerX: 5, playerY: 5});
game.addFruit({fruitId: 'fruit1', fruitX: 8, fruitY: 8});
game.addFruit({fruitId: 'fruit2', fruitX: 2, fruitY: 2});