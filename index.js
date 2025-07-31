const Race = require('./race');
const Player = require('./player');

console.log("Iniciando o Simulador de Corrida...");

const players = [
    new Player("Mario", false),
    new Player("Luigi", true),
    new Player("Peach", true),
    new Player("Bowser", true)
];

players.find(p => p.name === 'Peach').speed = 2.1;
players.find(p => p.name === 'Bowser').speed = 1.9;

const race = new Race(players, 120);
race.start();

console.log("A corrida começou! Controle o Mario.");