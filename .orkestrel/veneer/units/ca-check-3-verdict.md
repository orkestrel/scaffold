## Verdict — CAROUSEL (`ca`) round 3 checker

### Claim 1 — Delta and scope: CONFIRMED

`ca-3-status.txt` lists exactly the four owned files as untracked (`app/browser/sections/CarouselSection.ts`, `src/styles/components/_carousel.scss`, `tests/app/browser/sections/CarouselSection.test.ts`, `tests/src/styles/components/carousel.test.ts`) and no modified file (`ca-3-status.txt:1-4`).

`ca-3.diff` contains only two file diffs — `tests/src/styles/components/carousel.test.ts` (`ca-3.diff:1-6`, 578 lines) and `tests/app/browser/sections/CarouselSection.test.ts` (`ca-3.diff:585-590`, 269 lines) — with no `_carousel.scss` or `CarouselSection.ts` diff present at all. Comparing bodies against `ca-2.diff`: the "writes the recorded carousel selectors" case, the fade-track assertions, and the controls assertions are byte-identical between rounds; only the fade case's comment (`ca-3.diff` around lines 182-187 vs `ca-2.diff` around lines 396-399) and the controls comment (`ca-3.diff` around line 296 vs `ca-2.diff` around line 505) changed text, with no assertion line changed in `carousel.test.ts`.

### Claim 2 — The comparator: CONFIRMED

`cascade-check.mjs`'s `sequence` helper (`ca-instruments-2/tools/cascade-check.mjs:233-236`) now filters only on `theirs.some(...) && ours.some(...)` — the earlier `!expected.has(property)` exclusion is gone, so a departure property stays in the declaration-order comparison.

`logs/cascade/summary.txt:1-16` shows `clean-expanded exit=0 VERDICT green`, `clean-built exit=0 VERDICT green`, `restored-expanded exit=0 VERDICT green`, `restored-built exit=0 VERDICT green`, and the round-2 controls `planted-rule-*` and `swapped-uri-*` still red. The five new controls each read red with the named line: `color-before-position.log.txt:43,46` (`RED DECLARATION-ORDER` on both `.carousel-control-prev` and `.carousel-control-next`), `missing-selector.log.txt:3` (`RED MISSING .carousel-dark`), `swapped-keys.log.txt:3` (`RED ORDER ...`), `moved-layer.log.txt:3` (`RED LAYER .carousel-caption sits in no layer`), `stale-departure.log.txt:54` (`RED STALE-DEPARTURE .carousel-item { opacity } guide=0 written=—`). `cascade-runs.sh:48,165` records restoring the partial by digest before and after the new controls.

### Claim 3 — The case split: CONFIRMED

`ca-3.diff` (round 3) shows the caption-contrast case ending at `expect(readStyle(... 'color')).toBe('rgb(0, 0, 0)'))` with no fading assertion, and a new case `"paints the fading carousel's resting slide at full opacity"` (`ca-3.diff:764-779`) holding the moved assertion — matching the block that sat inside the contrast case in `ca-2.diff:992-998`. `logs/section-mutations/fade-class-dropped.log.txt:9,11` shows `Tests 1 failed | 6 passed (7)` reddening only `paints the fading carousel's resting slide at full opacity`; `logs/section-mutations/none.log.txt:6-7` shows the unmutated control green (`Tests 7 passed (7)`).

### Claim 4 — The comments: CONFIRMED

The fade comment (`ca-3.diff:183-187`) names "a fade rule that stops hiding the other slides", "a stacking rule that drops the resting slide or either incoming slide", and "the outgoing slide's delay dropped." The controls comment (`ca-3.diff:294-296`) reads "no one literal resolves the light, dark, and consumer readings together" with no "all three."

### Claim 5 — The gates and the record: FAIL

`logs/round3-gates/oxlint.log.txt` and `logs/round3-gates/patch-check.log.txt` are both **empty files** (confirmed by direct read: "the file exists but the contents are empty" for each). The report claims specific, non-empty content for both: "Exit 0, 'All matched files use the correct format.' Log: `logs/round3-gates/oxlint.log.txt`" (`b-modal-ca-report-3.md:169`) and "Exit 0. Log: `logs/round3-gates/patch-check.log.txt`" (`b-modal-ca-report-3.md:177`). The quoted oxlint text is in fact `oxfmt`'s output (`logs/round3-gates/oxfmt.log.txt:1-4`), not oxlint's, and no log evidences either command's exit code. This directly falsifies the claim's "logs/round3-gates/ holds the scoped ... oxlint --deny-warnings runs ... (exit 0) and the worktree git apply --check ... (exit 0)" requirement — the cited logs do not hold what the report says they hold.

The report also never writes "a regular expression" anywhere (confirmed by grep across the file); round 2's count phrase "one regular expression" (`b-modal-ca-report-2.md:407`) is not rewritten in the round-3 document, it is simply absent, so the required correction is not carried.

The report additionally uses two banned-sense terms `writing.md` prohibits unconditionally: "now" at `b-modal-ca-report-3.md:28` ("...before `position` now reads `RED DECLARATION-ORDER`...", a temporal filler the table requires deleted or dated) and "new" at `b-modal-ca-report-3.md:113` ("Each new control's named red line...", dating the controls as recently added rather than naming them or their version, the banned sense the table names).

The matrix-row sub-clause is CONFIRMED (`b-modal-ca-report-3.md:82-85` names `fade-class-dropped` for the new case), but claim 5 is a single conjunctive claim and the preceding failures break it as a whole.

### Findings outside the claims

None found beyond what the assigned claims already cover; the standing condition (worktree untouched, disposable validation copy at `tmp/probe/base`) is satisfied by `ca-3-status.txt` showing only untracked owned files.

VERDICT: FAIL 5; outside the claims: none
