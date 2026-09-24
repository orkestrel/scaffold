<!-- Retained from Workflow run wf_acdf8e19-cd6, agent a9697972d730b3e90 (checker on Sonnet). -->

## Verdict

**Claims audited:** 1, 7, 8 (checker scope per brief). Claims 2–6 are outside this dispatch.

### Claim 1 — Scope and gates

CONFIRMED.

- Status file lists exactly the three files, matching the claim: `/home/user/scaffold/.orkestrel/veneer/units/t5-2-status.txt:1-3` (`M guides/test.md`, `M src/browser/helpers.ts`, `M tests/src/browser/helpers.test.ts`).
- Gates in the report's table match their logs verbatim:
  - format: report row `t5-test-frame-report-2.md:145` ↔ `t5-instruments-2/t5-2-gate-format.log.txt:3` (`All matched files use the correct format.`)
  - lint: `t5-test-frame-report-2.md:146` ↔ `t5-instruments-2/t5-2-gate-lint.log.txt:1-4` (no diagnostics, exit implied 0)
  - check: `t5-test-frame-report-2.md:147` ↔ `t5-instruments-2/t5-2-gate-check.log.txt:1-20` (all `tsc` projects ran)
  - scoped file test: `t5-test-frame-report-2.md:148` ↔ `t5-instruments-2/t5-2-gate-file.log.txt:7` (`354 passed | 2 expected fail (356)`)
  - browser observation: `t5-test-frame-report-2.md:149` ↔ `t5-instruments-2/t5-2-gate-browser.log.txt:45` (`408 passed | 2 expected fail (410)`, 46.77 s)
  - `test:guides` correctly reported "Not run" at `t5-test-frame-report-2.md:150`, matching the absence of any corresponding log.

### Claim 7 — `readFrame` byte-identical to round 1

CONFIRMED.

- Round-1 copy: `t5-instruments-2/t5-2-helpers-r1.ts.txt:3556-3600`.
- Round-2 worktree: `/home/user/test-tf/src/browser/helpers.ts:3585-3629`.
- Line-by-line text is identical (the 29-line offset comes from `captureFrame`'s round-2 growth earlier in the file, not from any edit inside `readFrame`). The diff (`t5-2.diff:270-300`) shows the PNG-header logic already present unchanged from the base commit's post-round-1 state (confirmed by the identical text in the r1 copy) — the diff hunk context lines around it are unmodified (`-`/`+` markers do not touch the PNG-header body).

### Claim 8 — Prose conformance

CONFIRMED on the sites read (every added sentence in `t5-2.diff`'s guide and TSDoc hunks; test-file prose comments checked for banned terms only).

- Ships-what-it-does, no deferral language: reviewed `t5-2.diff:18-33`, `142-180`, `274-277`, `86-93`, `105-117` — all state present-tense mechanism.
- Offset named with a word distinct from the `stagePane` lift: `stagePane`'s action is called "lifted" at `/home/user/test-tf/src/browser/helpers.ts:3125` (unchanged context); the new prose calls the new mechanism "offset" and "placement" throughout (`t5-2.diff:27-33`, `166-172`) — distinct term, never "lift".
- Code token followed by its noun: checked every added backtick token — `` `50vh` `` element (`t5-2.diff:18`), `` `captureFrame` `` function (`t5-2.diff:27`), `` `style` `` attribute (`t5-2.diff:29`, `169`, `90`), `` `stagePane` `` function (`t5-2.diff:30`, `170`), `` `mouseover` `` event (`t5-2.diff:32`, `175`), `` `releasePane` `` function (`t5-2.diff:89`), `` `page.viewport` `` method (`t5-2.diff:92`), `` `30vh` `` panel/element (`t5-2.diff:105-108`), `` `readFrame` `` / `` `readCascade` `` function (`t5-2.diff:112-116`, `63`). No hit lacks a following noun.
- No possessivized code token in any added line: the one hit (`` `readFrame`'s `` at `t5-2.diff:60`) is a **removed** line, replaced by the compliant `t5-2.diff:63` ("The remaining refusals of the `readFrame` function").
- No stated count of a growing set: the removed "other two refusals" (`t5-2.diff:60`) is replaced by an unnumbered enumeration (`t5-2.diff:63-66`); the new fixture-list paragraph (`t5-2.diff:105-117`) enumerates cases with no cardinal count of the list itself.
- Temporal/cross-reference substitution rows: no hit for `now`, `currently`, `new`, `latest`, `once` (temporal), or `above`/`below` used as a document cross-reference. The only `above`/`below` hits (`t5-2.diff:19`, `107-108`, `145`, `156`) are spatial ("above the fold", "below the pane") — a permitted sense under `.claude/rules/writing.md` § Substitutions, not a cross-reference use.

### Counts the report states (listed, not ruled on beyond claim 1's gate check)

- `9 failed, 13 passed, 334 skipped` (round-1 red, final) — `t5-test-frame-report-2.md:97`
- `9 failed, 13 passed` (round-1 red, first draft) — `t5-test-frame-report-2.md:98`
- `22 passed, 334 skipped` (green, final tree) — `t5-test-frame-report-2.md:99`
- Mutation counts: `2 failed, 20 passed` (×2), `1 failed, 21 passed` (×2), `4 failed, 18 passed` (×3) — `t5-test-frame-report-2.md:123-129`
- `354 passed | 2 expected fail (356)` — `t5-test-frame-report-2.md:148`
- `408 passed | 2 expected fail (410)`, `46.77 s` — `t5-test-frame-report-2.md:149`
- `3 files changed, 397 insertions, 31 deletions` — `t5-test-frame-report-2.md:157`

### Findings outside the claims

None found (BROKEN standard: none identified in the read sites).

### Referrals

None — no judgment call was required for claims 1, 7, or 8 on the evidence read.

VERDICT: PASS
