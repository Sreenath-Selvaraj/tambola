# Tambola

A clean, modular, and extensible Tambola (Housie) game engine built with a focus on maintainability, testability, and simplicity.

## Design Highlights

#### a. Clean Code
- **Encapsulation:** Core entities (`Ticket`, `Claim`) and rules encapsulate state and expose behavior through clear interfaces.
- **Readability:** Code is organized into logical modules with meaningful names and responsibilities.
- **Testability:** Comprehensive unit tests ensure reliability and make future changes safe.

#### b. SOLID Principles
- **Single Responsibility:** Each class and module has a single, well-defined responsibility.
- **Open/Closed:** New game rules can be added by extending the `BaseRule` class without modifying existing code.
- **Liskov Substitution:** All rules inherit from `BaseRule` and can be used interchangeably.
- **Interface Segregation:** Interfaces are simple and focused; classes expose only what is necessary.
- **Dependency Inversion:** The `ClaimValidator` depends on abstractions (rules), not concrete implementations.

#### c. KISS (Keep It Simple, Stupid)
- **Lightweight by design:** No REST, DB, or GUI overhead.
- **Simple I/O model:** Tested via code, not complex input systems.
- **Minimal dependencies:** Only essential libraries are used (e.g., for testing, config).

## Usage Example

```js
const ClaimValidator = require('./src/services/claimValidator.service');
const Claim = require('./src/entities/claim.entity');
const { GAME_TYPE } = require('./src/utils/constants');

const ticket = [
  [1, 2, 3, null, null, null, null, null, null],
  [4, null, null, null, null, null, null, null, null],
  [5, null, null, null, null, null, null, null, null]
];
const announcedNumbers = [1, 2, 3, 4, 5];
const claim = new Claim(ticket, announcedNumbers, GAME_TYPE.EARLY_FIVE);

const validator = new ClaimValidator();
console.log(validator.validate(claim)); // Output: ACCEPTED
```

## Supported Game Types

| Game Type     | Description                        |
|---------------|------------------------------------|
| TOP_LINE      | First complete row (top)           |
| MIDDLE_LINE   | Second row fully marked            |
| BOTTOM_LINE   | Third row fully marked             |
| FULL_HOUSE    | All 15 numbers on ticket marked    |
| EARLY_FIVE    | First 5 numbers on the ticket      |


##  Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run Test Cases:**
   ```sh
   npm start
   ```
3. **Run tests:**
   ```sh
   npm test
   ```

## Project Structure

- `src/entities/` — Core domain entities (e.g., `Ticket`, `Claim`)
- `src/rules/` — Game rules, each as a separate class extending `BaseRule`
- `src/services/` — Services like `ClaimValidator` for orchestrating validation
- `src/utils/` — Utility functions and constants
- `src/tests/` — Unit tests for all core logic

## Extending the Game
To add a new rule:
1. Create a new class in `src/rules/` extending `BaseRule`.
2. Implement the `isValidClaim` method.
3. Register the rule in `ClaimValidator`.

## Assumptions

- The EARLY_FIVE rule accepts a claim as soon as any five numbers on the ticket are marked, regardless of how many numbers have been announced. If more than five numbers are announced, but the fifth marked number completes the claim, it will still be accepted immediately.

- Each ticket is a 3x9 grid (3 rows, 9 columns). This structure is configurable. 

---

Feel free to explore, extend, and enjoy a robust Tambola engine!
