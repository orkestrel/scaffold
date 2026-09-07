Lane held: checker pool

## Claim rulings — pool (claims 27–39; console and markdown claims are outside this lane)

**27 — PASS.** `d7n-pool-prep.status.txt` and `d7n-pool-prep.diff.txt` list exactly: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package-lock.json`, `package.json`, `tests/config.test.ts`, `tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, plus untracked `scripts/docs.ts` — the P21 repair list plus `tests/guides.test.ts` (item 2) plus `tests/setup.ts` (item 3's voice fix). `package.json`'s diff (`d7n-pool-prep.diff.txt:1605-1626`) shows only the `version` bump and the `docs` script row; the `@orkestrel/guide` devDependency range is untouched, confirming no `@orkestrel/*` range moved. `package-lock.json`'s diff shows the root `version` bump plus dropped extraneous subtree entries (`@jridgewell/gen-mapping`, `remapping`, `resolve-uri`, `trace-mapping`, `@rollup/pluginutils`, `vite-plugin-dts`).

**28 — PASS.** The `tests/guides.test.ts` hunk in the prep report (and matching diff) shows `members`/`documented` bound with `.map((method) => method.name)`, `findMissing` calls converted to use `documented`, the examples-loop `documented` bound once above its `describe`, and the shape matches `/home/user/fleet/abort/tests/guides.test.ts:147-155` verbatim outside the package's own constants. The already-string `findMissing` calls were left untouched. The P.1 report quotes `test:guides`: `Tests 25 passed (25)`.

**29 — PASS.** The only voice/prose-sweep edit in `11509e9` is `tests/setup.ts` (`d7n-pool-prep.diff.txt:2377-2393`): both rewrites keep every fact (`{@link PoolEventMap}`, "every Pool lifecycle event"), open with a third-person verb (`Names`, `Lists`) without naming `PoolEvent`/`POOL_EVENTS` in the first sentence, move no code token, and change no assertion.

**30 — PASS.** `guides/pool.md` tables head `Summary` beside only `Kind`/`Returns` (verified in the tree: lines 39, 45, 52, 60, 83, 93). `### Entities` became `### Classes` (line 43). Neither `Pool` nor `PoolError` is documented under its own H3 in this guide, so no additional `### Classes` row was owed — consistent with the heading list (no `#### Pool` or `#### PoolError` heading exists). No table carries a `Shape` column, so the `Shape`-idiom clause is inapplicable (vacuously true).

**31 — PASS.** Sampled every Types/Surface/Methods row (`createPool`, `Pool`, `PoolError`, `isPoolError`, `isPoolMax`, `isPoolSignal`, `PoolCode`, `PoolContext`, `PoolErrorOptions`, `PoolEventMap`, `PoolToken`, `PoolOptions`, `PoolInterface`, `PoolInterface.acquire/clear/destroy`, `PoolToken.release`): every fact the pre-P.2 cell carried is present in the current cell/block, including `isPoolSignal`'s "acquire boundary" fact, which the report correctly locates at `## Contract` § Cancellation (`guides/pool.md:130`, "`acquire` validates a native `AbortSignal` before queueing"). `PoolOptions`'s `@remarks` (`src/core/types.ts:66-70`) states per-key behavior, not a repeat of the new description's topic list — no restatement.

**32 — PASS.** Exactly one titled `@example` in the package: `src/core/factories.ts:20` (`@example Create a pool`); `errors.ts`, `Pool.ts`, `validators.ts` remain untitled (confirmed by grep). The heading `### Create a pool` occurs once (`guides/pool.md:17`). The fence body (lines 20-35) equals the `@example` body in `factories.ts:21-37` character-for-character; no triple-backtick run or `*/` inside.

**33 — PASS.** `guides/pool.md:3-5` and `README.md:3-5` carry the identical noun-phrase blockquote, same line breaks, no link, no bold. The guide's opening prose (`:7-9`, "no warm floor...") and the README's opening paragraph (`:7-11`, onboarding) each carry only their own displaced/onboarding content — neither restates a tagline clause.

**34 — PASS.** The equality case (`tests/guides.test.ts:182-190`) sits inside `describe(entry.concept)` after the methods loop. The pin (`:73-95`) sits at file scope with the pilot's guard-and-continue shape and no local type predicate, both-sides failure line included. The README case (`:102-111`) carries two `not.toBeUndefined()` guards before `toBe`. `README.md` is in `ROOT_FILES` (`:46`); `GUIDE_SPEC` names the spec (`:32`). Every test name states what it proves. The converge report records all three red on the unconverged tree with failing lines (report `:33-59`) and green after (report `:183`, `Tests 28 passed (28)`).

**35 — PASS.** Every `src/**` diff hunk sits inside a doc block; no code token moved (confirmed against `d7n-pool-converge.diff.txt` and the current tree). No `{@link}` flattening or `@remarks` repeat occurred (`--to source` wrote nothing: `written: 0`). Baseline comparison in the report reads "non-final cells mismatched: 0" (all tables have `Summary` as the final column, so this covers every non-`Summary` cell). `guides/pool.md:247-265` carries a `## Tests` section naming the equality gate descriptively, no SQ/MQ/EQ/RQ identifier. The titled heading reads as a demonstration. No all-caps emphasis found by grep in either owned Markdown file; the "one"/"both" occurrences in `guides/pool.md` are cardinality/timing values, not counts of a growable set.

**36 — PASS.** `d7n-pool-converge.status.txt` and `.diff.txt` list exactly `README.md`, `guides/pool.md`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts` — matching the claim exactly.

**37 — PASS.** The converge report quotes, from runs: `npm run docs` → `rows read: 1, disagreements found: 0` exit 0; `--to guide` and `--to source` → `written: 0, reported: 0`; `oxfmt --check`, `oxlint`, `check`, `test:guides` (`Tests 28 passed (28)`), `test:policy` (`Tests 90 passed | 1 skipped (91)`) all exit 0.

**38 — FAIL.** Both reports state counts in prose, which the substitution/count ban in `AGENTS.md` § Writing forbids:
- Prep report (`d7n-pool-prep-report.md:241`): "P21's five `TS2345` failures and seven test failures are gone" — two stated counts of failure sets.
- Prep report (`:114-116`): "The two already-strings `findMissing` calls" — a count of a callable population.
- Converge report (`:11`): "Seven description paragraphs rewritten" — a count of the rewritten-row population (the table beneath it enumerates the same population without needing the number).
- Converge report (`:89,90,92`): "The four code literals", "Its two alternatives", "The four event names" — counts of literal/alternative/event-name populations.
These are not measurements reported with the run that produced them (the writing rule's sole exemption); they are prose counts of enumerable sets and fail the report-honesty half of this claim. Separately, three file:line citations in the converge report's Criterion 1 (`tests/guides.test.ts:94`, `:108`, `:189`) do not match the current committed tree (the same tests sit at `:73`, `:102`, `:182`); no intermediate tree snapshot is retained to confirm whether these matched the tree at the moment cited, so this sub-part is **CANNOT RULE** rather than an independent FAIL basis — the count violations alone are sufficient evidence.

**39 — PASS (vacuous).** Both reports name no reader or seed defect (converge report: "## Reader and seed defects met — None."; prep report names none). Nothing to rule as blocking or not.

## Findings outside the claims

- The converge report's Criterion 1 file:line citations (`tests/guides.test.ts:94`, `:108`, `:189`) do not resolve against the final committed tree (actual lines `:73`, `:102`, `:182`). Right look: cite line numbers only against a retained snapshot (or state "line numbers as of the pre-Ruling-13-alignment tree, not retained") so a reader can verify a red-first citation without reconstructing intermediate history.
- The count violations in both pool reports are a repeatable-process gap: a report describing "N items changed" or "N failures gone" should name the changed items themselves (already done via the accompanying table/diff) and drop the cardinal number, per `AGENTS.md` § Writing.

VERDICT: FAIL 38
