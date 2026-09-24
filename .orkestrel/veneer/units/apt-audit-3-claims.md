# AP-TYPE audit, round 3 — claims

Subject: the AP-TYPE round-3 change in `/home/user/veneer-apt` (branch `unit/apt`, uncommitted over Veneer `712ae72`),
briefed by `ap-type-brief-3.md` to carry J1 to J5 of `apt-audit-2-verdict.md`, and reported in `ap-type-report-3.md`. The
owned diff is `apt-3.diff`, the shared patch `apt-shared-3.patch`, the status `apt-3-status.txt`, and the logs
`apt-instruments-3/`; round 2's are `apt-2.diff`, `apt-shared-2.patch`, and `apt-instruments-2/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists only owned and shared files; each gate log ends on exit 0 with the count the
   report states (`test:src:styles` 1439, `test:setup` 320, `test:conformance` 26, `test:guides` 20, and
   `format:check`, `lint:check`, and `check` clean); the `src/` hunks equal round 2's; no `fluid(` remains.
2. **J3 and J5.** The mixin case title is true for every `FLUID_SIZE_CASES` row, and the describe label and the table's
   TSDoc name the `font-size` mixin.
3. **J2.** § Font utilities names the `_font.scss` partial where it had "This partial", and its `.h1` with `.fs-6`
   sentence is true for any `--vn-size-3` value at any viewport while keeping the precedence claim.
4. **J4.** The font proof paragraph names the widths and cases the `font.test.ts` proofs read, and nothing they do not.
5. **J1.** The report's failing-first table and mutation section match the round-2 mutation logs row by row: every
   reading is attributed to the mutation that produced it, the later-value case is listed, and the boundary mutations
   are said to redden exactly the proofs their logs show.
6. **Law and prose.** The round-3 diff adds no `any`, `as`, non-null assertion, suppression, nested function
   declaration, or hidden helper; the new prose states no count and uses no banned term; every retitled test is named
   for what it proves.
