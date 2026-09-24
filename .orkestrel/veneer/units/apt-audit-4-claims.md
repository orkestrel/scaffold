# AP-TYPE audit, round 4 — claims

Subject: the AP-TYPE round-4 change in `/home/user/veneer-apt` (branch `unit/apt`, uncommitted over Veneer `712ae72`),
briefed by `ap-type-brief-4.md` to carry L1 to L5 of `apt-audit-3-verdict.md`, written by `builder` on Sonnet, and
reported in `ap-type-report-4.md`. The owned diff is `apt-4.diff` (the three files round 4 owns), the status
`apt-4-status.txt`, and the logs `apt-instruments-4/`; round 3's are `apt-3.diff`, `apt-shared-3.patch`,
`apt-3-status.txt`, and `apt-instruments-3/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The
round-3 audit held every other claim; this round rules on the round-4 edits alone. Each claim is falsifiable; rule
every one.

1. **Scope.** The status equals round 3's; against round 3, the round-4 tree changes the `FLUID_SIZE_CASES` TSDoc
   paragraph, the § Font utilities paragraph that opens "The `_font.scss` partial writes every entry", and the
   `_font.scss` comment ahead of the `breakpoint-each` walk, and nothing else; the compiled cascade is byte-identical
   to round 3's (`apt-instruments-4/apt-4-build-styles.log.txt` and the report's `cmp` row).
2. **L1.** The TSDoc paragraph uses one phrase for the floor relation and another for the root relation, and each is
   true of its row.
3. **L2 and L3.** The guide sentence names the partial it describes, the comment says what the walk's empty infix
   means, and each rewrapped paragraph changes no other word.
4. **L4 and L5.** The report's errata correct the round-3 report's two wrong sentences, each true against the logs
   and the files it names, and state no count.
