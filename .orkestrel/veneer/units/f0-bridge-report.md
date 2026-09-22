<!-- Unit F0-BRIDGE, run 1: `builder` on Sonnet, native, returned 2026-09-22 with a deviation report. Brief: f0-bridge-brief.md. Retained verbatim; the successor brief f0-bridge-brief-2.md corrected the standing condition. -->

Stopped before writing, per the brief's deviation contract.

Expected: `git status --short` prints nothing before I start (brief § Standing conditions).

Found: it is not empty.
```
?? .orkestrel/veneer/units/f0-bridge-brief.md
?? .orkestrel/veneer/units/veneer-pin-gates-report.md
```
`git rev-parse --short HEAD` = `903962c` (matches the brief). `wc -l .orkestrel/veneer/plan.md .orkestrel/veneer/handoff.md` = 2190 and 375 (matches the brief's evidence), so both source files are present and unmodified.

Done or not done: not done. I made no edit to `.orkestrel/veneer/plan.md` and did not delete `.orkestrel/veneer/handoff.md`.

Hypothesis: the two untracked files sit under `.orkestrel/veneer/units/` — one looks like this unit's own staged brief copy, the other an unrelated `veneer-pin-gates` unit's report — rather than uncommitted changes to the files I own, but the brief's stop condition fires unconditionally on a non-empty `git status --short`, so I am reporting rather than deciding it is safe to proceed past.

No files were changed. Awaiting a decision: confirm these two untracked files are expected and re-dispatch, or have them cleared first.
