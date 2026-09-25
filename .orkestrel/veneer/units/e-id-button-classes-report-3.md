# E-ID-BUTTON-CLASSES round 3 — report

Applied Items 1 to 5 of `e-id-button-classes-brief-3.md` in `/home/user/veneer-ebcl` over Veneer `2376710`, with rounds 1
and 2 already uncommitted there.

## Item 1 — rename `FormPair` to `FormCase`

Search first: `grep -rln 'FormPair' tests guides` returned only `tests/setupBrowser.ts`, at the `export interface FormPair`
declaration and the `pair: FormPair` parameter type. No other owned or off-limits file carried the name.

Before: `export interface FormPair { ... }` and `pair: FormPair` on `readFormDifferences`.
After: `export interface FormCase { ... }` and `subject: FormCase`.

## Item 2 — rename the reader's parameter and every case binding to `subject`

Before: `readFormDifferences(pair: FormPair, ...)` and, inside its body, every `pair.name`, `pair.selector`,
`pair.button`, `pair.counterpart`, `pair.paired` read.
After: `readFormDifferences(subject: FormCase, ...)` with every one of those reads on `subject`. `paired` (the boolean
member and the `FORM_ENTRIES` key) is untouched.

Case-row and case-fixture bindings named `pair` renamed to `subject` in:
- `tests/setupBrowser.test.ts` (the two case-literal bindings that feed `readFormDifferences`, around lines 1849 and
  1891 before the edit, plus the new refusal case added under Item 4).
- `tests/src/styles/elements/button.test.ts` (the `it.each(BUTTON_FORM_CASES)` callback parameter and its
  `readFormDifferences(pair, pair.states, ...)` call and `pair.name` reads).
- `tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination}.test.ts` (each file's
  `const pair = requireValue(BUTTON_REBOOT_CASES.find(...), ...)` binding and its `readFormDifferences(pair, ...)`
  call).
- `tests/src/styles/components/carousel.test.ts` (the `BUTTON_REBOOT_CASES.find((pair) => pair.name === name)` callback
  and the `it.each` callback parameter and its `readFormDifferences(pair, ...)` call).

Every other use of the word "pair" (the release's `:disabled`/`.disabled` pairing, an unrelated CSS-nesting "pair", a
prose comment) was left as it read; `grep -rn '\bpair\b'` over the owned files after the edit returns only those
unrelated uses.

## Item 3 — TSDoc "pair" → "case"

Before/after on each site:
- `name`: "Names the pair in the reader's refusal, such as `btn-close`." → "Names the case in the reader's refusal,
  such as `btn-close`."
- `FormDifference`: "Maps each state a pair was read in to every longhand..." → "Maps each state a case was read
  in to every longhand..." (rest of the sentence unchanged).
- `FormComparison`: "Carries one pair's form differences under the document's cascade and under the release's." →
  "Carries one case's form differences under the document's cascade and under the release's."
- `@param subject`: "The class's two forms and the selector that finds the class's element in each." → "The case:
  the class's two forms and the selector that finds the class's element in each."

`paired`'s TSDoc and `FORM_ENTRIES`'s TSDoc/keys are unchanged.

## Item 4 — the reader refuses an unreadable state order

Before: `readFormDifferences` mounted the markup as its first statement, with no order check; `@param states` said
only "List `disabled` last, because a disabled element takes no later drive."; `@throws` named only the
`FORM_ENTRIES`-mismatch error.

After: as the first statement of the function body, before any mount:

```ts
if (
	states.some(
		(state, index) => (state === 'rest' && index > 0) || (state === 'disabled' && index < states.length - 1),
	)
)
	throw new Error(
		`The ${subject.name} states read rest after another state or disabled before one: ${states.join(', ')}`,
	)
```

`@param states` now reads "The states to read, in order. The reader refuses a list that reads `rest` after another
state or `disabled` before one, because motion stays reduced from the first later state onward and a disabled
element takes no later drive." `@throws` is extended with "; and an `Error` naming the list when `rest` follows
another state or `disabled` precedes one".

Added case to `tests/setupBrowser.test.ts`'s `readFormDifferences` describe, titled "refuses a state list that reads
rest after another state or disabled before one", asserting `['hovered', 'rest']` and `['disabled', 'hovered']` each
reject with the exact message (`'The order states read rest after another state or disabled before one: hovered,
rest'` and `'... disabled, hovered'`).

**Plant reading.** Deleted the refusal `if`/`throw` statement, ran
`npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t "refuses a
state list"`: the case failed with `AssertionError: promise resolved "{ …(2) }" instead of rejecting`, logged to
`ebcl-instruments/r3/ebcl-3-plant-order.log.txt`. Restored `tests/setupBrowser.ts` from the pre-plant backup; `cmp` against the
backup confirmed a byte-identical restore.

## Item 5 — guide sentence

`guides/veneer.md`: "A counterpart cannot be disabled, so it takes" → "A counterpart cannot be `:disabled`, so it
takes"; the paragraph was re-wrapped by hand to stay under the 100-column width `.oxfmtrc.json` sets, and
`oxfmt --check` (see gate table) confirms the wrap matches what oxfmt would produce.

## Gate table

| Gate | Command | Exit | Loadavg (1/5/15, running/total, last pid) |
| --- | --- | --- | --- |
| oxfmt write | `oxfmt --config .oxfmtrc.json <owned files>` | 0 | not logged (one-shot write) |
| oxfmt check | `oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | not logged (ran inline, all matched files correctly formatted) |
| setupBrowser (real) | `vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | 0 | 15.67 10.30 9.56 11/527 14548 |
| setupBrowser (plant) | same, filtered `-t "refuses a state list"` | 1 (expected, `AssertionError`) | 9.77 8.33 8.93 21/573 14199 |
| `npm run check` | — | 0 | 17.26 13.03 10.76 16/566 16419 |
| `npm run lint:check` | — | 0 | 16.90 13.21 10.87 19/563 16510 |
| `npm run build:src:styles` | — | 0 | 17.69 13.61 11.05 13/582 16587 |
| styles files (owned) | `vitest run --config configs/src/vite.styles.config.ts tests/src/styles/elements/button.test.ts tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination,carousel}.test.ts` | 0 (268 passed) | 21.03 16.20 12.31 9/673 17237 |
| `npm run test:guides` | — | 0 (20 passed) | 20.55 16.57 12.56 12/668 17332 |
| `npm run test:policy` | — | 1, twice | 19.42 16.61 12.68 19/623 17503; 19.44 16.85 12.88 18/843 17848 |

**Observation, not a stop.** `npm run test:policy` fails both runs the same way: `tests/policy.test.ts:757` (`enforces
the workspace policy laws including surface ownership`) times out at its hard-coded 5000ms limit inside
`inspectPolicyWorkspace(process.cwd())`, with no assertion failure, on a host at loadavg around 19 (well above the
core-relative norm) with 623 to 843 concurrently running processes at read time, matching the brief's standing
condition that other worktrees and the landing chain load the host. Every other test in that file (108 passed, 1
skipped) is unaffected. This is reported as an observation per the brief's Host section rather than a red gate; the
Orchestrator's re-run outside this unit's exec is the deciding reading.

## Diff and status

`ebcl-3.diff` (`git diff 2376710`, 1239 lines, spanning rounds 1 to 3) and `ebcl-3-status.txt`
(`git status --short`, 15 modified paths, none untracked) are written in the worktree.

## Deviations

None. Every Item's text typechecked and linted as written; the rename reached only the owned set the search
returned; no gate other than `test:policy` read red, and that one reads red only under the recorded load, per the
brief's own standing condition.
