const readline = require('readline');
const Player = require('./player');
const { getRandomItem } = require('./items');

class Race {
    constructor(players, trackLength = 100) {
        this.players = players;
        this.trackLength = trackLength;
        this.gameInterval = null;
        this.itemBoxes = [20, 50, 80];
        this.traps = [];
        this.isRaceOver = false;
    }

    start() {
        this.setupInput();
        this.gameInterval = setInterval(() => {
            if (this.isRaceOver) {
                clearInterval(this.gameInterval);
                return;
            }
            this.update();
            this.display();
        }, 1500);
    }

    setupInput() {
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        const player = this.players.find(p => !p.isAI);
        
        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit();
            }
            if (key.name === 'u') {
                player.useItem(this);
            }
        });
    }

    update() {
        for (const player of this.players) {
            if (player.isAI && player.item && Math.random() < 0.5) {
                player.useItem(this);
            }

            player.updateStatus();
            player.move();

            for (const boxPosition of this.itemBoxes) {
                if (player.position - player.speed < boxPosition && player.position >= boxPosition) {
                    player.collectItem(getRandomItem());
                }
            }
            
            const trapIndex = this.traps.findIndex(trap => Math.floor(player.position) === trap.position);
            if (trapIndex !== -1) {
                console.log(`\n${player.name} escorregou em uma casca de banana!`);
                player.applyEffect('spin_out', 2);
                this.traps.splice(trapIndex, 1);
            }

            if (player.position >= this.trackLength && !this.isRaceOver) {
                this.endRace(player);
            }
        }
    }

    display() {
        console.clear();
        console.log('--- CORRIDA DE KART NO TERMINAL ---');
        console.log(`Pista: ${this.trackLength}m. Pressione "u" para usar item, "Ctrl+C" para sair.\n`);
        
        const rankedPlayers = [...this.players].sort((a, b) => b.position - a.position);

        for (const player of rankedPlayers) {
            const trackVizWidth = 50;
            const playerPosOnViz = Math.floor((player.position / this.trackLength) * trackVizWidth);
            
            let track = Array(trackVizWidth).fill('─');
            this.itemBoxes.forEach(pos => {
                const boxVizPos = Math.floor((pos / this.trackLength) * trackVizWidth);
                track[boxVizPos] = '?';
            });
            this.traps.forEach(trap => {
                const trapVizPos = Math.floor((trap.position / this.trackLength) * trackVizWidth);
                track[trapVizPos] = '🍌';
            });

            if(playerPosOnViz < trackVizWidth) {
                track[playerPosOnViz] = player.name.charAt(0);
            }

            const status = player.statusEffects.map(e => e.type.toUpperCase()).join(',');
            console.log(`${player.name.padEnd(8)} [${track.join('')}] ${player.position.toFixed(0)}m (${status})`);
            console.log(`           Item: ${player.item ? player.item.name : 'Nenhum'}\n`);
        }
    }

    endRace(winner) {
        this.isRaceOver = true;
        console.clear();
        console.log('--- FIM DA CORRIDA ---');
        console.log(`\n🎉 O VENCEDOR É ${winner.name}! 🎉\n`);
        
        const rankedPlayers = [...this.players].sort((a, b) => b.position - a.position);
        console.log('--- RANKING FINAL ---');
        rankedPlayers.forEach((p, index) => {
            console.log(`${index + 1}º - ${p.name} (${p.position.toFixed(0)}m)`);
        });
        
        process.exit();
    }
    
    findPlayerAhead(user) {
        const sortedPlayers = [...this.players].sort((a, b) => a.position - b.position);
        const userIndex = sortedPlayers.findIndex(p => p.name === user.name);
        
        if (userIndex < sortedPlayers.length - 1) {
            return sortedPlayers[userIndex + 1];
        }
        return null;
    }
    
    addTrap(position, type) {
        this.traps.push({ position, type });
    }
}

module.exports = Race;