# REBOOT-153 audit — claims

Subject: REBOOT-153 in `/home/user/veneer-r153` (branch `unit/r153`, uncommitted over Veneer `6052e25`), briefed by
`reboot-153-brief.md`, whose Items the Orchestrator wrote. Applied by `builder` on Sonnet and reported in
`reboot-153-report.md`. Evidence: `r153-instruments/r153.diff` (`git diff 6052e25`), `r153-instruments/r153-status.txt`,
and the logs in `r153-instruments/`. The engine session's reading the unit answers is
`/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` § Fourth standing reading. All other
paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A red counts only when its log names an assertion
failure. Rule every claim.

1. **The Items.** The diff applies Items 1 to 4 as written and changes nothing else.
2. **The mechanism answers the reading.** On the engine session's reading, the release's pressed-state map carries
   `outline-width` and no `outline-style`, so both release forms read one outline style, and the pressed button's is
   `none`; with every outline and border width whose line style is `none` or `hidden` read at `0px` inside
   `readFormDifferences`, the release's map no longer carries that entry, and Veneer's map is unchanged on Chromium 141.
   No difference that paints is hidden: a width whose style paints a line is returned as read.
3. **The code is lawful.** `LINE_STYLES` and `normalizeLineWidths` satisfy `.claude/rules/names.md` (§ Standalone
   helpers, `normalize*`), `.claude/rules/typescript.md`, and `.claude/rules/architecture.md`; both are exported, pinned
   in the export-list case, and proved; the doc blocks are true.
4. **The proof binds.** The `normalizeLineWidths` case fails with an `AssertionError` against an identity implementation
   (`r153-red.log.txt`) and passes on the tree (`r153-green.log.txt`); its inputs distinguish a mutation that drops the
   `hidden` style, one that drops the border sides, and one that zeroes a width whose style paints.
5. **The guide sentence is true.** The sentence Item 4 inserts is true of `readFormDifferences` and of both builds as the
   evidence records them.
6. **Gates.** Every log the report's gate table names ends with exit 0.
