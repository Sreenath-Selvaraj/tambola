const BaseRule = require('./base.rule');
const { isAllAndLastNumberValid } = require('../utils');
const { LINE_INDEX } = require('../utils/constants');

class TopLineRule extends BaseRule {
  constructor(gameType) {
    super(gameType);
  }
  
  isValidClaim(ticket, announcedNumbers) {
    const line = ticket.getRow(LINE_INDEX[this.gameType]);
    return isAllAndLastNumberValid(line, announcedNumbers);
  }
}

module.exports = TopLineRule;
