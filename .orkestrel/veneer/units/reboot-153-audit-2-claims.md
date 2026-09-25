# REBOOT-153 audit round 2 — claims

Subject: REBOOT-153 round 2 in `/home/user/veneer-r153` (branch `unit/r153`, uncommitted over the round-1 checkpoint
`4574c58`, itself over Veneer `6052e25`), briefed by `reboot-153-brief-2.md`, whose Items the Orchestrator ruled in
`reboot-153-audit-verdict.md`. Applied by `builder` on Sonnet and reported in `reboot-153-report-2.md`. Evidence:
`r153-instruments/r2/` (`r153-2.diff`, `git diff 4574c58`; `r153-2-full.diff`, `git diff 6052e25`; the status, the
mutation logs, and the gate logs) and the Orchestrator's Chromium 141 probe `r153-instruments/probe/`. All paths sit
under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when its log names an
`AssertionError`. Rule every claim; compare words, not line wrapping.

1. **The Items.** `r153-2.diff` applies Items 1 to 3 as written and changes no other word.
2. **The text is true.** The doc block's remarks and the guide sentence, read whole in their paragraphs, are true of
   `normalizeLineWidths`, of `readFormDifferences`, and of CSS, and name no build behaviour the evidence does not record.
3. **Every mapping is proved.** Removing any single entry of `LINE_STYLES` fails the `normalizeLineWidths` case with an
   assertion: the border-top, border-right, and border-bottom removals by the logs in `r153-instruments/r2/`, and the
   outline and border-left removals by the round-1 inputs.
4. **The Chromium 141 half.** The probe log records Chromium 141.0.7390.37 computing an outline width and a border width
   whose style is `none` or `hidden` at `0px` and keeping a solid width, with an assertion that distinguishes the two,
   so `normalizeLineWidths` leaves every Chromium 141 reading `readFormDifferences` takes unchanged.
5. **Gates.** Every gate log in the report's gate table ends with exit 0.
