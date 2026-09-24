# Verdict — TIP (`tp`) round 4 checker audit

## Per-claim verdicts

**Claim 1 (Scope and delta) — CONFIRMED.**
- `tp-4-status.txt:1-8` lists exactly the round-1 owned paths (`PopoverSection.ts`, `TooltipSection.ts`, `_popover.scss`, `_tooltip.scss`, `PopoverSection.test.ts`, `TooltipSection.test.ts`, `popover.test.ts`, `tooltip.test.ts`), all `??`, nothing else.
- `tp-instruments/tp-4-shared-interdiff.txt:1-93` shows the interdiff against `tp-shared-3.patch` touching only `app/browser/constants.ts` (P7 summary), `guides/veneer.md` (P8 paragraph), and `tests/setupStyles.ts` (`TIP_PLACEMENTS` remarks and `TIP_ARROW_PROPERTIES`/P9 remarks), plus the hunk-length/blob-hash lines those edits move.
- `tp-instruments/tp-4-owned-interdiff.txt:1-70` shows exactly three owned-file changes, each a comment: `PopoverSection.test.ts:16-23`, `popover.test.ts:36-44`, `tooltip.test.ts:60-67` — all comment-only, no assertion or markup line changed.

**Claim 2 (P7, P8, P9) — CONFIRMED.**
- P7: `tp-4-shared-interdiff.txt:19-22` — new text names both specimen kinds with no cardinality claim; `tp-4.diff` shows `POPOVER_SPECIMENS` holding the four placements plus the untitled specimen (`bs-popover-bottom` class, `tp-4.diff` lines ~435-448), matching "in render order."
- P8: `tp-4-shared-interdiff.txt:38-50` — new text "sets the `show` class, and the `fade` class when the popover is animated." The Popover `plugin` row in `tp-shared-4.patch:812` reads "sets the `show` class, and the `fade` class when animated," an exact match. Source: `/home/user/veneer-tp/node_modules/bootstrap/js/src/tooltip.js:217` (`tip.classList.add(CLASS_NAME_SHOW)`, unconditional) and lines 319-320 (`if (this._isAnimated()) { tip.classList.add(CLASS_NAME_FADE) }`, conditional) — bears out the sentence exactly.
- P9: `tp-4-shared-interdiff.txt:85-90` — new text "each of these properties," matching `TIP_ARROW_PROPERTIES` remarks' own antecedent list.

**Claim 3 (The sweep) — CONFIRMED.**
- Sweep-read population: `tp-sweep-4-shared.txt` (all comment/prose lines added by `tp-shared-3.patch`, table rows of § Compatibility excluded, per the file's own header lines 47-249) and `tp-sweep-4-owned.txt` (all comment lines in the eight owned files) both match the report's file lists (`b-modal-tp-report-4.md:87-100`).
- Each of the four fixes the report names appears as a "before" line inside those two extract files at the sites the report cites: `tp-sweep-4-shared.txt:215-216` (`TIP_PLACEMENTS` remarks, "the arrow's own edge on that side"), `tp-sweep-4-owned.txt:158` (`tooltip.test.ts:167`), `tp-sweep-4-owned.txt:120-121` (`popover.test.ts:192-193`), `tp-sweep-4-owned.txt:61-64` (`PopoverSection.test.ts:39-42`) — and each corresponding "after" text appears in `tp-4-shared-interdiff.txt:70-77` and `tp-4-owned-interdiff.txt` at the same sites, matching the report's before/after pairs exactly.
- The replacement is true of the assertion it names: the arrow cases assert `mark[side]` close to `box[edge]` (e.g. `tests/src/styles/components/popover.test.ts:901` in `tp-4.diff`), so "the arrow's edge facing the tip, on the side the `side` field names, meets the tip's edge the `edge` field names" reads the same assertion correctly, where the prior "that side" (the `edge` field's side) named the wrong arrow edge.
- "Each claim the report says held, holds" — spot-checked the box-shadow, `POPOVER_SELECTORS`, `VIEWPORT_WIDTHS`, and engine-class claims (`b-modal-tp-report-4.md:139-147`) against `tp-4.diff` lines 744-762 (selector sweep case) and 812-825 (engine-class case): each matches its cited assertion.

**Claim 4 (Law and report) — CONFIRMED.**
- No `any`, `as` beyond none, `!`, suppression comment, or nested function declaration appears in `tp-4.diff`: grep for `: any`, `as \w+ as`, `!.`, `!)`, `@ts-`, `eslint-disable` returns only two false-positive substring hits on the English word "as" inside prose comments (`tp-4.diff:191,975`, "as wide as the arrow"), no actual syntax violations.
- Report's gate table (`b-modal-tp-report-4.md:153-163`) reproduces `tp-instruments/tp-gates-4.log.txt:1-21` command-for-command and result-line-for-result-line (check, build, setup `Tests 126 passed (126)`, guides `Tests 19 passed (19)`, policy `Tests 109 passed | 1 skipped (110)`, styles `Tests 20 passed (20)`, sections `Tests 5 passed (5)`, format, lint), and the worktree format/lint lines (`b-modal-tp-report-4.md:169-170`) match `tp-wt-fmt-4.log.txt` and `tp-wt-lint-4.log.txt` exactly.
- The report states no tally of a growable set outside quoted command output; no list item is named by position; spot-checked code tokens are each followed by a noun (e.g. `tp-shared-4.patch` file, `TIP_PLACEMENTS` remarks paragraph).

## Counts the report states (listed, per acceptance criteria)

- setup: `Tests 126 passed (126)`
- guides: `Tests 19 passed (19)`
- policy: `Tests 109 passed | 1 skipped (110)`
- styles: `Tests 20 passed (20)`
- sections: `Tests 5 passed (5)`

## Findings outside the claims

None found. No BROKEN sites beyond the four claims audited.

VERDICT: PASS
