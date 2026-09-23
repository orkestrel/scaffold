# Checker verdict — UTIL-DISPLAY (`ud`), round 1, claims 1/4/7/8

## Claim 1 — Delta and scope

CONFIRMED.

- `ud-status.txt:1-12` lists exactly the twelve owned files as `??` (untracked): `_display.scss`, `_flex.scss`, `_vertical-align.scss`, `_stacks.scss`, the four mirrored proofs, `DisplaySection.ts`, `FlexSection.ts`, and their two section proofs. No other entry appears.
- `ud-shared.patch` touches only `src/styles/index.scss`, `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/fixtures/tailwind/markup.html`, `guides/veneer.md` — every one is named in the brief's Shared row (`b-utilities-ud-brief.md:81-95`). No vendored file, no other UTIL unit's file, no `_mixins.scss`, `_tokens.scss`, `src/browser/**`, `src/core/**`, `tests/fixtures/oracle/**`, `package.json`, `README.md`, or `ROADMAP.md` appears in the patch.
- The patch's only removal is the former `CaptureStem` conditional (`ud-shared.patch:304-311`), matching accepted deviation 2.

## Claim 4 — The sections and the specimens

BROKEN.

- `DisplaySection.ts:19` and `FlexSection.ts:19` construct `SpecimenSection` subclasses fed by `DISPLAY_COPY`/`DISPLAY_SPECIMENS` and `FLEX_COPY`/`FLEX_SPECIMENS`, confirmed against the specimen list. The rendered names match the claim exactly: `tests/app/browser/sections/DisplaySection.test.ts:26-31` (`Display values`, `Responsive display`, `Print display`, `Vertical alignment`) and `FlexSection.test.ts:26-37` (the ten Flex-region names, including `Fill, grow, and shrink`). No specimen markup carries a `style` attribute (`ud-shared.patch` `constants.ts` hunk, lines 291-418: no `style="`).
- The claim also asserts "the section proofs assert the region contract, `[style]` null, the names, and the readings the report names." The sibling section proofs assert this: `tests/app/browser/sections/InputGroupSection.test.ts:27` — `expect(region.querySelector('[style]')).toBeNull()`. Grepping `[style]` across `tests/app/browser/sections/*.test.ts` returns 19 files; `DisplaySection.test.ts` and `FlexSection.test.ts` are not among them. Neither proof asserts `[style]` null anywhere in its file. The mutation this assertion exists to catch — a specimen or the section wrapper acquiring an inline `style` attribute — is not distinguished by either new proof, unlike every sibling. This falsifies the claim's "asserts … `[style]` null" clause.

## Claim 7 — The guide and the shared patch

UNRESOLVED (mixed).

Content-coverage sub-claims CONFIRMED directly against `ud-shared.patch`:
- `@use` lines: `components/stacks` sits between `components/ratio` and `components/vr` (`ud-shared.patch:5-9`); `utilities/vertical-align`, `utilities/display`, `utilities/flex` are inserted immediately before the existing `utilities/gap` line (`ud-shared.patch:9-13`), matching the map order the report's own precedence table names ("vertical-align, display, flex, gap in map order", report line ~153) — the claim's wording "in map order after `gap`" reads as imprecise (the new lines sit before, not after, `gap`) though the substance (adjacency, map order) checks out.
- `### Display utilities` and `### Flex utilities` sit between the pre-existing `### Gap utilities` content and `### Deferred selectors` (`ud-shared.patch:661-720,973`).
- `### Files` rows land after `_vr.scss` (`ud-shared.patch:625-626`) and after `_gap.scss` (`ud-shared.patch:633-636`).
- Compatibility rows land after the `column-gap` row (`ud-shared.patch:726-736`).
- The § Tailwind importance sentence is added (`ud-shared.patch:647-654`); the § Showcase stacks clause is added (`ud-shared.patch:744-746`); § Tests links are added (`ud-shared.patch:763-769`).
- `tests/conformance.test.ts`'s `listed` literal and order case (`ud-shared.patch:432-513`), `tests/setupServer.test.ts`'s component set (`ud-shared.patch:524-571`), the `constants.ts` constants and `Showcase.ts`/`index.ts` construction and export (`ud-shared.patch:22-192`), the `Showcase.test.ts`/`index.test.ts` enumerations (`ud-shared.patch:196-248`), and the `integration.test.ts` census tables (`ud-shared.patch:249-269`) are each present as claimed.

Not confirmable from documents alone, and resting solely on the writer's own report:
- "`ud-shared.patch` applies cleanly at `e4e6a40` (`git apply --check` exit 0)" — the only evidence is the report's self-quoted command and exit code (`b-utilities-ud-report.md:207`). Per the checker mandate, a claim whose only evidence is the writer's report is UNRESOLVED, not CONFIRMED, whatever the brief says.
- "the landing copy's gates read green as § Scoped gate exits records" — same defect: the gate table (`b-utilities-ud-report.md:187-207`) is the writer quoting its own run, with no independent verifier confirmation in evidence.

## Claim 8 — Law and report

CONFIRMED for the parts checkable from the diff and the report's own structure.

- No `any`, no forbidden `as` (only `@use '../mixins' as *` and one `as const` in a test array, both permitted exceptions), no `!` non-null assertion, no suppression comment, no mock, no nested function beyond a directly-passed callback, across `ud.diff` (grep for `\bany\b|\bas\s|!\s*=|\bmock|@ts-ignore|@ts-expect-error|eslint-disable` returns only prose occurrences of "any" inside comments and the two permitted `as` uses).
- `_display.scss:1-16`, `_flex.scss:1-117`, `_vertical-align.scss:1-14` write every entry through the `utility` mixin (`@include utility(...)`) with no hand-repeated declaration block; `_stacks.scss:1-17` writes two normal rules with no mixin call, matching the brief's "normal helper" scope.
- Grepping `ud.diff` and `ud-shared.patch` for the banned-term rows (`should`, `simply`, `easy`, `just`, `utilize`, `leverage`, `via`, `e.g.`, `i.e.`, `etc.`, `performant`, `allows you to`, `and/or`) returns no matches in either file.
- The report bounds each deviation and choice it names: Deviation 1 (shared-file gating), Deviation 2 (`CaptureStem` comma handling, with its own ruling request), Deviation 3 (four named ancillary choices, including the case-table placement), and Deviation 4 (the `integration.test.ts` hunk) each carry expected/found/evidence/done-or-not text (`b-utilities-ud-report.md:209-230`).

**Ruling this claim assigns to the lane:** whether `.claude/rules/tests.md` requires the case tables in `tests/setupStyles.ts`. `.claude/rules/tests.md:187` states unconditionally: "Data tables and case matrices belong in a setup file at any size; test registration does not." This rule requires `DISPLAY_VALUES`, `ALIGN_VALUES`, `FLEX_ENTRIES`, and `RESTING` to live in `tests/setupStyles.ts`, not in the owned proof files. `ud.diff:658` (`DISPLAY_VALUES`), `ud.diff:674` (`RESTING`), `ud.diff:826` (`FLEX_ENTRIES`), and `ud.diff:1165` (`ALIGN_VALUES`) declare these at module scope inside `display.test.ts`, `flex.test.ts`, and `vertical-align.test.ts` respectively. The report's own Deviation/ancillary-choice §3 (`b-utilities-ud-report.md:224`) acknowledges the rule's placement requirement and defers the move to "a successor patch" rather than closing it now. This is a standing rule violation left open, and it is the finding this claim tells the lane to record.

## Findings outside the claims (BROKEN standard)

1. **Case matrices declared outside the mandated setup file.** `.claude/rules/tests.md:187` requires case matrices in a setup file at any size. `DISPLAY_VALUES` (`ud.diff:658`), `RESTING` (`ud.diff:674`), `FLEX_ENTRIES` (`ud.diff:826`), and `ALIGN_VALUES` (`ud.diff:1165`) sit at module scope in the owned proof files instead of `tests/setupStyles.ts`, and the report leaves this open for "a successor patch" (`b-utilities-ud-report.md:224`) rather than closing it in scope.

## Counts the report states (listed, not tallied)

Each is quoted from `b-utilities-ud-report.md` at the line named:

- Line 30: "Diffstat: 12 files, 1227 insertions, 0 deletions."
- Line 41: "`npm run test:conformance` exited 0 with 22 passed."
- Line 42: "`npm run test:service` exited 0 with 18 passed."
- Line 48: "exit 1, `Test Files 4 failed (4)`, `Tests 37 failed (37)`."
- Line 49: "exit 0, `Tests 37 passed (37)`."
- Lines 87-93: the criterion-3 table — "343" inventory sites present/missing 0; per-key selector counts "d 77 (66 responsive + 11 `@media print`), flex 72, justify-content 36, align-items 30, align-content 36, align-self 36, order 48, hstack 1, vstack 1"; "108 rows under `align`: 6 vertical-align sites and 102 repeats."
- Lines 103-112 (coverage matrix): red counts per mutation, e.g. "(7 red)", "(9 red)", "(the lg case red)", "(each 1 red...)", "(5 red)", "(1 red)", "(3 red)", "(14 red)", "(1 red...)", "(12 red)", "(8 red)", "(2 red)", "(1 red)".
- Line 133: "exited 1 with `2 failed | 16 passed`."
- Line 134: "exited 1 with `4 failed | 14 passed`."
- Lines 177-186 (worktree gate table): exit values `0, 0, 2, 0, 1, 1, 0, 0, 0`, and "109 passed, 1 skipped."
- Lines 191-205 (landing-copy gate table): "0" exits throughout, and readings "4 files, 37 passed", "2 files, 6 passed", "22 passed", "3 files, 18 passed", "250 passed", "19 passed", "109 passed, 1 skipped", "80 files, 803 passed", "30 files, 72 passed", "65 passed", "13 files", "4 files, 152 passed".

VERDICT: FAIL 4, 7; outside the claims: case matrices declared outside the mandated setup file