<!-- Retained from Workflow run wf_32586156-1e5, agent aa4aee92742015b52 (checker on Sonnet). -->

## Verdict

### Claim 1 — Scope and gates: CONFIRMED

- Status list matches exactly: `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts` (`t5-4-status.txt:1-4`).
- Every gate log ends `exit 0`: `t5-instruments-4/t5-4-gate-format.log.txt:5`, `t5-4-gate-lint.log.txt:5`, `t5-4-gate-check.log.txt:21`, `t5-4-gate-file.log.txt:12`, `t5-4-gate-browser.log.txt:50`.

### Claim 5 — Width-independent fixtures: BROKEN

The claim asserts all four named fixtures ("below-pane, scope, fixed-panel, and no-attribute") "declare a width no wider than the runner window and expect that width." Two do not carry the "expect" half:

- `t5-4.diff:526,541` (below-pane) and `:493,511` (fixed-panel) declare `across = Math.min(390, …innerWidth)` and assert `expect(reading.width).toBe(across)`.
- `t5-4.diff:662` (scope fixture, "offsets only the calling tester frame") declares the same `across` and passes it as `width`, but the test never calls `readFrame` and never asserts a width.
- `t5-4.diff:692` (no-attribute fixture, "hands back a frame that carried no style attribute") likewise declares `across`, passes it as `width`, and never calls `readFrame` or asserts a width.

The fixture-declaration half holds for all four; the "expect that width" half fails for the scope and no-attribute fixtures.

### Claim 6 — The retained mutations: CONFIRMED

All ten files read (`t5-instruments-4/t5-4-mutations/{noright,wholenudge,nonudge,htmlonly,nofixedroot,latescroll,noscrollback,nooffset,nocomposite,widened}.json`) contain single, unique text-edit vectors (`t5-4-run.sh:17` asserts `s.count(e['from']) == 1`) matching the report's mutation table one for one. `t5-4-digest.log.txt:1-5` records the test-file digest before the series and an `OK`/`exit 0` check after. `t5-4-mutations-summary.log.txt:1-56` shows each mutation exits 1 and names exactly the proofs the report's table attributes to it, then `restored` on every iteration. Each edit changes an assertable branch (e.g., `nofixedroot.json:6` adds an always-false `anchor === null` conjunct that disables the fixed-root stop; `noscrollback.json:5-6` removes only the in-task scroll restore; `wholenudge.json:6` reverts to the round-3 whole-pixel nudge) — each distinguishes the mutant from the passing case rather than merely deleting code.

### Claim 8 — Prose (W8) and parity: BROKEN

- Surface-row parity holds: `guides/test.md` `FrameOffset` row (`t5-4.diff:9`) matches the TSDoc description paragraph in `src/browser/types.ts` (`t5-4.diff:451-452`) verbatim; the `computeOffset` guide row (`t5-4.diff:17`) matches its TSDoc description (`t5-4.diff:180-181`) with the `{@link}` tag rendered as its code token, per the permitted transform.
- Token-noun violation: `src/browser/types.ts`, new `FrameOffset` `@remarks` block (`t5-4.diff:455-456`): "A negative `top` moves the frame up ... a negative `left` moves it left" — each code token is used as a bare subject with no following noun (for example, no "property"), contrary to `.claude/rules/writing.md` § Code tokens, references, and links: "Put a code token in backticks and follow it with a noun." Every other changed backtick token I read in this diff (`t5-4.diff:17,45,48,51,55,58,91,105,122,125,145,147,150,154,158,255,271,285,365`) is followed by a noun (`function`, `attribute`, `option`, `event`).
- No count or banned-term violations found among the other read sites; the new numeric prose (row/pixel sizes) states measurements, not population counts.

### Findings outside the claims

None substantiated.

### Counts the report states

- `t5-4-green.log.txt`: 38 passed, 334 skipped.
- `t5-4-gate-file.log.txt`: 370 passed, 2 expected fail (372).
- `t5-4-gate-browser.log.txt`: 424 passed, 2 expected fail (426), 47.89 s.
- Diffstat: 4 files changed, 790 insertions, 34 deletions.
- Mutation table: `noright` 1 failed/37 passed; `wholenudge` 1 failed/37 passed; `nonudge` 10 failed/28 passed; `htmlonly` 1 failed/37 passed; `nofixedroot` 1 failed/37 passed; `latescroll` 1 failed/37 passed; `noscrollback` 1 failed/37 passed; `nooffset` 7 failed/31 passed; `nocomposite` 1 failed/37 passed; `widened` 1 failed/37 passed.
- Stability: 3 repeated runs, each 38 passed.
- Referral R3: 0 `mouseover` events.

### Attacked and held

None of claims 1 or 6 admitted a break under the reads performed.

VERDICT: FAIL 5, 8; outside the claims: none
