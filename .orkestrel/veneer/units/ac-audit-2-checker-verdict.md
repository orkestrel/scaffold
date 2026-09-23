# Checker verdict — ACCORDION (`ac`) audit round 2, claims 1, 7, 8

## Claim 1 — Delta and scope: CONFIRMED

- `ac-2-status.txt:1-4` lists exactly `app/browser/sections/AccordionSection.ts`, `src/styles/components/_accordion.scss`, `tests/app/browser/sections/AccordionSection.test.ts`, `tests/src/styles/components/accordion.test.ts`, all `??` (untracked), nothing else.
- `ac-2.diff` changes exactly those four files (`diff --git` headers at lines 1, 27, 210, 399); `accordion.test.ts` (lines 399-898) and `AccordionSection.ts` (lines 1-26) match the round-1 report's description of "unchanged from round 1" — no round-2-only content found in either, and the report's own § Touched files (`b-collapse-ac-report-2.md:288-291`) states this explicitly.
- `ac-shared-2.patch` touches exactly the fourteen files round 1's patch touched (`Grep` over both patches' `diff --git`/`index` lines): `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/_tokens.scss`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`.
- Every `index` line's base hash (left side) is byte-identical between round 1's and round 2's patch for every file — confirms base equals `a658879`'s blob as round 1 established.
- The eight files claimed carried "unchanged" from round 1 (`Showcase.ts`, `app/browser/index.ts`, `_tokens.scss`, `src/styles/index.scss`, `Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`) were read hunk-by-hunk against round 1's patch and are byte-identical (verified `ac-shared-2.patch` lines 1-20, 68-77, 246-290, 291-302, 303-328, 329-342, 422-461, 502-513 against the matching round-1 ranges).
- No line in the patch or `ac-2.diff` touches a vendored file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, `ROADMAP.md`, or `tests/src/styles/theme.test.ts` — confirmed by the full file list (fourteen shared plus four owned, nothing else).

## Claim 7 — The gates: CONFIRMED

Every log named in the claim was opened and its result line matches the report and claim exactly:

- `logs/final-format-check.log.txt:7` — `All matched files use the correct format.`, exit 0 (script header shows `format-check exit=0`).
- `logs/final-lint-check.log.txt` — clean run, exit 0.
- `logs/final-check.log.txt` — full `tsc`/`vue-tsc` chain, no error output, exit 0.
- `logs/final-build-src.log.txt` — three `vite build` invocations complete, `✓ built in …`, exit 0.
- `logs/final-accordion.log.txt:78` — `Tests  30 passed (30)`.
- `logs/final-section.log.txt:7` — `Tests  4 passed (4)`.
- `logs/final-test-setup.log.txt:32` — `Tests  254 passed (254)`.
- `logs/final-test-conformance.log.txt:11` — `Tests  22 passed (22)`.
- `logs/final-test-guides.log.txt:11` — `19 passed (19)`.
- `logs/final-test-policy.log.txt:11` — `Tests  109 passed | 1 skipped (110)`.
- `logs/final-test-app.log.txt:11` — `Tests  80 passed (80)`.
- `logs/final-chain.log.txt:1-13` corroborates every one of the preceding result lines in one series run, plus the journey observation `journey-light-1280 exit=0 Tests  41 passed (41)`.
- `logs/wt-format-check.log.txt`, `logs/wt-lint-check.log.txt` both exit 0; `logs/wt-check.log.txt` exits with the `TS2305`/`TS2724`/`TS7006`/`TS7031`/`TS2345`/`TS2347` diagnostics named in D1, all naming the missing `ACCORDION_*` exports the shared patch alone adds — matches the D1 deviation text verbatim.

Mutation to falsify claim 7: any of these commands returning a non-matching count or a nonzero exit where the report claims 0 would break it. The retained logs are direct captured stdout of the named commands (headers show the `npm run` invocation), not restated prose, so this is a run reading rather than a structural description — the check distinguishes a real green run from an unverified claim.

Counts the report states (listed, per the claim's own instruction and the writing rule against stating a count in prose — these are the report's own cited result lines, reproduced for the record): `format:check` exit 0; `lint:check` exit 0; `check` exit 0; `build:src` exit 0; accordion proof 30 passed (30); section proof 4 passed (4); `test:setup` 254 passed (254); `test:conformance` 22 passed (22); `test:guides` 19 passed (19); `test:policy` 109 passed | 1 skipped (110); `test:app` 80 passed (80); journey observation 41 passed (41); worktree `format:check` exit 0; worktree `lint:check` exit 0; worktree `check` exit 2.

## Claim 8 — Law and report: CONFIRMED

- **Banned syntax:** grepped `ac-2.diff` and the additions in `ac-shared-2.patch` for `any`, non-const `as`, bare `!`, `@ts-*`, `eslint-disable`. Only hits are two `] as const)` / `] as const` occurrences (`ac-2.diff:831,878`), which are const assertions, explicitly permitted by `AGENTS.md` § Non-negotiable rules ("no `as` assertion beyond a const assertion"). No other hit.
- **No duplicated `@orkestrel/test`/`@orkestrel/contract` export:** the owned test files import `requireValue` from `@orkestrel/test` and `build`, `isRendered`, `mount`, `readName`, `readPixels` from `@orkestrel/test/browser` (`ac-2.diff:223-224`) and declare no new module-scope helper duplicating them.
- **Writing rule on the report:** swept `b-collapse-ac-report-2.md` against the substitution table (`should`, `simply`, `easy`, `just`, `currently`, `now`, `latest`, `utilize`, `leverage`, ` via `, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `dummy`, `blacklist`, `whitelist`, `master`, `slave`) — no hits.
- **Count/tally rule:** the only `both`/tally-shaped hits in the report are (a) quoted round-1 wording being corrected — "both names", "both transitions", "both subjects", "twice each", "one timing failure" (`b-collapse-ac-report-2.md:150-151`) and the binding case's before-text "both groups" (`:145`) — each is evidence of the fix, not new authored prose; (b) `tests/setupStyles.ts`'s final wording "the `.accordion-button` selector and the `.accordion-button::after` selector both unconditionally and under the reduced-motion query" (`ac-shared-2.patch:135` / report `:134-136`), where `both` names its two members in the same clause, satisfying the writing rule's own carve-out ("Keep it where the sentence names the members"); (c) the proof case title "collapses both under the reduced-motion preference" (report `:209`), where "the button paint and the chevron turn" are named immediately before. No unnamed-population count found.
- **Report content:** § Deviations (`:311-318`) describes every worktree diagnostic in `logs/wt-check.log.txt` as a consequence of the missing shared exports, naming the exact `TS2305`/`TS2724`/`TS7006`/`TS7031`/`TS2345`/`TS2347` codes — matches the log read directly above. § Scoped gate exits (`:256-277`) records each gate's command, result line, and log path. § What the unit could not close (`:336-350`) names all five required items: frames (no `CAPTURE=1` run), the header margin (`.accordion-header { margin-bottom: 0 }` resolves nothing), the last panel radius (hidden panel, no frame), the states with no frame (hover lift, reduced-motion twins, forced-colors outline), and the button line-height observation (carried from round 1, `line-height: var(--vn-line-body)` vs. the reboot's `inherit`).
- **Diffstat retained, not stated in prose:** `logs/diffstat.log.txt` holds the numstat; the report's own prose (`:153-156`) states no line count, only "the diffstat is the retained `logs/diffstat.log.txt`."

Mutation to falsify claim 8: reintroducing a bare tally (e.g., restoring "twice each"/"once each" in `tests/setupStyles.ts`, or a line count in the report's prose) would be caught by the substitution/count sweep above; reintroducing `any`/`!`/a non-const `as` in the owned files or shared-patch additions would be caught by the syntax grep. Both sweeps are direct pattern matches over the actual patch/report bytes, not a structural reading of intent, so they distinguish the passing case from the mutated one.

## Findings outside the claims (BROKEN standard)

None. No defect found in claims 1, 7, or 8's subject matter beyond what each claim itself names, and no drift found between the evidence files and the report's characterization of them.

VERDICT: PASS
