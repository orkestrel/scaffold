# AP-COLOR audit, round 5 — claims

Subject: the AP-COLOR round-5 change in `/home/user/veneer-apc` (branch `unit/apc`, uncommitted over Veneer `712ae72`),
briefed by `ap-color-brief-5.md` to carry M1 to M3 of `apc-audit-4-verdict.md` under its § The seam ruling, written by
`opus` on Opus 5.5, and reported in `ap-color-report-5.md`. The owned diff is `apc-5.diff` (the color test alone), the
status `apc-5-status.txt`, and the instruments and logs `apc-instruments-5/`; round 4's are `apc-4.diff` (the color test
alone), `apc-4-status.txt`, and `apc-instruments-4/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The
earlier rounds held every claim about the source and the other files. Each claim is falsifiable; rule every one.

1. **Scope.** The status equals round 4's; the color test's section of `apc-5.diff` differs from `apc-4.diff` only in
   the added assertions and the retitled cases the report names; `apc-instruments-5/apc-5-status-check.txt` shows every
   other file's diff section equal to round 3's, with a control that fails.
2. **M1 and M2.** Each added assertion reads the element and condition its title names, survived its named mutation
   before it existed, and reads red under it after (`apc-instruments-5/apc-5-mutation-*.log.txt`), with a
   byte-identical restore.
3. **The seam invariant.** Every case title in `tests/src/styles/utilities/color.test.ts` names each element and
   condition its assertions read, exempting controls only, and names nothing they do not read; the narrowed neutral
   title removes a clause that is false.
4. **M3.** `apc-mutate-5.py`'s selectors match the current titles, and it ends a mutation whose selection executed no
   test with `EMPTY SELECTION` and a nonzero exit, as its control log shows.
