const BaseRule = require("./base.rule");
const { areAllNumbersAnnounced, isLastNumberValid } = require("../utils");
const { LINE_INDEX } = require("../utils/constants");

class MiddleLineRule extends BaseRule {
  constructor(gameType) {
    super(gameType);
  }

  isValidClaim(ticket, announcedNumbers) {
    const line = ticket.getRow(LINE_INDEX[this.gameType]);
    return (
      areAllNumbersAnnounced(line, announcedNumbers) &&
      isLastNumberValid(line, announcedNumbers)
    );
  }
}

module.exports = MiddleLineRule;
