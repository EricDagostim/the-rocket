import createKeyboardListener from "./keyboard-listener.js";
import createGame from "./game.js";
import renderScreen from "./render-screen.js";


const game = createGame();
const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(game.movePlayer);

const screen = document.getElementById('gameArea');
renderScreen(screen, game, requestAnimationFrame);

const socket = io();

socket.on('connect', () => {
    const playerId = socket.id;
    const player = game.addPlayer({ playerId });
    console.log(game.state);
    socket.emit('add-player', player);
});

socket.on('setup', (state) => {
    const playerId = socket.id;
    game.setState(state);

    keyboardListener.registerPlayerId(playerId);
    keyboardListener.subscribe((command) => {
        socket.emit('move-player', command);
    });
    
    renderScreen(screen, game, requestAnimationFrame, playerId);
    
});

socket.on('add-player', (command) => {
    game.addPlayer(command);
});

socket.on('remove-player', (command) => {
    game.removePlayer(command);
});

socket.on('move-player', (command) => {
    const playerId = socket.id;

    if (playerId !== command.playerId) {
        game.movePlayer(command);
    }
});

socket.on('add-fruit', (command) => {
    game.addFruit(command);
});

socket.on('remove-fruit', (command) => {
    game.removeFruit(command);
});

