import { Monopoly, Action } from './monopoly';

describe('Monopoly', () => {
    let monopoly: Monopoly;
    const initialCash = 2000;

    beforeEach(() => {
        monopoly = new Monopoly(initialCash);
    });

    test('should return a new instance of Monopoly with Bank as Player', () => {
        expect(monopoly).toBeInstanceOf(Monopoly);
        expect(monopoly.players.length).toBe(1)
        expect(monopoly.initialCash).toBe(initialCash)
        expect(monopoly.history.length).toBe(0)
    });

    test('should return a new player added calling addPlayer', () => {
        monopoly.addPlayer('player1')
        expect(monopoly.players.length).toBe(2)
        expect(monopoly.players[1].name).toBe("player1")
        expect(monopoly.players[1].cash).toBe(initialCash)
    });

    test('should return a game instance with 2 players', () => {
        monopoly.addPlayer('player1')
        monopoly.addPlayer('player2')
        expect(monopoly.players.length).toBe(3)
        expect(monopoly.players[1].name).toBe("player1")
        expect(monopoly.players[2].name).toBe("player2")
    })

    test('should player1 pay to player2', () => {
        monopoly.addPlayer('player1')
        monopoly.addPlayer('player2')
        const player1 = monopoly.players[1]
        const player2 = monopoly.players[2]
        const paymentAction = new Action(
            1000,
            player1,
            player2
        )
        monopoly.addAction(paymentAction);
        expect(monopoly.history.length).toBe(1)
        expect(monopoly.history[0].toString()).toBe("player1 give $1000 to player2")
        expect(monopoly.players[1].cash).toBe(1000)
        expect(monopoly.players[2].cash).toBe(3000)
    })

    test('should bank pay to player1', () => {
        monopoly.addPlayer('player1')
        const bank = monopoly.players[0]
        const bankAfterCash = monopoly.players[0].cash - 200
        const player1 = monopoly.players[1]
        const paymentAction = new Action(
            200,
            bank,
            player1
        )
        monopoly.addAction(paymentAction);
        expect(monopoly.history.length).toBe(1)
        expect(monopoly.history[0].toString()).toBe("Bank give $200 to player1")
        expect(monopoly.players[0].cash).toBe(bankAfterCash)
        expect(monopoly.players[1].cash).toBe(2200)
    })

});