# Tambola

A clean, modular, and extensible Tambola (Housie) game engine built with a focus on maintainability, testability, and simplicity.

## Design Highlights

### 1. Clean Code
- **Encapsulation:** Core entities (`Ticket`, `Claim`) and rules encapsulate state and expose behavior through clear interfaces.
- **Readability:** Code is organized into logical modules with meaningful names and responsibilities.
- **Testability:** Comprehensive unit tests ensure reliability and make future changes safe.

### 2. SOLID Principles
- **Single Responsibility:** Each class and module has a single, well-defined responsibility.
- **Open/Closed:** New game rules can be added by extending the `BaseRule` class without modifying existing code.
- **Liskov Substitution:** All rules inherit from `BaseRule` and can be used interchangeably.
- **Interface Segregation:** Interfaces are simple and focused; classes expose only what is necessary.
- **Dependency Inversion:** The `ClaimValidator` depends on abstractions (rules), not concrete implementations.

### 3. KISS (Keep It Simple, Stupid)
- **Lightweight by design:** No REST, DB, or GUI overhead.
- **Simple I/O model:** Tested via code, not complex input systems.
- **Minimal dependencies:** Only essential libraries are used (e.g., for testing).

## 1. Usage Example

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

## 2. Supported Game Types

| Game Type     | Description                        |
|---------------|------------------------------------|
| TOP_LINE      | First complete row (top)           |
| MIDDLE_LINE   | Second row fully marked            |
| BOTTOM_LINE   | Third row fully marked             |
| FULL_HOUSE    | All 15 numbers on ticket marked    |
| EARLY_FIVE    | First 5 numbers on the ticket      |

## 3. Ticket Structure

Each ticket is a 3x9 grid (array of arrays). Numbers or `null` represent filled and empty cells.

```js
[
  [4, null, 17, null, 42, null, null, 72, null],
  [null, 11, null, 29, null, 55, 68, null, 90],
  [5, null, 18, null, 44, null, 63, null, null]
]
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run tests:**
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

## Principles in Action
- **Behavior is separated from state** for all objects.
- **SOLID and KISS** are followed throughout for maintainability and extensibility.
- **No unnecessary complexity**—just clean, pragmatic code.

---

Feel free to explore, extend, and enjoy a robust Tambola engine!
