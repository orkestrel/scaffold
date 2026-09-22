# F7 CAPTURE — checker lane verdict (`checker` on Sonnet, 2026-09-22)

Lane: mechanical. Worktree `/home/user/veneer-f7` (`07fc3c3` plus the unit's writes).

- Claim 7 CONFIRMED: `f7-capture-listing.txt:1-64` lists 64 entries, each `<scenario>--<theme>-<viewport>[-accessibility].{png,txt}` with theme in `dark|light` and viewport in `1280|390`, no project token; 9 scenarios × 4 variants = 36 frames plus 7 subjects × 4 variants = 28 accessibility artifacts; the report (`f7-report.md:295-297`) states nothing else was written. Mutation: any stray token in a listed name; none found.
- Claim 8 UNRESOLVED: the gate log ends mid `build` (`f7-gates.log.txt:120`) with no `=== gates done` line.
- Claim 9 CONFIRMED: `f7-status.txt:1-6` lists exactly the six owned files (the journey suite read as `tests/app/browser/integration.test.ts` per the evidence index); `app/browser/constants.ts` and `TableSection.test.ts` absent, matching deviation 1; `vite.config.ts` and `ROADMAP.md` unedited (patches proposed at `f7-report.md:395-414`); no `tmp/probe/` file.
- Claim 10 CONFIRMED: the banned-term pattern over the guide and every added diff line returns nothing; every added numeral is a code literal, a measurement, or an assertion value.
- Claims 1 to 6 and 11 referred to the subjective and objective lanes.

VERDICT: FAIL 8; outside the claims: none
