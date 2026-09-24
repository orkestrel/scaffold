All eight gates exit 0 per the retained driver log, corroborating the report's table (not writer-only).

---

# Audit round 2 (`cl`) — checker verdict, claims 1, 3, 5

## Claim 1 — Scope and delta

**CONFIRMED.**

- `cl-2-status.txt:1-2` lists exactly `tests/setupServer.test.ts` and `tests/setupServer.ts` modified — the round-1 owned pair per `b-cross-cl-brief-2.md:42` ("owned `tests/setupServer.ts` and `tests/setupServer.test.ts`"). No other path appears.
- The shared-file set is identical across rounds: both `cl-shared.patch` and `cl-shared-2.patch` touch exactly `guides/veneer.md`, `tests/conformance.test.ts`, and `tests/setupStyles.test.ts` (`Grep` diff-header comparison, both files, same three paths at matching line offsets).
- Diffing the two patches' `tests/conformance.test.ts` and `tests/setupStyles.test.ts` hunks byte-for-byte (`cl-shared.patch:112-289` vs `cl-shared-2.patch:366-541`) shows identical content **except** one added hunk unique to round 2: `cl-shared-2.patch:406-414`, which renames the `it(...)` title from `"carries every shipped component selector and custom property in the built cascade"` to `"carries every shipped component selector, custom property, and recorded animation in the built cascade"`. Round 1 carried no such hunk.
- `guides/veneer.md`'s hunks differ substantially between rounds (round 2 rewrites the § Files row, § Keyframes routing sentence, and § Additions `Category` sentence, and reflows the table — `cl-shared-2.patch:142-257`, `315-324`, `339-345`).
- Net: against round 1, the shared patch changes only `guides/veneer.md` and the conformance case title. Matches the claim exactly.

## Claim 3 — L-b: the TSDoc and the title

**CONFIRMED**, on the sites read.

- `ConditionRow` TSDoc (`/home/user/veneer-cl/tests/setupServer.ts:60-75`): "The `condition` member holds...", "the `recorded` member the form...", "The `recorded` member is undefined...", "The `writer` member names..." — every member token carries its noun.
- `KeyframesRow` TSDoc (`tests/setupServer.ts:77-89`): "The `component` member holds...", "the `motion` member holds..." — noun-carried.
- `OracleInventory` TSDoc (`tests/setupServer.ts:316-328`): "The `media` member carries each media condition..." — noun-carried.
- `Addition` TSDoc (`tests/setupServer.ts:118-135`): "The `name` member is...", "The `condition` member holds..." — noun-carried; the `keyframes`-addition clause is gone, consistent with L-c.
- Case title: `grep` for the old title `"carries every shipped component selector and custom property in the built cascade"` across `/home/user/veneer-cl` finds it only inside `cl-shared-2.patch`'s removed (`-`) line (`cl-shared-2.patch:410`) — nowhere else, including the live worktree file `tests/conformance.test.ts:95` where it still stands unpatched because the shared file is report-only and the patch has not been applied there. The new title string does not yet exist anywhere, which is expected: it ships only through the unapplied `cl-shared-2.patch`. Read as "does the patch, once applied, leave the old title nowhere and the new title naming the recorded animations," this is CONFIRMED from the patch text itself (`cl-shared-2.patch:410-411`).
- Scope note: I read only the four named types (`ConditionRow`, `KeyframesRow`, `OracleInventory`, and `Addition`, the last only because the brief's L-c also touches it) plus the case title. I did not walk every helper doc-comment the report claims was touched (`renderBreakpointTemplate`, `expandConditions`, `collectMediaFeatures`, `normalizeMediaFeature`, `normalizeMediaCondition`); those remain unread by me and are UNRESOLVED against this claim's "every member token" scope, though they fall outside the three named types the brief specifies.

## Claim 5 — Law and report

**CONFIRMED**, on the sites read.

- Syntax ban: grepped `cl-2.diff` and `cl-shared-2.patch` for `any`, `as <Type>`, `!.`, `@ts-*`, `eslint-disable`. Every `as` hit is prose ("as its," "as the," "as in") or TSDoc, never a type assertion; no `any`, `!.`, suppression comment, or nested function declaration found in either file.
- Report quotes each gate's result line from its own retained log, verified independently against the actual log files rather than trusting the report:
  - `format:check` → `cl-gate-round2-format-check.log.txt:7-8` matches report line 250.
  - `lint:check` → `cl-gate-round2-lint-check.log.txt` (empty stdout, exit recorded separately) matches report line 251.
  - `check` → `cl-gate-round2-check.log.txt` (no diagnostics) matches report line 252.
  - `build:src` → `cl-gate-round2-build-src.log.txt:53,56` (`dist/src/styles/index.css 241.54 kB │ gzip: 30.05 kB`, `✓ built in 2.09s`) matches report line 253.
  - `test:setup` → `cl-gate-round2-test-setup.log.txt:32` (`Tests  295 passed (295)`) matches report line 254.
  - `test:conformance` → `cl-gate-round2-test-conformance.log.txt:11` (`Tests  24 passed (24)`) matches report line 255.
  - `test:guides` → `cl-gate-round2-test-guides.log.txt:11` (`Tests  19 passed (19)`) matches report line 256.
  - `test:policy` → `cl-gate-round2-test-policy.log.txt:11` (`Tests  109 passed | 1 skipped (110)`) matches report line 257.
  - `cl-gates-round2.log.txt:2,10,16,24,32,40,48,56` records `exit 0` for all eight commands.
- No temporal word (`currently`, `now`, `new`, `latest`, `soon`, `should`) found in report prose; the one `new` hit (line 162) is inside a fenced `throw new Error(...)` code sample, exempt per `.claude/rules/writing.md` § Substitutions ("A literal code identifier is data... quote each as itself").
- Code-token-then-noun: sampled report prose (e.g., "the `cl-2.diff` file", "the `git status --short` output") follows the token-noun rule at every site read.
- Counts the report states, listed (numeric values that appear in the report, all cited from a run rather than asserted as growable-set tallies): diffstat `2 files changed, 822 insertions(+), 60 deletions(-)` (owned) and `guides/veneer.md 330`, `tests/conformance.test.ts 122`, `tests/setupStyles.test.ts 1` (shared); gate results `Tests 295 passed (295)` (test:setup), `Tests 24 passed (24)` (test:conformance), `Tests 19 passed (19)` (test:guides), `Tests 109 passed | 1 skipped (110)` (test:policy); mutation-run tallies `Tests 4 failed | 291 passed (295)` (R1), `1 failed | 294 passed (295)` (P1–P3), `1 failed | 23 passed (24)` (P4), `2 failed | 22 passed (24)` (P5); build sizes `dist/src/styles/index.css 241.54 kB │ gzip: 30.05 kB`; format timing `10441ms on 415 files using 4 threads`; column limit `100`. All eight gate exit codes are `0`.

## Findings outside the claims

BROKEN, not covered by claims 1/3/5 but discovered while reading the evidence they cite: none found within the files this checker actually read (`cl-2.diff`, `cl-2-status.txt`, `cl-shared.patch`, `cl-shared-2.patch`, `b-cross-cl-brief-2.md`, `b-cross-cl-report-2.md`, the round-2 `cl-instruments/` logs read above, and the worktree TSDoc sites cited).

VERDICT: PASS