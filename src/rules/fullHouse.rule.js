const BaseRule = require('./base.rule');
const { areAllNumbersAnnounced, isLastNumberValid } = require('../utils');

class FullHouseRule extends BaseRule {
  constructor(gameType) {
    super(gameType);
  }

  isValidClaim(ticket, announcedNumbers) {
    const allNumbers = ticket.getAllNumbers();
    return areAllNumbersAnnounced(allNumbers, announcedNumbers) &&
           isLastNumberValid(allNumbers, announcedNumbers);
  }
}

module.exports = FullHouseRule;
