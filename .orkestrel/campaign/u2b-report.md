Unit complete. All four acceptance criteria close; one deviation from the ruling's literal guard shape, recorded below with its evidence and the successor patch.

## Files touched

- `/home/user/orkestrel/html/tests/src/core/helpers.test.ts` — table-size assertion relocated beside the entity audit; the wall-clock decoder test replaced by an exact-value decode test; guarded bench block appended.
- `/home/user/orkestrel/html/tests/src/core/parsers.test.ts` — five wall-clock tests in the hostile-corpus describe replaced by structural tests; guarded bench block appended.

No other file written. No commit, install, or tree-wide mutating command run.

## Per-test before → after

`helpers.test.ts`

| Before | After | Retained/gained assertions |
| --- | --- | --- |
| `audits every security-relevant generated entity value against the reviewed set` | same name | gained `expect(Object.keys(NAMED_ENTITIES)).toHaveLength(2_125)` as its population guard (the ruled relocation); existing `controls` and `punctuation` membership assertions unchanged |
| `stays subquadratic under recognized, unknown, and nested entity pressure` | `decodes large recognized, unknown, and nested entity inputs to their exact values`, timeout `30_000` | recognized → `toBe('\u2242\u0338'.repeat(80_000))`; unknown → `toBe(unknown)` (unchanged); nested → `toBe('&amp;'.repeat(80_000))` (single pass). Every `performance.now()` reading, ratio assertion, total-ms ceiling, and the unasserted 1,000-repeat warmup deleted |

`parsers.test.ts` (all five carry timeout `30_000`)

| Before | After | Assertions |
| --- | --- | --- |
| `parses a large repeated raw-element input within a linear-time bound` | `parses 15,000 repeated raw elements into one empty script element each` | children length 15,000 (retained); children `[0]` and `[14_999]` deep-equal the script element shape (gained); `isHTMLDocument` true (gained) |
| `scales linearly through close soup after the depth overflow boundary` (asserted only elapsed time) | `caps a 24,000-deep open run at MAX_DEPTH and discards the unmatched closes after it` | `measureHTMLDepth` = `MAX_DEPTH`; children length 1; `isHTMLDocument` true — all gained |
| `keeps unmatched close lookup linear with a full open-element stack` | `discards 100,000 unmatched closes against a full open-element stack` | `isHTMLDocument` true (retained); `measureHTMLDepth` = `MAX_DEPTH` and children length 1 (gained) |
| `scales linearly through a start tag with many quoted attributes` (asserted only elapsed time) | `collapses 192,000 duplicate quoted attributes to one first-wins attribute` | `element.name` = `'x'`; `element.attributes` = `[{ name: 'a', value: '' }]`; children length 1; `isHTMLDocument` true — all gained |
| `scales linearly through mixed attribute, raw-element, and close-soup pressure` | `parses mixed attribute, raw-element, and close-soup pressure into its documented shape` | `isHTMLDocument` true (retained); children length 20,002 and `measureHTMLDepth` = `MAX_DEPTH` (gained) |

Bench blocks, one per file at the end, guarded by `if (import.meta.env.MODE === 'benchmark')`, inputs built inside the guard, no baseline committed: `helpers.test.ts` carries the recognized 40,000/80,000, unknown 30,000/60,000, and nested 40,000/80,000 pairs; `parsers.test.ts` carries close-soup 12,000/24,000, stray-close 50,000/100,000, attribute 96,000/192,000, mixed 10,000/20,000, and the single 15,000 raw-element input (the deleted raw-element test had no pair, and I invented none).

## Literals read from red runs

Each was written as a placeholder first and pinned from the failure's received value. Red counts: 5 failed / 41 passed, then 1 failed / 45 passed, then green (`parsers.test.ts`); 1 failed, three rounds, then green (`helpers.test.ts`).

- `{ category: 'element', name: 'script', attributes: [], children: [{ category: 'text', value: '' }] }` — an empty raw body keeps an empty text child, which derivation would have missed.
- `measureHTMLDepth` = `64` for both the 24,000-deep run and the full-stack run; children length `1` for each.
- attribute element `name` = `'x'`, attributes `[{ name: 'a', value: '' }]`, children length `1`.
- mixed input children length `20002`, depth `64`.
- recognized decode length `160000`, leading code points `['2242','338','2242','338']` → `'\u2242\u0338'` per reference.
- nested decode length `400000`, received prefix `'&amp;&amp;…'` → `'&amp;'.repeat(80_000)`.

## Gate tails

```
oxfmt --check tests/src/core/helpers.test.ts tests/src/core/parsers.test.ts → All matched files use the correct format.
oxlint --deny-warnings (same two files) → exit 0, no diagnostics
npm run check:src:core → exit 0
npm run test:src:core → Test Files 7 passed (7) | Tests 282 passed (282) | Duration 1.69s
npm run test:policy (extra, not required) → Test Files 1 passed (1) | Tests 93 passed (93)
npm run test:bench → exit 0; ✓ |probe| tests/src/core/helpers.test.ts 4075ms (6 benches)
                              ✓ |probe| tests/src/core/parsers.test.ts (9 benches)
```

Observed durations behind the timeout comments, scoped `test:src:core` runs on 2026-08-24: decoder test 101–116 ms; the five parser tests 25–137 ms. Both comments name that basis and state that 30 s catches a hang rather than grading the parse.

```
 tests/src/core/helpers.test.ts |  84 +++++++++++++----------
 tests/src/core/parsers.test.ts | 152 +++++++++++++++++++++++++----------------
 2 files changed, 142 insertions(+), 94 deletions(-)

 M tests/src/core/helpers.test.ts
 M tests/src/core/parsers.test.ts
```

## Deviation: the guard holds `bench` calls directly, not a `describe`

Expected, from the binding design: `if (import.meta.env.MODE === 'benchmark') { describe(..., () => { bench(...) }) }`.

Found: that shape fails the repository's own lint gate.

```
tests/src/core/helpers.test.ts:1267:1: error vitest(no-conditional-tests): Avoid having conditionals in tests help: Remove the surrounding if statement.
tests/src/core/parsers.test.ts:428:1: error vitest(no-conditional-tests): Avoid having conditionals in tests help: Remove the surrounding if statement.
```

The rule arrives through the `correctness` category in `.oxlintrc.json`, which is a scaffold-vendored path (`WORKSPACE_OWNED_PATHS` excludes it; `src/core/constants.ts` lists `.oxlintrc.json` in the vendored inventory), so it is off-limits here and unfixable inside html.

Two alternatives measured and rejected:

- `describe.runIf(BENCHMARKING)(...)` lints clean but the factory still runs in test mode, so `bench()` throws and the whole file collects nothing: `Tests no tests`, `Test Files 1 failed (1)`.
- An early `if (import.meta.env.MODE !== 'benchmark') return` inside the describe lints clean and leaves an empty suite: `Error: No test found in suite parseDocument hostile input growth`.

Adopted: the exact ruled guard expression with bare `bench` calls inside it, which lints clean, stays inert in test mode, and collects under `test:bench` (evidence above). The only loss is the group label in the bench report; each bench name now carries its subject (`parseDocument — …`, `decodeEntities — …`). I judged the grouping ancillary and the guard expression load-bearing, and carried on.

Successor patch for the Orchestrator, report-only, both targets in `/home/user/scaffold` (vendored):

- Recommended, no lint weakening: amend `.claude/rules/tests.md` § Probes, bench bullet, to state the shape that works — after "…behind the `if (import.meta.env.MODE === 'benchmark')` guard." add: "Call `bench` directly inside the guard. A `describe` inside it trips `vitest/no-conditional-tests`, and a suite the guard leaves unregistered fails test mode with `No test found in suite`."
- Alternative, if the `describe` grouping is wanted fleet-wide: add an override to `.oxlintrc.json` with `"files": ["tests/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}"]` and `"rules": { "vitest/no-conditional-tests": "off" }`. This also stops the rule catching genuine conditional tests, so I do not recommend it.

Two further observations, neither acted on: `NAMED_ENTITIES` size is now asserted in two tests in `helpers.test.ts` — the pre-existing exhaustive-decode test at line 63 and the audit test the ruling moved it to; the reconciliation's membership-strength question for that table stays open for html's ROADMAP. No guide prose claims the deleted timing behaviour (`guides/` carries no `subquadratic` or html timing claim), so no prose carrier is needed.