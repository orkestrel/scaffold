# Unit breaking-budget — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s18-19** — applied: Re-verified at the ledger location: src/core/types.ts:21 still declared `readonly consume: (value: T) => number` on `BudgetOptions`, star-exported through src/core/index.ts. Renamed the option key to `consumer` per the Orchestrator ruling (the DRIFT-RESHAPE lane amendment), matching the existing `#consumer` field and `createTokenConsumer`. Carried it through every in-package consumer: Budget.ts (the `#consumer` field type index and its constructor read), helpers.ts (the local binding, the once-read assignment, the `isFunction` guard, the `'Budget: consumer must be a function'` message, the `path: ['options', 'consumer']` context, and all four normalized return shapes), factories.ts (the `createBudget` @example, the `createTokenConsumer` return type index and its @example local, and the `createTokenBudget` body where `consume: consumer` collapsed to the shorthand `consumer`), guides/budget.md (the Options prose, the `createBudget` Factories row, the `BudgetOptions` Types row, and all three `createBudget` fences), README.md (the Usage fence), and the tests. `BudgetInterface.consume(value)` and `Budget.consume(value)` are unchanged, as the ruling states. Ledger location Budget.ts:76 needed no edit: it reads `this.#consumer(value)`, which already carried the adopted name — that line was listed because the finding's rejected `charge` target would have moved `#consumer` with it.

## Symbols moved

- BudgetOptions.consume → BudgetOptions.consumer (src/core/types.ts:21, published option key)
- BudgetOptions<T>['consume'] → BudgetOptions<T>['consumer'] (type index at src/core/Budget.ts:33, src/core/helpers.ts:36, src/core/factories.ts:47)
- ContractError message 'Budget: consume must be a function' → 'Budget: consumer must be a function' (src/core/helpers.ts:76)
- ContractError context path ['options', 'consume'] → ['options', 'consumer'] (src/core/helpers.ts:79)
- unchanged: BudgetInterface.consume(value), Budget.consume(value), Budget#consumer, createTokenConsumer, createBudget, createTokenBudget, validateBudgetOptions, validateTokenBudgetOptions, the validators, TokenScope, TokenBudgetOptions, TokenUsage

## Files touched

- /home/user/fleet/budget/src/core/types.ts
- /home/user/fleet/budget/src/core/Budget.ts
- /home/user/fleet/budget/src/core/helpers.ts
- /home/user/fleet/budget/src/core/factories.ts
- /home/user/fleet/budget/guides/budget.md
- /home/user/fleet/budget/README.md
- /home/user/fleet/budget/tests/setup.ts
- /home/user/fleet/budget/tests/setup.test.ts
- /home/user/fleet/budget/tests/src/core/Budget.test.ts
- /home/user/fleet/budget/tests/src/core/factories.test.ts
- /home/user/fleet/budget/tests/src/core/helpers.test.ts

## Tests changed

- /home/user/fleet/budget/tests/src/core/Budget.test.ts — every `BudgetOptions` literal moved to `consumer:`; the placement-failure case now asserts `path: ['options', 'consumer']`; the type-shape case now indexes `BudgetOptions<number>['consumer']` while keeping `BudgetInterface<number>['consume']` as the method contract
- /home/user/fleet/budget/tests/src/core/factories.test.ts — the factory-boundary literals moved to `consumer:`; the untyped non-function case asserts `path: ['options', 'consumer']`; the generic-preservation case indexes `BudgetOptions<number>['consumer']`
- /home/user/fleet/budget/tests/src/core/helpers.test.ts — the fresh-copy, optional-key, and hostile-getter inputs moved to `consumer:`; the exactly-once read order now expects `['id', 'max', 'consumer', 'signal']`; the taxonomy table row for the option key moved its label, its input, and its expected path
- /home/user/fleet/budget/tests/setup.ts — the `captureContractError` @example fence moved to `consumer:`
- /home/user/fleet/budget/tests/setup.test.ts — the `selectCharge` comment names the `consumer` option while still naming the `consume(n)` call

## Gates

- `npm run format:check` → exit 0 — Checking formatting...\n\nAll matched files use the correct format.\nFinished in 1964ms on 39 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- `npm run build` → exit 0 — 7 modules transformed. dist/src/core/index.js 13.51 kB | gzip: 3.07 kB; dist/src/core/index.cjs 14.77 kB | gzip: 3.17 kB; built in 1.81s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — test:src 4 files, 131 passed (131); test:policy 1 file, 111 passed (111); test:config 1 file, 46 passed (46); test:setup 1 file, 6 passed (6); test:guides 1 file, 18 passed (18)
- `npm run format:check && npm run lint:check && npm run check && npm run build && npm test` → exit 0 — CHAIN_EXIT=0 — the brief's chain run end to end after the individual gates

## Diff stat

```text
README.md                        |  2 +-
 guides/budget.md                 | 12 ++++----
 src/core/Budget.ts               |  6 ++--
 src/core/factories.ts            | 16 +++++------
 src/core/helpers.ts              | 24 ++++++++--------
 src/core/types.ts                | 10 +++----
 tests/setup.test.ts              |  2 +-
 tests/setup.ts                   |  2 +-
 tests/src/core/Budget.test.ts    | 62 ++++++++++++++++++++--------------------
 tests/src/core/factories.test.ts | 12 ++++----
 tests/src/core/helpers.test.ts   | 18 ++++++------
 11 files changed, 83 insertions(+), 83 deletions(-)
```

Status at return (writer's reading): `applied — the single assigned breaking row landed, the gate chain reads green, and no off-limits file moved`
Built `dist/` moves: true

## Observations

- Adoption list was empty. `npm run check` exited 0 against the staged closure before any edit, so this package used no upstream symbol the L0/W-DEV renames moved. `node /home/user/work/verify-stage.mjs budget` reported OK for @orkestrel/contract (contract-d24e79c.tgz), @orkestrel/guide (guide-be6111e.tgz), @orkestrel/html (html-ce9b703.tgz), @orkestrel/markdown (markdown-de72312.tgz), and @orkestrel/test (test-cced24a.tgz).
- Prose sweep, classified. `grep -rn '\bconsume\b' src tests guides` over the post-rename tree returns hits, and every one names the unchanged `BudgetInterface.consume(value)` method rather than the renamed option key: src/core/Budget.ts:10,26,27,75,78,89 (the @remarks sentence, two @example calls, the method declaration, and the two `'Budget.consume: …'` message prefixes that name the method); src/core/factories.ts:26,115 and src/core/types.ts:35,63 (@example calls and the interface declaration); guides/budget.md:3,11,19,20,23,25,63,75,80,88,89,90,91,116,138,153,166,169,175 (method prose, method table rows, and fence calls); tests/src/core/Budget.test.ts:137-390 and tests/src/core/factories.test.ts:24-251 (`budget.consume(...)` calls, two test titles naming the method, and the `BudgetInterface<number>['consume']` type-shape assertion); tests/setup.test.ts:53 (a `consume(n)` call named beside the now-renamed `consumer` option). tests/config.test.ts:833,847 hold an unrelated accessor code sample whose helper is named `consume` and touch no budget API. `\bconsume\b` does not match `consumer`, so the sweep is exact.
- TSDoc voice, per the brief's Execution clause. Blocks the rename touched now carry a third-person first sentence: `createBudget` (Create → Creates), `createTokenConsumer` (Create → Creates), `createTokenBudget` (Create → Creates), `validateBudgetOptions` (Validate and normalize → Validates and normalizes), and the `BudgetOptions.consumer` member (Extract → Extracts). Blocks the rename did not touch keep their existing voice and remain the TSDoc voice wave's subject: `validateTokenBudgetOptions`, the four validators, the `BudgetInterface` method docs, and the bare noun-phrase openers on `BudgetOptions`, `BudgetInterface`, `Budget`, `TokenScope`, `TokenBudgetOptions`, and `TokenUsage`.
- Beyond the ledger's named lines, two more fences spelled the option key and both moved: guides/budget.md:164 (the `Reuse a handle with clear()` pattern fence) and README.md:29 (the Usage fence, which ships in `files`). The ledger listed guide lines 16,25,31,61,110 only.
- `createTokenBudget` no longer maps one term onto another: the object literal `consume: consumer` collapsed to the shorthand `consumer`, so the option key and the local binding share one name.
- Centralization sweep over the touched files found nothing to move. types.ts holds interfaces and one type alias; Budget.ts holds one class and its imports; helpers.ts holds two exported validators; factories.ts holds three exported factories, whose only inner function is the anonymous consumer `createTokenConsumer` returns directly. No nested function declaration or assignment was introduced, no wrapper, alias, or re-export was added, no export moved, and src/core/index.ts is unchanged. The parity `INTERNAL` list in tests/guides.test.ts stays empty and needed no row.
- Encoding check over every touched file: valid UTF-8, no replacement character, no non-breaking space, no stray control character, no mojibake.
- `npm run format` re-aligned two guide table rows so the trailing pipes hold their columns after `consumer` widened them; the rendered widths of guides/budget.md's Factories and Types tables are identical to HEAD. `git diff --check` exits 0.
- `dist/` moves, as expected for a published option-key rename: dist/src/core/index.d.ts:105 now declares `readonly consumer: (value: T) => number`. `dist` is gitignored, so it does not appear in `git status --short`.
- Timing, not a criterion. The whole `npm test` chain finished without a slow or flaky test on this host; the per-project durations ran 221ms to 2.18s and no test approached a timeout.
- Off-limits files are untouched. `git diff --name-only` matches none of package.json, package-lock.json, AGENTS.md, .claude/**, .agents/**, configs/**, tests/setupPolicy.ts, or tests/policy.test.ts. Nothing was committed, staged, pushed, installed, or discarded.

## Deviations

- No blocking deviation. The row's target name did not collide with an existing export, no second row moved the same symbol, and no rename reached an off-limits file.
- Ancillary decision recorded: the `createTokenConsumer` @example's local binding moved from `const consume = …` to `const consumer = …`. The ledger did not name factories.ts:43-44, but leaving `consume` there would have left a fence token that reads as the old option key and would have muddied the acceptance sweep. It is a local binding in a doc fence, so it changes no contract.
- Ancillary decision recorded: the TSDoc first-sentence rewrite was scoped to the declarations the rename edits landed in, and not swept across the package. `.orkestrel/campaign/fix/tsdoc-wave-brief.md` assigns the whole-package voice migration to a separate unit that runs last, and that wave leaves already-compliant blocks alone, so the two do not collide. The residual mixed voice inside src/core/helpers.ts and src/core/validators.ts is that wave's subject.
- Ancillary decision recorded: the `'Budget: consume must be a function'` message and its `['options', 'consume']` context path moved with the key, because both name the option the caller passed. No test or guide fence pinned the message text, so nothing else depended on the wording. The sibling `'Budget.consume: …'` prefixes in Budget.ts name the method and stayed.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/budget.diff`,
`tmp/units/breaking/budget.status`.
