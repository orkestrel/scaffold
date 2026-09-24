## Verdict — PAGE-FRAME (`pf`) audit round 1, checker (claims 1, 7, 8)

### Numbered verdicts

**1. Scope — CONFIRMED**
`pf-status.txt` lists exactly `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts` (`/home/user/scaffold/.orkestrel/veneer/units/pf-status.txt:1-5`) — matches the claim's list exactly, nothing else. `pf-shared.patch` touches `guides/veneer.md` alone (`/home/user/scaffold/.orkestrel/veneer/units/pf-shared.patch:1-2`, single `--- a/guides/veneer.md` / `+++ b/guides/veneer.md` header, no second file header anywhere in the patch). No off-limits file appears in either artifact.

**7. Prose (R8) — UNRESOLVED**
Verifiable sub-clauses hold: the `FrameManager` class and method TSDoc (`/home/user/scaffold/.orkestrel/veneer/units/pf.diff:659-745`) match the implemented `#shoot`/`#exclude`/`#settle`/`#admit` order (`pf.diff:757-831`); `SHOWCASE_KEYS`/`CASCADE_KEYS` remarks (`pf.diff:302-349`) match the `scenario: 'showcase', subject: 'Showcase'` entry (`pf.diff:319`) and the bounded-document behavior; the integration-file comments (`pf.diff:26-260`) read true against the surrounding placements; no sentence in the diff or `pf-shared.patch` states a frame covers the whole document (the old "covers the whole document" language was removed, e.g. `pf-shared.patch` original line replaced, `pf.diff:324-329`).
One sub-clause cannot be settled from the supplied evidence: the guide's "stale first pixel" sentence (`pf-shared.patch:14-19`) asserts behavior of the installed `readFrame` function, and a grep of `/home/user/veneer-pf` (source, `node_modules/@orkestrel/test`, and `tests/`) for `readFrame` returns no export — only the three files that mention it in prose (`tests/setup.ts`, `tests/app/browser/integration.test.ts`, `guides/veneer.md`). Nothing in the supplied evidence lets me confirm or break the "floor … or from the region's own first pixel" claim against real `readFrame` code. What would settle it: the source of the installed `readFrame` function (its package entry, not supplied under `pf-instruments/`).

**8. Law and report — BROKEN**
The added-line law sub-clause holds on inspection of `pf.diff`: no `any`, no `as` beyond none present, no `!`, no suppression comment, no nested function declaration found in the diff (`recordPlacements`, `#exclude`, `#settle`, `#admit` are all top-level or class-method declarations, not nested; `pf.diff:637-657`, `787-831`).
The "states no temporal word" sub-clause is falsified. `b-cross-pf-report.md` uses the banned temporal word `now` describing the fixed behavior, not a date: "A scenario **is now recorded** after the area check." (`/home/user/scaffold/.orkestrel/veneer/units/b-cross-pf-report.md:69`), and repeatedly in the rewritten-sentences section: "They **now** say that every placement bounds its document…" (`b-cross-pf-report.md:138`), "It **now** says 'A page frame shows…'" (`b-cross-pf-report.md:142`), "It **now** says 'every scenario admitted…'" (`b-cross-pf-report.md:145`), "They **now** say it 'came back blank white when it was measured…'" (`b-cross-pf-report.md:157`). `.claude/rules/writing.md` § Substitutions bans `now` unconditionally except a permitted sense the checker must rule; none of these five hits carries a permitted (non-temporal) sense — each states a present state that differs from a prior one, the exact banned sense. A compound claim with one falsified sub-clause is `BROKEN`.

### Findings fitting no claim

None substantiated to the `BROKEN` standard beyond what claim 8 already carries.

### Attacked and held

- Claim 1's off-limits-file sub-clause: attacked by scanning both `pf-status.txt` and `pf-shared.patch` for any file outside the five named test files and `guides/veneer.md`; none found.
- Claim 8's syntax-law sub-clause: attacked by scanning every hunk in `pf.diff` for `any`, `as`, `!`, `@ts-`/`eslint-disable`, and nested function declarations; none found.
- Claim 7's "no sentence states a frame covers the whole document": attacked by grepping the diff and patch for "whole document"/"whole page" language; every surviving instance describes the underlying document, not a frame's coverage, matching the report's own sweep (`b-cross-pf-report.md:214-223`).

### Counts the report states (listed, for the record)

`b-cross-pf-report.md`: red run `6 failed | 67 passed (73)`; green `73 passed (73)` (×2 occurrences); `287 passed (287)`; four capture runs each `45 passed (45)` with durations `203.51 s`, `197.35 s`, `219.21 s`, `216.94 s`; mutation-table red counts `3 failed`, `2 failed` (×4), `1 failed` (×4); `showcase` dimensions `1280 × 800`, `390 × 844`, and the rejected `1280 × 53410`; `FRAME_AREA` value `1280 × 41954` (53701120 device pixels) with decode sizes `204.9 MiB` and `260.8 MiB`; `bottom-offcanvas` region `390 × 392` (y `130.8`, height `253.2`) and `1280 × 392` (y `144`, height `240`); panel row `131` of `392` rows, height `253` rows / `30vh` of `844`, and `240` / `30vh` of `800`; tallest page frame `navbar-collapsed-focus` at `390 × 1877` and `1280 × 1648`; section-height table values `57705`, `53410`, `78.2`, `21.0`, `1798.0`, `1569.0`, `22.5 M`, `68.4 M`, and the four grown-section pairs `485.8 → 666.3`, `1967.0 → 2466.5`, `885.0 → 1642.0`, `1619.8 → 1714.0`; diffstat line counts `128`, `1`, `49`, `183`, `185`.

### Terminal line

VERDICT: FAIL 7, 8; outside the claims: none