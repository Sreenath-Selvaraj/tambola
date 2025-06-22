const { GAME_TYPE } = require('../utils/constants');

/**
 * Base class for all Tambola game rules.
 */
class BaseRule {
  constructor(gameType) {
    if (!gameType || !Object.values(GAME_TYPE).includes(gameType)) {
      throw new Error("Invalid game type");
    }
    this.gameType = gameType;
  }

  /**
   * Checks if a claim is valid. Should be implemented by subclasses.
   * @param {Ticket} ticket - The ticket to validate.
   * @param {number[]} announcedNumbers - The numbers that have been announced.
   * @returns {boolean}
   * @throws {Error} Always, unless implemented by subclass.
   */
  isValidClaim(ticket, announcedNumbers) {
    throw new Error("Must implement isValidClaim");
  }
}

module.exports = BaseRule;