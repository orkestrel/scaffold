# AP-TYPE audit, round 5 — claims

Subject: the AP-TYPE round-5 change in `/home/user/veneer-apt` (branch `unit/apt`, uncommitted over Veneer `712ae72`),
briefed by `ap-type-brief-5.md` to carry N1, N2, and N4 of `apt-audit-4-verdict.md` under its § The seam ruling,
written by `builder` on Sonnet, and reported in `ap-type-report-5.md`. The owned diff is `apt-5.diff`, the status
`apt-5-status.txt`, and the logs `apt-instruments-5/`; round 4's are `apt-4.diff`, `apt-4-status.txt`, and
`apt-instruments-4/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The earlier rounds held every other
claim. A tally inside a report is dropped as a claim subject, per `.claude/rules/quality.md` § Rounds and verdicts (a
count over prose has no closing condition). Each claim is falsifiable; rule every one.

1. **Scope.** The status equals round 4's; against `apt-4.diff`, the round-5 diff changes only "The partial" and
   "This partial" sentences of `guides/veneer.md` with their paragraphs' rewraps, the `_font.scss` cap-block comment,
   and the `FONT_ENTRY_CASES` TSDoc; `apt-instruments-5/apt-5-cmp.log.txt` records the cascade byte-identical to
   round 3's.
2. **N1.** Each edited sentence names the partial whose source writes what the sentence describes, and each unedited
   "The partial" or "This partial" sentence describes the partial its nearest preceding partial path names.
3. **N2.** In `_font.scss` and the `FONT_ENTRY_CASES` TSDoc, the breakpoint-infix walk is called "takes a breakpoint
   infix" or named as the utilities written at each breakpoint infix, never "responsive"; each rewrapped comment
   changes no other word.
4. **N4.** The restated erratum names the cases, their `font.test.ts` locations, and the mutation logs, and each
   statement in it is true against those files.
