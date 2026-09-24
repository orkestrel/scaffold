Confirmed: matches brief and diff exactly, word for word.

All evidence checked. Now finalize verdict.

## Verdict

**Claim 1 — Scope and gates: CONFIRMED.**
`t5-7-status.txt` lists exactly `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts` (`/home/user/scaffold/.orkestrel/veneer/units/t5-7-status.txt:1-4`), matching the round-6 file set. Each gate log ends `exit 0`: `t5-instruments-7/t5-7-gate-format.log.txt:5`, `t5-7-gate-lint.log.txt:5`, `t5-7-gate-check.log.txt:21`, `t5-7-gate-file.log.txt:11`. The file run reads `Tests  375 passed | 2 expected fail (377)` at `t5-7-gate-file.log.txt:7`.

**Claim 2 — The given sentences: CONFIRMED.**
`src/browser/helpers.ts` remarks read the brief's exact text: `/home/user/test-tf/src/browser/helpers.ts:723-726` matches brief §Execution item 1 word for word (`/home/user/scaffold/.orkestrel/veneer/units/t5-test-frame-brief-7.md:33-37`), re-wrapped only. `guides/test.md` bullet reads the brief's exact text: `/home/user/test-tf/guides/test.md:1703-1708` matches brief item 2 (`t5-test-frame-brief-7.md:38-43`) word for word, with the following sentence ("Register it with `afterEach`...") kept in place as reported.

**Claim 3 — Nothing else moved: CONFIRMED.**
`t5-instruments-7/t5-7-since-r6.log.txt:1-9` shows the only helpers.ts change is lines 724-726 (the park paragraph); `:10-22` shows the only guide change is the bullet span (lines 1704-1708). `:23-24` confirms `tests/src/browser/helpers.test.ts` digest matches round 6 (`OK`). `:25-26` confirms the `src/browser/types.ts` hunk is identical (`True True`). Independent cross-check of `t5-6.diff` against `t5-7.diff` (`/home/user/scaffold/.orkestrel/veneer/units/t5-6.diff` vs `t5-7.diff`) confirms the `src/browser/types.ts` hunks (lines ~470-491 in each) and the `tests/src/browser/helpers.test.ts` hunks are byte-identical between rounds, and the only prose differences fall in the two named passages.

**Claim 4 — Prose law: CONFIRMED.**
Each new sentence carries one idea (location, then the hit-test consequence, then the scope-holds clause) at `helpers.ts:723-726` and `test.md:1703-1708`. The code token `` `mouseover` `` is followed by its noun "event" in both sites (`helpers.ts:725`, `test.md:1706`). No sentence states a count: `(-1, -1)` is a coordinate value and "one pixel" is a measurement, both permitted under `AGENTS.md` § Writing ("Write a number only as a value the reader needs: a duration, a size, a limit, a version, a date, an exit code, or a measurement"). No banned term from `.claude/rules/writing.md` § Substitutions appears in either passage.

**Outside the claims: none found.** The diff, status, report, and gate logs disclose no additional finding at the BROKEN standard.

VERDICT: PASS
