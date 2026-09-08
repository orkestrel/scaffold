# Report — `d7n-rater-prep`

Wall clock: 2026-09-07T21:11:29Z to 2026-09-07T21:15:56Z.

## Item 1 — `repair --offline`

```text
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` after: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` modified; `scripts/docs.ts` untracked — the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Methods loop:

```diff
-		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+		for (const group of guide.methods()) {
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
 		}
```

Examples case and examples loop:

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})

 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change to `tests/guides.test.ts`. `npm run format` ran after editing (`Finished in 3148ms on 44 files`); it did not further alter this file's content.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 reported 15 `policy(no-malformed-summary)` diagnostics, every one in `tests/setup.ts` (lines 36, 43, 60, 73, 85, 90, 97, 102, 115, 128, 144, 154, 195, 205, 221) and no `policy(no-banned-term)` diagnostic — matching the standing conditions' total 15 | summary 15 | banned 0 | tests/setup.ts(15). `tests/setup.ts` sits under `tests/**`, in scope; no diagnostic named an off-limits file.

Per diagnostic, before/after:

- line 36: `A recorder shaped for a {@link TotalHandler} — records the lines it was called with and returns a fixed sentinel.` → `Records the lines it was called with and returns a fixed sentinel, shaped for a {@link TotalHandler}.`
- line 43: `Build a {@link TestTotalRecorderInterface} that always resolves to \`sentinel\`.` → `Builds a {@link TestTotalRecorderInterface} that always resolves to \`sentinel\`.`
- line 60: `` Recursively `Object.freeze` a value and every object/array it reaches. `` → `` Freezes a value and every object or array it reaches, through repeated `Object.freeze` calls. ``
- line 73: `` Finite numbers whose accumulation overflows to `Infinity`. `` → `` Lists finite numbers whose accumulation overflows to `Infinity`. ``
- line 85: `` A minimal rating subject: `id` and `seats`, overridable. `` → `` Builds a minimal rating subject carrying `id` and `seats`, overridable. ``
- line 90: `` A quantitative definition that always resolves to `value`, regardless of the subject. `` → `` Builds a quantitative definition that always resolves to `value`, regardless of the subject. ``
- line 97: `` A line whose rate always resolves to `value` — for line-selection and dispatch proofs. `` → `` Builds a line whose rate always resolves to `value` — for line-selection and dispatch proofs. ``
- line 102: `` A quantitative definition rating `base` (100) plus `seats`, with a checked field factor. `` → `` Builds a quantitative definition rating `base` (100) plus `seats`, with a checked field factor. ``
- line 115: `` A line whose required lookup factor fails: the subject's `region` is absent from the table and has no fallback. `` → `` Builds a line whose required lookup factor fails: the subject's `region` is absent from the table and has no fallback. ``
- line 128: `` A line whose required factor fails its own check (subject `age` never clears the threshold). `` → `` Builds a line whose required factor fails its own check (subject `age` never clears the threshold). ``
- line 144: `` The shared reasoning engine a {@link RaterOptions.engine} is injected with — quantitative-only unless `logical` is requested. `` → `` Builds the shared reasoning engine a {@link RaterOptions.engine} is injected with — quantitative-only unless `logical` is requested. ``
- line 154: `` A {@link ReasonInterface} whose `reason()` always resolves to the result it was built with. `` → `` Implements a {@link ReasonInterface} whose `reason()` always resolves to the result it was built with. ``
- line 195: `` A minimal, hostile-input-friendly {@link ReasonInterface} stub whose `reason()` always resolves to the caller-supplied `result` — for exercising `Rater`'s defensive handling of an untrusted injected engine. Every other member is a minimal conforming no-op. `` → `` Builds a minimal, hostile-input-friendly {@link ReasonInterface} stub whose `reason()` always resolves to the caller-supplied `result` — for exercising `Rater`'s defensive handling of an untrusted injected engine. Every other member is a minimal conforming no-op. ``
- line 205: `` A minimal, type-shaped {@link Worksheet} stub — for line results that never touch the real engine. `` → `` Builds a minimal, type-shaped {@link Worksheet} stub — for line results that never touch the real engine. ``
- line 221: `` A minimal `LineResult` carrying only `amount` — for `sumAmounts` edge cases. Its worksheet mirrors the real rating path: `worksheet.success` is `true` exactly when an `amount` is supplied. `` → `` Builds a minimal `LineResult` carrying only `amount` — for `sumAmounts` edge cases. Its worksheet mirrors the real rating path: `worksheet.success` is `true` exactly when an `amount` is supplied. ``

No code token moved and no assertion changed; only the description paragraph's opening was rewritten and every fact each paragraph carried was kept. `npx oxlint --config .oxlintrc.json --deny-warnings .` after these edits produced no output (exit 0). `npm run test:policy` after item 1 (before these edits) already read 90 passed | 1 skipped (91), exit 0, with no `prose` rule failure naming a line in `guides/**` or `README.md`; no further edit was needed for that rule.

## Item 4 — the bump

`package.json`: `"version": "0.0.13"` → `"version": "0.0.14"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3, the 15 voice-site edits listed above); `package.json` was already in the repair list and now also carries the version bump.

2. `npm run format:check` → `All matched files use the correct format.` exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings .` → no output, exit 0. `npm run check` → both `tsc --noEmit --project tsconfig.json` and `check:src:core` completed with no diagnostic, exit 0.

3. `npm run test:guides` → `Test Files  1 passed (1)` / `Tests  26 passed (26)`, exit 0. `npm run test:policy` → `Test Files  1 passed (1)` / `Tests  90 passed | 1 skipped (91)`, exit 0. `npm run test:config` → `Test Files  1 passed (1)` / `Tests  172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` → exit 1, `rows read: 1, disagreements found: 43`. Worklist, verbatim:

```text
guides/rater.md type Stage: guide absent source "Names a worksheet derivation step stage."
guides/rater.md type RaterErrorCode: guide absent source "Names a coded `RaterError` programmer-error code."
guides/rater.md type TotalHandler: guide absent source "Represents a pure total port over resolved lines."
guides/rater.md interface LineDefinition: guide absent source "Represents one rateable line — a quantitative definition joined to display metadata."
guides/rater.md interface RatingDefinition: guide absent source "Represents a pure authored rating — a named, ordered set of lines."
guides/rater.md interface Evidence: guide absent source "Represents a checked-evidence row rendered into a display-neutral sentence."
guides/rater.md interface WorksheetFactor: guide absent source "Represents a resolved quantitative factor, joined to its authored metadata."
guides/rater.md interface WorksheetGroup: guide absent source "Represents a resolved quantitative group, joined to its authored metadata."
guides/rater.md interface Step: guide absent source "Represents a display-neutral worksheet derivation step."
guides/rater.md interface Worksheet: guide absent source "Represents a quantitative definition joined to its result — the rating audit trail."
guides/rater.md interface LineResult: guide absent source "Represents one line's rating outcome."
guides/rater.md interface RatingResult: guide absent source "Represents a rated outcome across every line of one `rate` call."
guides/rater.md type RaterEventMap: guide absent source "Represents the push observation surface of a `RaterInterface`."
guides/rater.md interface RaterOptions: guide absent source "Configures `createRater` and the `Rater` constructor."
guides/rater.md interface RaterInterface: guide absent source "Represents the rating orchestrator over the shared quantitative reasoning engine."
guides/rater.md class RaterError: guide "Carries a `RaterErrorCode` (`DEFINITION` / `MISMATCH` / `DESTROYED`) + optional `context`." source "Represents a coded programmer error thrown by the rating layer."
guides/rater.md function isRaterError: guide "Narrow a caught value to a `RaterError`." source "Narrows a caught value to a `RaterError`."
guides/rater.md const isStage: guide absent source "Determines whether a value is a `Stage` literal."
guides/rater.md function isLineDefinition: guide absent source "Determines whether a value is an exact `LineDefinition` record."
guides/rater.md function isRatingDefinition: guide absent source "Determines whether a value is an exact `RatingDefinition` record."
guides/rater.md function isEvidence: guide absent source "Determines whether a value is an open result-side `Evidence` object."
guides/rater.md function isWorksheetFactor: guide absent source "Determines whether a value is an open `WorksheetFactor` result object."
guides/rater.md function isWorksheetGroup: guide absent source "Determines whether a value is an open `WorksheetGroup` result object."
guides/rater.md function isStep: guide absent source "Determines whether a value is an open `Step` result object."
guides/rater.md function isWorksheet: guide absent source "Determines whether a value is an open `Worksheet` result object."
guides/rater.md function isLineResult: guide absent source "Determines whether a value is an open `LineResult` object."
guides/rater.md function isRatingResult: guide absent source "Determines whether a value is an open `RatingResult` object."
guides/rater.md function buildLineDefinition: guide "Build a `LineDefinition` from id / name / rate (`overrides` merged over the defaults)." source "Builds a `LineDefinition`."
guides/rater.md function buildRatingDefinition: guide "Build a `RatingDefinition` from id / name / lines (`overrides` merged over the defaults)." source "Builds a `RatingDefinition`."
guides/rater.md function buildEvidence: guide "Build an `Evidence` row from an evaluated `Check`." source "Builds an `Evidence` row from an evaluated `Check`."
guides/rater.md function buildEvidenceRows: guide "Build one evidence row per authored check of a quantitative factor, joined to its result." source "Builds one evidence row per authored check of a quantitative factor, joined to that check's evaluated result."
guides/rater.md function buildWorksheetFactor: guide "Join one authored quantitative factor to its evaluated `FactorResult`." source "Joins one authored quantitative factor to its evaluated `FactorResult`."
guides/rater.md function buildWorksheetGroup: guide "Join one authored quantitative group to its evaluated `GroupResult`." source "Joins one authored quantitative group to its evaluated `GroupResult`."
guides/rater.md function buildWorksheetStep: guide "Build one display-neutral `Step` row." source "Builds one display-neutral `Step` row."
guides/rater.md function buildWorksheetSteps: guide "Build the ordered `Step` rows for a resolved `Worksheet`." source "Builds the ordered `Step` rows for a resolved `Worksheet`."
guides/rater.md function buildWorksheet: guide "Join a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail." source "Joins a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail."
guides/rater.md function buildLineResult: guide "Build a rated `LineResult` from a line's evaluated `QuantitativeResult`." source "Builds a rated `LineResult` from a line's evaluated `QuantitativeResult`."
guides/rater.md function sumAmounts: guide "Sum defined line amounts." source "Sums defined line amounts."
guides/rater.md function createRater: guide absent source "Creates a rating orchestrator."
guides/rater.md class Rater: guide "The rating orchestrator — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary." source "Orchestrates rating — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary."
guides/rater.md RaterInterface.rate: guide absent source absent
guides/rater.md RaterInterface.destroy: guide absent source absent
guides/rater.md pitch: readme absent tagline "A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored lines — each a plain reason `QuantitativeDefinition` joined to display metadata — are rated against a subject (a plain data record) to produce a `LineResult` per line (an `amount` plus its `Worksheet` audit trail) and one `RatingResult` (every line's outcome plus a derived `total`). The caller decides WHICH lines to rate for a subject — `Rater` only rates the lines it is given and reports what each one resolved to; it performs NO evaluation arithmetic of its own. Rating never mutates its inputs: every result is a fresh object. `Rater` either receives an injected `ReasonInterface` (never destroyed by `Rater`) or builds and OWNS its own quantitative-only engine (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch a quantitative definition — one it cannot dispatch surfaces the engine's own error, never wrapped by this package. Every `rate` call fires once through `Rater`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 43
```

This worklist matches P21's reading exactly and is the converge unit's to close.

---

Orchestrator's annotation (2026-09-08, from the audit verdict): this report states counts in prose; the tree is authoritative and every cited line matched it on the audit's re-read (rater's converge report also misstates the pilot's header as still reading `below`, and its diffstat reads one insertion past the committed tree). The unit's instruments are retained under `instruments/d7/units/`.
