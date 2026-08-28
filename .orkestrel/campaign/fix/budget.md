# Fix dossier: budget

Verified fix-producing findings for the `budget` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-19 — DRIFT-RESHAPE

19. package=budget file=`src/core/types.ts:21` rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs"), § Value-level identifiers verdict=CONFIRMED
    wrong: `BudgetOptions.consume` is a property named with a verb, and its verb names an action it does not perform — its own TSDoc at `types.ts:20` says it "Extract[s] the finite nonnegative charge". The identical term on the interface, `BudgetInterface.consume(value)` at `types.ts:63`, is the method that actually consumes. `budget.consume(v)` calling `options.consume(v)` and then adding the result makes the two meanings collide at the call site, and the class field concedes it by being named `#consumer` (`Budget.ts:33`).
    repair: Rename the option key to `charge` at `types.ts:21` (a noun for the value it extracts), and update `Budget.ts:33`, `:43`, `:76`, `helpers.ts:36`, `:41`, `:75-84`, `:96-99`, `factories.ts:25`, `:47`, `:124`, and `guides/budget.md`. `BudgetInterface.consume(value)` is unchanged.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The objective lane's INVALID rests on a taxonomy claim the rule file refutes. names.md:12 opens the entity-scoped section with 'Properties/getters, methods, option keys, and event names belong to an entity whose type already supplies context', so an option key is not carved out of 'properties'; the

**Lane INVALID/medium:** drop

**Lane DRIFT-RESHAPE/medium:** amend: rename the option key to `consumer`, not `charge`. `consumer` is a noun (satisfying the rule), it removes the verb collision with `BudgetInterface.consume(value)`, and it is the term the entity already uses in both remaining places — the field `#consumer` at Budget.ts:33 and the public factory `createTokenConsumer` — so the rename lands in one place instead of three. If `charge` is preferred instead, then `#consumer` and `createTokenConsumer` must move with it or the package gains a third synonym. Either way update Budget.ts:33,43,76; helpers.ts:36,41,75-84,96-99; factories.ts:25,47,124; and guides/budget.md:16,25,31,61,110.

## s18-20 — DRIFT

20. package=budget file=`src/core/helpers.ts:121,141,153,163,173,183` rule=`.claude/rules/writing.md` § Claims and time ("Claim only what the reader can check") verdict=CONFIRMED
    wrong: `validateTokenBudgetOptions` is a barrelled public export, but every `ContractError` message it throws names a different function — `'createTokenBudget: options must be a plain record'` and five more. A consumer calling the exported validator directly gets an error attributing the failure to a function they did not call. Its sibling `validateBudgetOptions` in the same file correctly uses the entity prefix `'Budget: …'`.
    repair: Change the six message prefixes to `'TokenBudget: '` at `helpers.ts:121`, `:141`, `:153`, `:163`, `:173`, `:183`.

