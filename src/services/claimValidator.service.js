const TopLineRule = require('../rules/topLine.rule');
const MiddleLineRule = require('../rules/MiddleLine.rule');
const BottomLineRule = require('../rules/BottomLine.rule');
const FullHouseRule = require('../rules/fullHouse.rule');
const EarlyFiveRule = require('../rules/earlyFive.rule');
const { GAME_TYPE, CLAIM_STATUS } = require('../utils/constants');

class ClaimValidator {
  constructor() {
    this.rules = {
      [GAME_TYPE.TOP_LINE]: new TopLineRule(GAME_TYPE.TOP_LINE),
      [GAME_TYPE.MIDDLE_LINE]: new MiddleLineRule(GAME_TYPE.MIDDLE_LINE),
      [GAME_TYPE.BOTTOM_LINE]: new BottomLineRule(GAME_TYPE.BOTTOM_LINE),
      [GAME_TYPE.FULL_HOUSE]: new FullHouseRule(GAME_TYPE.FULL_HOUSE),
      [GAME_TYPE.EARLY_FIVE]: new EarlyFiveRule(GAME_TYPE.EARLY_FIVE),
    };
  }

  validate(claim) {
    const rule = this.rules[claim.gameType];
    if (!rule) throw new Error(`Unknown game type: ${claim.gameType}`);
    if(rule.isValidClaim(claim.ticket, claim.announcedNumbers)) {
      return CLAIM_STATUS.ACCEPTED
    } else {
      return CLAIM_STATUS.REJECTED;
    }
  }
}

module.exports = ClaimValidator;
