const ticketEntity = require('./ticket.entity');
const { GAME_TYPE } = require('../utils/constants');

class Claim {
  constructor(ticket, announcedNumbers, gameType) {
    this.ticket = new ticketEntity(ticket);
    if (!Array.isArray(announcedNumbers) || announcedNumbers.length === 0) {
      throw new Error("Announced numbers must be a non-empty array");
    }
    this.announcedNumbers = announcedNumbers;
    if (!Object.values(GAME_TYPE).includes(gameType)) {
      throw new Error(`Invalid game type: ${gameType}`);
    }
    this.gameType = gameType;
  }
}

module.exports = Claim;
