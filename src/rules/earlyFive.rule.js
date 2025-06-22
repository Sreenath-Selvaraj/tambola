const BaseRule = require('./base.rule');

class EarlyFiveRule extends BaseRule {
  constructor(gameType) {
    super(gameType);
  }

  isValidClaim(ticket, announcedNumbers) {
    const ticketNumbers = new Set(ticket.getAllNumbers());
    const markedNumbers = new Set();

    for (let i = 0; i < announcedNumbers.length; i++) {
      const number = announcedNumbers[i];
      if (ticketNumbers.has(number)) {
        markedNumbers.add(number);
        if (markedNumbers.size === 5) {
          return i === announcedNumbers.length - 1;
        }
      }
    }
    return false;
  }
}

module.exports = EarlyFiveRule;
