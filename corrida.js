function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
    const blocks = ["RETA", "CURVA", "CONFRONTO"];
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
}

function logScoreboard(player1, player2) {
    console.log(`\n--- Placar ---`);
    console.log(`${player1.nome}: ${player1.pontos} ponto(s)`);
    console.log(`${player2.nome}: ${player2.pontos} ponto(s)`);
}

async function playRace(player1, player2) {
    console.log(
        `🏁 Corrida entre ${player1.nome} e ${player2.nome} começando... \n`
    );
    await sleep(1000);

    for (let round = 1; round <= 5; round++) {
        console.log(`\n--- 🏁 Rodada ${round} ---`);
        
        const blockType = getRandomBlock();
        console.log(`Pista da rodada: ${blockType}`);
        await sleep(1000);

        let diceResult1 = rollDice();
        let diceResult2 = rollDice();

        let totalTest1 = 0;
        let totalTest2 = 0;

        if (blockType === "RETA") {
            totalTest1 = player1.velocidade + diceResult1;
            totalTest2 = player2.velocidade + diceResult2;

            console.log(`${player1.nome} rolou 🎲 ${diceResult1} + ${player1.velocidade} (velocidade) = ${totalTest1}`);
            console.log(`${player2.nome} rolou 🎲 ${diceResult2} + ${player2.velocidade} (velocidade) = ${totalTest2}`);
            await sleep(1000);
            
            if (totalTest1 > totalTest2) {
                console.log(`✨ ${player1.nome} venceu a reta e ganhou 1 ponto!`);
                player1.pontos++;
            } else if (totalTest2 > totalTest1) {
                console.log(`✨ ${player2.nome} venceu a reta e ganhou 1 ponto!`);
                player2.pontos++;
            } else {
                console.log("A disputa na reta terminou em empate!");
            }
        } 
        
        else if (blockType === "CURVA") {
            totalTest1 = player1.manobrabilidade + diceResult1;
            totalTest2 = player2.manobrabilidade + diceResult2;

            console.log(`${player1.nome} rolou 🎲 ${diceResult1} + ${player1.manobrabilidade} (manobrabilidade) = ${totalTest1}`);
            console.log(`${player2.nome} rolou 🎲 ${diceResult2} + ${player2.manobrabilidade} (manobrabilidade) = ${totalTest2}`);
            await sleep(1000);

            if (totalTest1 > totalTest2) {
                console.log(`✨ ${player1.nome} venceu a curva e ganhou 1 ponto!`);
                player1.pontos++;
            } else if (totalTest2 > totalTest1) {
                console.log(`✨ ${player2.nome} venceu a curva e ganhou 1 ponto!`);
                player2.pontos++;
            } else {
                console.log("A disputa na curva terminou em empate!");
            }
        } 
        
        else if (blockType === "CONFRONTO") {
            totalTest1 = player1.poder + diceResult1;
            totalTest2 = player2.poder + diceResult2;

            console.log(`${player1.nome} rolou 🎲 ${diceResult1} + ${player1.poder} (poder) = ${totalTest1}`);
            console.log(`${player2.nome} rolou 🎲 ${diceResult2} + ${player2.poder} (poder) = ${totalTest2}`);
            await sleep(1000);

            if (totalTest1 > totalTest2) {
                console.log(`💥 ${player2.nome} perdeu o confronto e perdeu 1 ponto!`);
                if (player2.pontos > 0) {
                    player2.pontos--;
                }
            } else if (totalTest2 > totalTest1) {
                console.log(`💥 ${player1.nome} perdeu o confronto e perdeu 1 ponto!`);
                if (player1.pontos > 0) {
                    player1.pontos--;
                }
            } else {
                console.log("O confronto terminou em empate! Ninguém perdeu pontos.");
            }
        }
        
        logScoreboard(player1, player2);
        await sleep(2000);
    }
    
    console.log("\n===============================");
    console.log("      FIM DA CORRIDA!      ");
    console.log("===============================");
    
    if (player1.pontos > player2.pontos) {
        console.log(`\n🏆 O grande vencedor é ${player1.nome}! 🏆`);
    } else if (player2.pontos > player1.pontos) {
        console.log(`\n🏆 O grande vencedor é ${player2.nome}! 🏆`);
    } else {
        console.log("\nA corrida terminou em empate!");
    }

    logScoreboard(player1, player2);
}

(async function main() {
    const player1 = {
        nome: "Mario",
        velocidade: 4,
        manobrabilidade: 3,
        poder: 3,
        pontos: 0,
    };

    const player2 = {
        nome: "Luigi",
        velocidade: 3,
        manobrabilidade: 4,
        poder: 3,
        pontos: 0,
    };

    await playRace(player1, player2);
})();