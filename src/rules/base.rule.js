const { GAME_TYPE } = require('../utils/constants');
class BaseRule {
  constructor(gameType) {
    if (!gameType || !Object.values(GAME_TYPE).includes(gameType)) {
      throw new Error("Invalid game type");
    }
    this.gameType = gameType;
  }

  isValidClaim(ticket, announcedNumbers) {
    throw new Error("Must implement isValidClaim");
  }
}

module.exports = BaseRule;