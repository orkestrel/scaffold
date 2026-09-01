# Fix report: budget

## Dispositions

- **s18-19** deferred_breaking: Re-verified against the current tree: `BudgetOptions.consume` is still the option key at src/core/types.ts:21, and `BudgetOptions` is star-exported through src/core/index.ts, so the key is published. Renaming it (to `consumer` per the DRIFT-RESHAPE lane, or `charge` per the finding) renames a published option key, which the breaking test defers outright. No part of the repair stands on its own: every named downstream edit in Budget.ts, helpers.ts, factories.ts, and guides/budget.md is a consequence of the rename. Applied nothing. For the work order: the lane correction and the finding disagree on the target name — `consumer` (lane, one rename, matches the existing `#consumer` field and `createTokenConsumer`) versus `charge` (finding, which the lane says would then also require moving `#consumer` and `createTokenConsumer` to avoid a third synonym).
- **s18-20** applied (src/core/helpers.ts): Re-verified at the current tree: all six `ContractError` messages in `validateTokenBudgetOptions` still carried the `createTokenBudget: ` prefix (helpers.ts:121,141,153,163,173,183), while the exported sibling `validateBudgetOptions` uses the entity prefix `Budget: `. Changed the six prefixes to `TokenBudget: `. A repository-wide grep over *.ts and *.md found no test, guide, or fence pinning any of those strings, so nothing else needed updating. The `createTokenConsumer: ` prefix in src/core/factories.ts:49 is correct for its own function and was left alone. Diagnostic message text, not a call signature — non-breaking.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2520ms on 39 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — exit 0, no diagnostics
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — exit 0
- npm run build: pass — 7 modules transformed. dist/src/core/index.cjs 14.76 kB | gzip: 3.18 kB. built in 2.27s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 131 passed (131); config 46 passed (46); setup 6 passed (6); guides 18 passed (18); policy passed — chained script exit 0

## Diffstat

```text
 src/core/helpers.ts | 12 ++++++------
 1 file changed, 6 insertions(+), 6 deletions(-)
```

- dist moves: true

## Deviations

No blocking deviation. One item for the work order rather than for this unit: the s18-19 judge ruling and its DRIFT-RESHAPE lane name different rename targets (`charge` against `consumer`). The finding is deferred whole as a published-option-key rename, so the disagreement did not need resolving here and is recorded in that disposition note. Ancillary choice recorded: `TokenBudget` was used as the entity prefix (matching `TokenBudgetOptions` and the guide's entity vocabulary) exactly as the repair line specifies, including for the `options could not be read` message the repair covers by line number.
