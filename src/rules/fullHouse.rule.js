const BaseRule = require('./base.rule');
const { isAllAndLastNumberValid } = require('../utils');
const config = require('config');
class FullHouseRule extends BaseRule {
  constructor(gameType) {
    super(gameType);
  }

  isValidClaim(ticket, announcedNumbers) {
    const allNumbers = ticket.getAllNumbers();
    const fullHouseCount = config.get('ticket.fullHouseCount');
    if(!allNumbers || allNumbers.length < fullHouseCount) {
      return false; // No numbers on the ticket
    }
    return isAllAndLastNumberValid(allNumbers, announcedNumbers);
  }
}

module.exports = FullHouseRule;
