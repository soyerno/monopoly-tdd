
export class Action {
    timestamp: Date;

    constructor(
        public amount: number,
        public from: Player,
        public to: Player
    ) {
        this.timestamp = new Date();
    }

    do() {
        this.from.removeCash(this.amount);
        this.to.addCash(this.amount);
    }

    toString(){
        return `${this.from.name} give $${this.amount} to ${this.to.name}`
    }
}

export class Player {
    id: number;

    constructor(
        public name: string,
        public cash: number
    ) {
        this.id = Math.random();
    }

    addCash(amount: number) {
        this.cash += amount;
    }

    removeCash(amount: number) {
        this.cash -= amount;
    }
}

export class Monopoly {
    players: Player[] = [];
    history: Action[] = [];

    constructor(
        public initialCash = 1500
    ) { 
        this.addPlayer('Bank', 9999999)
    }

    addPlayer(name: string, initialCash = this.initialCash) {
        const newPlayer: Player = new Player(name, initialCash)
        this.players.push(newPlayer)
    }

    addAction(action: Action): void {
        action.do();
        this.history.push(action);
    }
}
