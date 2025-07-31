const ITEMS = {
    COGUMELO: {
        name: "Cogumelo 🍄",
        effect: (user, race) => {
            user.applyEffect('boost', 3);
        }
    },
    CASCO_VERDE: {
        name: "Casco Verde 🐢",
        effect: (user, race) => {
            const target = race.findPlayerAhead(user);
            if (target) {
                console.log(`\nO Casco Verde atingiu ${target.name}!`);
                target.applyEffect('spin_out', 2);
            } else {
                console.log(`\nO Casco Verde não atingiu ninguém!`);
            }
        }
    },
    BANANA: {
        name: "Banana 🍌",
        effect: (user, race) => {
            const trapPosition = user.position - 1;
            race.addTrap(trapPosition, 'banana_peel');
            console.log(`\n${user.name} deixou uma casca de banana na pista!`);
        }
    }
};

const getRandomItem = () => {
    const itemKeys = Object.keys(ITEMS);
    const randomKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
    return ITEMS[randomKey];
};

module.exports = { ITEMS, getRandomItem };