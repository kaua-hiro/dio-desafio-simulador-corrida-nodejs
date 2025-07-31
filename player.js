class Player {
    constructor(name, isAI = false) {
        this.name = name;
        this.position = 0;
        this.speed = 2;
        this.item = null;
        this.statusEffects = [];
        this.isAI = isAI;
    }

    move() {
        let currentSpeed = this.speed;
        
        if (this.hasEffect('boost')) {
            currentSpeed *= 2;
        }
        if (this.hasEffect('spin_out')) {
            currentSpeed = 0;
        }

        this.position += currentSpeed;
    }

    collectItem(item) {
        if (!this.item) {
            this.item = item;
            console.log(`\n${this.name} pegou um ${item.name}!`);
        }
    }

    useItem(race) {
        if (this.item) {
            console.log(`\n${this.name} usou ${this.item.name}!`);
            this.item.effect(this, race);
            this.item = null;
        }
    }
    
    applyEffect(type, duration) {
        if (type === 'boost' && this.hasEffect('spin_out')) {
            this.removeEffect('spin_out');
        }
        if (type === 'spin_out' && this.hasEffect('boost')) {
            this.removeEffect('boost');
        }
        
        console.log(`\n${this.name} foi afetado por: ${type.toUpperCase()}`);
        this.statusEffects.push({ type, duration });
    }
    
    updateStatus() {
        this.statusEffects = this.statusEffects.filter(effect => {
            effect.duration--;
            return effect.duration > 0;
        });
    }

    hasEffect(type) {
        return this.statusEffects.some(effect => effect.type === type);
    }

    removeEffect(type) {
        this.statusEffects = this.statusEffects.filter(effect => effect.type !== type);
    }
}

module.exports = Player;