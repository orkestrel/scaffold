# Unit breaking-sse — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s18-04** — applied: Renamed the published `reset()` to `clear()` on `SSEParserInterface` (src/core/types.ts:89) and on `SSEParser` (src/core/SSEParser.ts:147), per names.md § Fixed lifecycle vocabulary (`clear` = reset state without destroying the entity; `reset` is a banned synonym). Kept the private `#clear()` at SSEParser.ts:250 and its call sites at :152 and :246 unchanged, as the ruling's DRIFT-RESHAPE correction directs; no collision, proven here by `npm run check` exit 0 against both scoped projects, and by the emitted declaration carrying `clear(): void` on both the class (dist/src/core/index.d.ts:214) and the interface (:252). Updated every in-package consumer, `@example`, TSDoc reference, private comment, guide row and fence, and test. The parity `INTERNAL` list is empty and needed no change; `npm run test:guides` (18 passed) proves the guide's method table now names `clear` and no phantom `reset`.

## Symbols moved

- SSEParserInterface.reset → SSEParserInterface.clear (src/core/types.ts:89)
- SSEParser.reset → SSEParser.clear (src/core/SSEParser.ts:147)
- SSEParser.#clear — retained unchanged (src/core/SSEParser.ts:250), call sites :152 and :246 unchanged

## Files touched

- /home/user/fleet/sse/src/core/types.ts
- /home/user/fleet/sse/src/core/SSEParser.ts
- /home/user/fleet/sse/src/core/factories.ts
- /home/user/fleet/sse/src/core/errors.ts
- /home/user/fleet/sse/tests/src/core/SSEParser.test.ts
- /home/user/fleet/sse/tests/src/core/factories.test.ts
- /home/user/fleet/sse/guides/sse.md
- /home/user/fleet/sse/README.md

## Tests changed

- tests/src/core/SSEParser.test.ts — `describe('SSEParser — reset')` → `describe('SSEParser — clear')`; every `parser.reset()` call site → `parser.clear()`
- tests/src/core/SSEParser.test.ts — renamed for what they prove: 'resets the accumulator between events…' → 'clears the accumulator between events…'; 're-arms BOM stripping after reset…' → '…after clear…'; 'A2 sticky last-event-id getter persists across dispatches, updates, and reset' → '…and clear'; 'A2c sticky retry getter persists, ignores invalid retry, and clears on reset' → '…and is dropped by clear'; '(d) the throwing call leaves prior state intact and reset() makes the parser reusable' → '…and clear() makes the parser reusable'; 'F3 reset() mid-CRLF clears the carriage hold…' → 'F3 clear() mid-CRLF drops the carriage hold…'
- tests/src/core/factories.test.ts — 'clears the buffer on reset' → 'clears the buffer'; `parser.reset()` → `parser.clear()`
- No test was added or deleted. The rename moved no behaviour, so every existing assertion still pins the same invariant under the new name.

## Gates

- `npm run format:check` → exit 0 — oxfmt --config .oxfmtrc.json --check . | All matched files use the correct format. | Finished in 1712ms on 37 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . | (no diagnostics)
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json | (no diagnostics) — this is the collision proof for public `clear()` beside private `#clear()`
- `npm run build` → exit 0 — dist/src/core/index.js 12.02 kB gzip 4.26 kB | dist/src/core/index.cjs 12.20 kB gzip 4.33 kB | built in 1.47s | Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — test:src 2 files / 120 tests passed; test:policy 1 file / 111 passed; test:config 1 file / 46 passed; test:setup 1 file / 16 passed; test:guides 1 file / 18 passed. No failure, no skip, no timing-suspect test.

## Diff stat

```text
README.md 4 ++--; guides/sse.md 18 +++++++++---------; src/core/SSEParser.ts 20 ++++++++++----------; src/core/errors.ts 8 ++++----; src/core/factories.ts 6 +++---; src/core/types.ts 10 +++++-----; tests/src/core/SSEParser.test.ts 40 ++++++++++++++++++++--------------------; tests/src/core/factories.test.ts 4 ++--  |  8 files changed, 55 insertions(+), 55 deletions(-)
```

Status at return (writer's reading): `applied — every gate exit 0; working tree carries exactly the eight modified files listed, nothing staged, no commit made`
Built `dist/` moves: true

## Observations

- Prose sweep, case-sensitive, criterion 1: `grep -rn '\breset\b' src tests guides` returns hits only in `guides/test.md` (lines 496, 2329, 2432, 2433). That file is the vendored `@orkestrel/test` guide mirror, named off-limits by the brief. Every hit is a different sense — a TCP peer connection reset in `waitForSocketClose`, and a counter cleared between runs inside that package — so none is a hit for this package's renamed symbol. Classified permitted, no edit.
- Prose sweep, case-insensitive across inflections: `grep -rniE '\breset(s|ting|ted)?\b' src tests guides README.md` returned one further own-file hit, `src/core/SSEParser.ts:70` ('resets `#offset` to 0' in the `#buffer` field comment). Changed to 'rewinds' for one-concept-one-term consistency with the sibling comment at :127 that the rename already touched. After that edit the same sweep returns only the four `guides/test.md` mirror hits.
- TSDoc form: typescript.md requires a third-person `-s` first sentence. I converted the imperative first sentences in the blocks the rename touched — `createSSEParser` ('Create' → 'Creates'), `isSSEError` ('Narrow' → 'Narrows'), and `SSEParserInterface.clear` ('Drop any…' → 'Drops any…'). I left the noun-phrase first sentences of the `SSEParser` and `SSEError` class blocks and of the `id` / `retry` data-property blocks as noun phrases: the rule's own examples are verb forms for callables, an accessor takes a bare noun per names.md, and converting one class block while its sibling stays a noun phrase would create the inconsistency the rule removes. Decided, recorded, carried on per the deviation contract.
- Guide table alignment: the Methods table pads every row to 286 characters. The `clear` row's new Behavior text runs 13 characters longer than the `reset` row's, so I trimmed 13 trailing spaces to hold the closing pipe on column 286. Verified by measuring all four rows.
- Centralization sweep over the touched files (references/centralization.md): no stray implementation-file declaration, no non-exported or wrong-kind centralized declaration, no nested function declaration or assignment, no wrapper, alias, or compatibility re-export introduced. `SSEParser.clear()` composes real behaviour — it drops `#buffer`, `#offset`, `#started`, `#carriage`, `#lastId`, and `#lastRetry` and calls `#clear()` — so it is not a 1:1 forward to a helper. Class order is unchanged: `#` fields, constructor, getters, public methods, `#` private methods. Barrel unchanged.
- Text integrity: every touched file decodes as UTF-8 with no replacement character, no mojibake, and no control character outside newline and tab.
- Published surface moved, as a rename always does: `dist/src/core/index.d.ts` now declares `clear(): void` on `SSEParser` (line 214) and on `SSEParserInterface` (line 252), and `grep -rn 'reset' dist/src/core/` (excluding sourcemaps) returns nothing.
- Whole-suite timing on this host: `npm test` completed with no timing-sensitive failure and no flake to carry to an authoritative re-run. Reported as an observation, not a criterion, per the brief.
- `npm run test:distribution` was not run — the brief excludes it while a dependency tarball is staged, and it is not inside `npm test`.
- No commit, stage, push, install, or discarding git command was run. `package.json` and `package-lock.json` are untouched.

## Deviations

- README.md sits in neither the brief's Owned list nor its Off-limits list, and the rename makes two of its lines false: the `@example`-equivalent `parser.reset()` in the Usage fence (line 43) and the trailing `parser.reset() // full reset - …` (line 47). README.md ships in the package's `files` array, so leaving it would publish a broken example against a surface that no longer exists. The deviation contract stops the unit only for an off-limits file, a target-name collision, two rows moving one symbol, or an unattributable gate failure — none applies — so I edited the two lines and recorded it here for the Orchestrator to rule on. The edit is `parser.reset()` → `parser.clear()` in the fence, and `parser.reset() // full reset - drops buffered state and sticky id/retry` → `parser.clear() // drops buffered state and sticky id/retry` (the trailing comment dropped the banned word rather than restating it). No other README line changed. If the Orchestrator wants README.md carried by a different unit, reverting these two lines is the whole change.
- The ledger's finding text for s18-04 names `errors.ts:17,46` as prose to update. Line 46 in that file is the `@param context` line and carries no `reset`; the real second and third hits are `errors.ts:31` (inside the `SSEError` `@example`) and `errors.ts:68` (inside the `isSSEError` `@example`). I worked from the sweep rather than the quoted line numbers and updated both. Reported so the ledger record can be corrected rather than re-derived next round.
- The brief's Execution section directs a TSDoc first-sentence rewrite for every block touched. I applied it to imperative first sentences only and left noun-phrase first sentences unchanged; the reasoning is recorded in the observations above. This is a wording decision the deviation contract assigns to the executor, not a refusal of the instruction.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/sse.diff`,
`tmp/units/breaking/sse.status`.
