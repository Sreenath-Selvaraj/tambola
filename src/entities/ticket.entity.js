const config = require('config');

/**
 * Represents a Tambola ticket and provides utility methods to access ticket data.
 */
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
    this.diagonals = this.calculateDiagonals();
  }

  /**
   * Returns all non-null numbers in the specified row.
   * @param {number} index - The row index.
   * @returns {number[]} The numbers in the row.
   */
  getRow(index) {
    return this.ticket[index].filter(n => n !== null);
  }

  /**
   * Returns all non-null numbers in the ticket.
   * @returns {number[]} All numbers in the ticket.
   */
  getAllNumbers() {
    return this.ticket.flat().filter(n => n !== null);
  }

  getAllDiagonals() {
    return this.diagonals
  }

}

module.exports = Ticket;
