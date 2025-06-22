const TopLineRule = require('../rules/topLine.rule');
const MiddleLineRule = require('../rules/MiddleLine.rule');
const BottomLineRule = require('../rules/BottomLine.rule');
const FullHouseRule = require('../rules/fullHouse.rule');
const EarlyFiveRule = require('../rules/earlyFive.rule');
const { GAME_TYPE, CLAIM_STATUS } = require('../utils/constants');

/**
 * Service to validate claims in Tambola based on different game rules.
 */
class ClaimValidator {
  /**
   * Initializes the ClaimValidator with all supported rules.
   */
  constructor() {
    this.rules = {
      [GAME_TYPE.TOP_LINE]: new TopLineRule(GAME_TYPE.TOP_LINE),
      [GAME_TYPE.MIDDLE_LINE]: new MiddleLineRule(GAME_TYPE.MIDDLE_LINE),
      [GAME_TYPE.BOTTOM_LINE]: new BottomLineRule(GAME_TYPE.BOTTOM_LINE),
      [GAME_TYPE.FULL_HOUSE]: new FullHouseRule(GAME_TYPE.FULL_HOUSE),
      [GAME_TYPE.EARLY_FIVE]: new EarlyFiveRule(GAME_TYPE.EARLY_FIVE),
    };
  }

  /**
   * Validates a claim using the appropriate rule.
   * @param {{ ticket: Ticket, gameType: string, announcedNumbers: number[] }} claim - The claim object.
   * @returns {string} The claim status (ACCEPTED or REJECTED).
   * @throws {Error} If the game type is invalid.
   */
  validate(claim) {
    const rule = this.rules[claim.gameType];
    if (!rule) throw new Error(`Invalid game type: ${claim.gameType}`);
    return rule.isValidClaim(claim.ticket, claim.announcedNumbers)
      ? CLAIM_STATUS.ACCEPTED
      : CLAIM_STATUS.REJECTED;
  }
}

module.exports = ClaimValidator;
