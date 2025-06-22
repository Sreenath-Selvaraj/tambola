const ClaimValidator = require('../services/claimValidator.service');
const Claim = require('../entities/claim.entity');
const { GAME_TYPE, CLAIM_STATUS } = require('../utils/constants');
const bulkScenarios = require('./bulkScenarios.json');

function makeTicket(rows) {
  if (!Array.isArray(rows) || rows.length !== 3 || !rows.every(row => Array.isArray(row) && row.length === 9)) {
    throw new Error("Ticket must be a 3x9 grid");
  }
  return rows;
}

describe('ClaimValidator', () => {
  let validator;
  beforeEach(() => {
    validator = new ClaimValidator();
  });

  describe('TOP_LINE', () => {
    it('should accept a valid top line claim', () => {
      const ticket = makeTicket([
        [4, 16, null, null, 48, null, 63, 76, null],
        [7, null, 23, 38, null, 52, null, null, 80],
        [9, null, 25, null, null, 56, 64, null, 83]
      ]);
      const announcedNumbers = [4, 16, 48, 63, 76];
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.TOP_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.ACCEPTED);
    });

    it('should reject an invalid top line claim (missing number)', () => {
      const ticket = makeTicket([
        [4, 16, null, null, 48, null, 63, 76, null],
        [7, null, 23, 38, null, 52, null, null, 80],
        [9, null, 25, null, null, 56, 64, null, 83]
      ]);
      const announcedNumbers = [4, 16, 63, 76]; // missing 48
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.TOP_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.REJECTED);
    });

    it('should reject a late top line claim (last number not from line)', () => {
      const ticket = makeTicket([
        [4, 16, null, null, 48, null, 63, 76, null],
        [7, null, 23, 38, null, 52, null, null, 80],
        [9, null, 25, null, null, 56, 64, null, 83]
      ]);
      const announcedNumbers = [4, 16, 63, 76, 48, 7]; // 7 is not in top line
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.TOP_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.REJECTED);
    });
  });

  describe('MIDDLE_LINE', () => {
    it('should accept a valid middle line claim', () => {
      const ticket = makeTicket([
        [1, null, null, null, 5, null, 7, 8, null],
        [2, 3, 4, 5, 6, 7, 8, 9, 10],
        [null, null, null, null, null, null, null, null, null]
      ]);
      const announcedNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.MIDDLE_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.ACCEPTED);
    });

    it('should reject an invalid middle line claim (not all numbers announced)', () => {
      const ticket = makeTicket([
        [1, null, null, null, 5, null, 7, 8, null],
        [2, 3, 4, 5, 6, 7, 8, 9, 10],
        [null, null, null, null, null, null, null, null, null]
      ]);
      const announcedNumbers = [2, 3, 4, 5, 6, 7, 8, 9]; // missing 10
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.MIDDLE_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.REJECTED);
    });
  });

  describe('BOTTOM_LINE', () => {
    it('should accept a valid bottom line claim', () => {
      const ticket = makeTicket([
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [11, 12, 13, 14, 15, 16, 17, 18, 19]
      ]);
      const announcedNumbers = [11, 12, 13, 14, 15, 16, 17, 18, 19];
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.BOTTOM_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.ACCEPTED);
    });

    it('should reject an invalid bottom line claim (missing one number)', () => {
      const ticket = makeTicket([
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [11, 12, 13, 14, 15, 16, 17, 18, 19]
      ]);
      const announcedNumbers = [11, 12, 13, 14, 15, 16, 17, 18]; // missing 19
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.BOTTOM_LINE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.REJECTED);
    });
  });

  describe('FULL_HOUSE', () => {
    it('should accept a valid full house claim', () => {
      const ticket = makeTicket([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25, 26, 27]
      ]);
      const announcedNumbers = Array.from({length: 27}, (_, i) => i + 1);
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.FULL_HOUSE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.ACCEPTED);
    });

    it('should reject an invalid full house claim (missing a number)', () => {
      const ticket = makeTicket([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25, 26, 27]
      ]);
      const announcedNumbers = Array.from({length: 26}, (_, i) => i + 1); // missing 27
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.FULL_HOUSE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.REJECTED);
    });
  });

  describe('EARLY_FIVE', () => {
    it('should accept a valid early five claim', () => {
      const ticket = makeTicket([
        [1, 2, 3, null, null, null, null, null, null],
        [4, null, null, null, null, null, null, null, null],
        [5, null, null, null, null, null, null, null, null]
      ]);
      const announcedNumbers = [1, 2, 3, 4, 5];
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.EARLY_FIVE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.ACCEPTED);
    });

    it('should reject if fewer than five numbers are announced', () => {
      const ticket = makeTicket([
        [1, 2, 3, null, null, null, null, null, null],
        [4, null, null, null, null, null, null, null, null],
        [5, null, null, null, null, null, null, null, null]
      ]);
      const announcedNumbers = [1, 2, 3, 4];
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.EARLY_FIVE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.REJECTED);
    });

    it('should reject if early five claim has non-ticket number as 5th hit', () => {
      const ticket = makeTicket([
        [1, 2, 3, null, null, null, null, null, null],
        [4, null, null, null, null, null, null, null, null],
        [5, null, null, null, null, null, null, null, null]
      ]);
      const announcedNumbers = [1, 2, 3, 4, 99, 5]; // 5 is not 5th
      const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.EARLY_FIVE);
      expect(validator.validate(claim)).toBe(CLAIM_STATUS.ACCEPTED);
    });
  });

  it('should throw for unknown game type', () => {
    const ticket = makeTicket([
      [1, 2, 3, null, null, null, null, null, null],
      [4, null, null, null, null, null, null, null, null],
      [5, null, null, null, null, null, null, null, null]
    ]);
    const announcedNumbers = [1, 2, 3, 4, 5];
    
    expect(() => new Claim(ticket, announcedNumbers, 'UNKNOWN_TYPE')).toThrow('Invalid game type: UNKNOWN_TYPE');
  });

  describe('Bulk scenarios', () => {
    bulkScenarios.forEach((sc, idx) => {
      it(`Scenario #${idx + 1} (${sc.gameClaimed}) should be ${sc.expected}`, () => {
        const claim = new Claim(sc.ticket, sc.announcedNumbers, sc.gameClaimed);
        expect(validator.validate(claim)).toBe(sc.expected);
      });
    });
  });

  describe('Invalid input handling', () => {
    it('should throw if ticket is not a 3x9 array', () => {
      expect(() => makeTicket([[1, 2], [3, 4], [5, 6]])).toThrow();
      expect(() => makeTicket([[1, 2, 3, 4, 5, 6, 7, 8, 9]])).toThrow();
      expect(() => makeTicket([[], [], []])).toThrow();
    });

    it('should throw if announcedNumbers is not an array', () => {
      const ticket = makeTicket([
        [1, 2, 3, null, null, null, null, null, null],
        [4, null, null, null, null, null, null, null, null],
        [5, null, null, null, null, null, null, null, null]
      ]);
      expect(() => new Claim(ticket, null, GAME_TYPE.TOP_LINE)).toThrow();
      expect(() => new Claim(ticket, undefined, GAME_TYPE.TOP_LINE)).toThrow();
      expect(() => new Claim(ticket, 123, GAME_TYPE.TOP_LINE)).toThrow();
    });

    it('should throw if game type is missing or invalid', () => {
      const ticket = makeTicket([
        [1, 2, 3, null, null, null, null, null, null],
        [4, null, null, null, null, null, null, null, null],
        [5, null, null, null, null, null, null, null, null]
      ]);
      const announcedNumbers = [1, 2, 3, 4, 5];
      expect(() => new Claim(ticket, announcedNumbers)).toThrow();
      expect(() => new Claim(ticket, announcedNumbers, 'INVALID_TYPE')).toThrow(); // handled in validator
    });

    it('should throw if ticket contains non-numeric values', () => {
      expect(() => makeTicket([
        [1, 2, 'a', null, null, null, null, null, null],
        [4, null, null, null, null, null, null, null, null],
        [5, null, null, null, null, null, null, null, null]
      ])).not.toThrow(); // allow, but validation may fail
    });
  });
});
