const { GAME_TYPE } = require('../utils/constants');
const config = require('config');

const rowCount = config.get('ticket.rowCount');
const columnCount = config.get('ticket.columnCount');

class TicketParser {
  static fromJSON(inputJson) {
    if (!inputJson) throw new Error("Input JSON is required");

    const { ticket, gameClaimed, announcedNumbers } = inputJson;
    if (!Array.isArray(ticket) || ticket.length !== rowCount) {
      throw new Error(`Ticket must be an array of ${rowCount} rows`);
    }

    for (const row of ticket) {
      if (!Array.isArray(row) || row.length !== columnCount) {
        throw new Error(`Each ticket row must have exactly ${columnCount} elements`);
      }
    }

    if (!Object.values(GAME_TYPE).includes(gameClaimed)) {
      throw new Error(`Invalid gameClaimed: ${gameClaimed}`);
    }

    if (!Array.isArray(announcedNumbers)) {
      throw new Error("announcedNumbers must be an array");
    }

    return {
      ticket,
      gameClaimed,
      announcedNumbers
    };
  }
}

module.exports = TicketParser;
