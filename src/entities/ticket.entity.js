const config = require('config');

class Ticket {
  constructor(ticket) {
    const rowCount = config.get('ticket.rowCount');
    const columnCount = config.get('ticket.columnCount');
    if (!ticket || ticket.length !== rowCount) {
      throw new Error(`Ticket must have ${rowCount} rows.`);
    }

    for(const row of ticket) {
      if (!row || row.length !== columnCount) {
        throw new Error(`Each row must have ${columnCount} columns.`);
      }
    }

    this.ticket = ticket;
  }

  getRow(index) {
    return this.ticket[index].filter(n => n !== null);
  }

  getAllNumbers() {
    return this.ticket.flat().filter(n => n !== null);
  }
}

module.exports = Ticket;
