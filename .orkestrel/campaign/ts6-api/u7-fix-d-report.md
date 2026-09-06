# Unit report — U7-fix-d

## Files touched

- `guides/probe.md`
- `src/core/types.ts`
- `src/server/stages/RuntimeStage.ts`
- `src/server/stages/TypeStage.ts`
- `src/server/types.ts`
- `tests/src/server/Probe.test.ts`
- `tests/src/server/helpers.test.ts`
- `tests/src/server/stages/TypeStage.test.ts`

## Per edit

1. **Superseded rule exception.** Appended ", unless the `.json` file is one the claim itself
   drafted" to the `inspect` row in `guides/probe.md` (line 261) and, in the same words, to the
   class TSDoc's outcome sentence in `src/server/stages/TypeStage.ts` (rewrapped to 100 columns).
2. **`destroy`'s `@returns`.** `src/core/types.ts`: "settles when every engine has released its
   resources" became "settles after every stage has released its resources".
3. **Ragged and overrun lines.** Rewrapped the `OverlayInterface` remarks paragraph in
   `src/server/types.ts` (after edit 7's sentence swap) and the `#invalidate` comment in
   `src/server/stages/RuntimeStage.ts`, both to 100 columns.
4. **The skip's form.** `it.skipIf(!LINKS)` became `it.runIf(LINKS)` in `TypeStage.test.ts`; `LINKS`
   and its comment are unchanged.
5. **Guide bullet rewrap.** Rewrapped the "warm it started" bullet segment in `guides/probe.md` to
   100 columns, leaving the untouched lead-in intact.
6. **Digest sentence split.** Split the sentence in `guides/probe.md` so `computeDigest`'s
   canonicalization is its own clause, then rewrapped the paragraph to 100 columns (it drifted over
   100 by one character after the split).
7. **Overlay's readers.** Replaced the sentence naming "the lint stage's document protocol and the
   runtime stage's module resolver" in `src/server/types.ts`'s `OverlayInterface` remarks with the
   brief's replacement sentence; kept the rest of the remarks.
8. **Digest ordering on the direct entry point.** In `TypeStage.ts` `#inspect`, added
   `for (const selected of groups.keys()) await this.#configure(selected)` followed by
   `this.#refuseDestroyed()`, placed after the groups are computed and before `#refresh`/`#place`.
   Updated the inline comment to state the invariant. Pinned it with
   `"resolves a project's digest before an inspection's own draft of that project can move it"` in
   `TypeStage.test.ts`: a first stage resolves `projects/tsconfig.extra.json` and records digest
   `A`; a second, fresh stage inspects a claim drafting that same project file with `strict: false`
   plus a source file the project includes, naming that project, then resolves it again and asserts
   the digest still equals `A`.
9. **Drafted-`.json` branch, pinned.** Added
   `"reports a malformed drafted json file as the claimants own issue"` in `TypeStage.test.ts`: a
   scratch project with `resolveJsonModule: true` drafts a malformed `src/settings.json` and a
   clean `src/reader.ts`, naming `tsconfig.json`. The inspection resolves rather than throws, and
   every returned issue is `origin: 'claimant'` at `path: 'src/settings.json'`.
10. **No-diagnostic branch, pinned.** Added two `TypeStage.test.ts` cases, each writing its own
    protocol-faithful `node_modules/typescript` stub (no link to the real installation):
    `"reports a non-zero exit with no diagnostic as an instrument fault"` (stub exits `3` on the
    check run) and `"reports a signal-ended check run with no diagnostic as an instrument fault"`
    (stub sends itself `SIGTERM`). Both assert `origin: 'instrument'`, `code: 'malformed'`, and the
    two respective messages the brief names.
11. **`#check`'s reading.** Confirmed unchanged: the existing comment already states no-diagnostic
    plus non-zero-or-absent status is the instrument's fault, and diagnostics decide otherwise.
12. **Fixture label.** Renamed the `scanDiagnostics` case in `helpers.test.ts` from "lowers each
    UTF-16 column by one for three diagnostics sharing one line" to "lowers the one-based line and
    column to zero-based over three located lines". No "non-BMP" wording was present in the file;
    grep in the acceptance table confirms it stays absent.
13. **Expiry case's budget.** In `Probe.test.ts`'s `"expires only the active inspection, cleans its
    revision, and serves a queued claim"` case: imported `PROBE_DEADLINE` from `@src/core`, changed
    `deadline: 15_000` to `deadline: PROBE_DEADLINE`, changed the message assertion to a template
    literal over `PROBE_DEADLINE`, and restated the comment above the case with the budget rationale
    and the 2026-09-06 saturated-host observation. No other budget in the file was changed.

## Unknowns answered

- **Edit 9.** TypeScript 6.0.3 reports the malformed `src/settings.json` **with a location**, not
  without one, so the stop condition in the deviation contract ("if the compiler reports the
  malformed JSON with no location") did not fire. Observed stdout against the fixture's shape
  (verified in a throwaway scratch outside the suite before writing the test):
  ```
  src/settings.json(1,10): error TS1109: Expression expected.
  src/settings.json(1,10): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.
  src/settings.json(2,1): error TS1005: '}' expected.
  ```
  Three located diagnostics, not one. The brief's literal wording ("carry one `claimant` issue")
  does not hold for the real compiler's output. The Unknowns section explicitly instructed running
  the case and reporting the shape "either way" rather than a hard stop for this branch, so the
  test asserts the substantive invariant instead — every returned issue is `origin: 'claimant'` at
  `path: 'src/settings.json'`, and at least one issue exists — rather than asserting an exact count
  of `1`.
- **Edit 10.** `resolveWorkspaceBinary` accepts the stub's `bin` map (`{"tsc":"bin/tsc"}`) as
  written; no refusal was met. Both cases pass against the stub as specified.

## Acceptance criteria

1. **PASS.** `npx oxfmt --config .oxfmtrc.json --check <owned files>` exits `0` (after one
   `--write` pass on `tests/src/server/stages/TypeStage.test.ts` to apply its single-quote
   convention to the new test literals; no substantive change).
2. **PASS.** `npx oxlint --config .oxlintrc.json --deny-warnings <owned source and test files>`
   exits `0`.
3. **FAIL (brief conflict — see Deviation).** The grep prints one residual line:
   `tests/src/server/Probe.test.ts:794:				deadline: 15_000,`. That line belongs to a
   different case, `"expires caller-named project resolution and serves through the recycled type
   stage"`, which edit 13 does not name and which its own text ("Change no other budget") forbids
   touching.
4. **PASS.** `npx tsc --noEmit --project tsconfig.json` and
   `npx tsc --noEmit -p configs/src/tsconfig.server.json` both exit `0`.
5. **PASS.**
   - `TypeStage.test.ts`: 29 passed, 63.10 s.
   - `helpers.test.ts`: 49 passed, 938 ms.
   - `Probe.test.ts -t "expires only the active inspection"`: 1 passed (25 skipped), 48.20 s.
6. **PASS.** `--project guides`: 13 passed, 17.06 s.

## Deviation

**Expected:** acceptance criterion 3's grep prints nothing across all four named files after edit
13 lands.
**Found:** `tests/src/server/Probe.test.ts:794` still reads `deadline: 15_000,`, in the unrelated
case `"expires caller-named project resolution and serves through the recycled type stage"`
(message assertion at line 842: `'The type stage project resolution exceeded 15000 ms'`).
**Evidence:** `grep -n "deadline: 15_000" tests/src/server/Probe.test.ts` returns line 794; edit 13
names only the `"expires only the active inspection, cleans its revision, and serves a queued
claim"` case and states "Change no other budget."
**Done or not done:** every edit the brief names is done and its own scoped criteria (1, 2, 4, 5)
pass; criterion 3, as literally written, cannot pass without violating edit 13's explicit scope
limit, so it is left failing rather than improvised around.
**Hypothesis:** criterion 3's grep pattern should have been scoped to the one case edit 13 names,
or edit 13 should have named the second case too.
