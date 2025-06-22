const fs = require("fs");
const path = require("path");
const config = require("config");

const { GAME_TYPE } = require("./src/utils/constants");
const Claim = require("./src/entities/claim.entity");
const ClaimValidatorService = require("./src/services/claimValidator.service");
const TicketParser = require("./src/utils/ticketParser");

const inputs = JSON.parse(
  fs.readFileSync(path.join(__dirname, config.get("inputFile.path")), "utf8")
);

if(!inputs || !inputs.length) {
  console.error("No valid input found in the specified file.");
  process.exit(1);
}

for (let i = 0;i<inputs.length;i++) {
  const input = inputs[i];
  const { ticket, gameClaimed, announcedNumbers } = TicketParser.fromJSON(input);
  
  const claim = new Claim(ticket, announcedNumbers, gameClaimed);

  const claimValidator = new ClaimValidatorService();
  const result = claimValidator.validate(claim);

  console.log(`Test Case ${i + 1}: ${result}`);
}
