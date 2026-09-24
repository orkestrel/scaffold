# AP-TYPE audit, round 2 — claims

Subject: the AP-TYPE round-2 change in `/home/user/veneer-apt` (branch `unit/apt`, uncommitted over Veneer `712ae72`),
briefed by `ap-type-brief-2.md` to carry G1 to G5 of `apt-audit-verdict.md`, and reported in `ap-type-report-2.md`. The
owned diff is `apt-2.diff`, the shared patch `apt-shared-2.patch`, the status `apt-2-status.txt`, and the logs and
scripts `apt-instruments-2/`; the round-1 diff and logs are `apt.diff` and `apt-instruments/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists only owned and shared files, and each gate log ends on exit 0 with the count
   the report states: `test:src:styles` 1439, `test:setup` 320, `test:conformance` 26, `test:guides` 20, and
   `format:check`, `lint:check`, and `check` clean. No log shows `npm run build`, `npm run build:src`, or
   `oxfmt --write .`.
2. **G2.** At 1200 and 1280 every size proof pins the exact token string and the oracle value exactly; below 1200 the
   tolerance of 0.005px is the only one left; 1199 and 1200 both stay among the widths each fluid proof reads.
3. **G4, rename.** No `fluid(` call or comment remains; the function is `fluid-size` in its declaration, every call, the
   comments, the guide, and the `computeFluidSize` remarks; the `src/` hunks of `apt-2.diff` differ from those of `apt.diff` only by the rename and its rewrapped comments.
4. **G4, continuity and floor.** The four continuity blocks, their reading maps, and their lookups are gone with no
   property lost; `TEXT_FLOOR_CASES` carries the floor term, keys its rows by `tag`, and its case title names the property
   it proves.
5. **G5.** `FLUID_SIZE_CASES` sits in `tests/setupStyles.ts`, frozen, exported, with TSDoc, registered and pinned in
   `tests/setupStyles.test.ts`, and `tests/src/styles/mixins.test.ts` holds no inline case matrix.
6. **G1.** The report's failing-first table is true against the retained logs: each baseline-passing proof it lists is
   reddened by the mutation it names at the reading it states, and `.h4` and `.fs-4` at their defaults are the only size
   pins no rule mutation reaches. Where the report departs from the brief's G1 wording, the logs support the departure.
7. **Mutations.** Each of the seven mutations reddens its named proof at the reading the report states, and every
   restore is byte-identical.
8. **G3.** § Font utilities states that heading and size classes scale their `--vn-size-*` token and display classes
   their `--vn-display-*` token, uses "responsive" in one sense, names no walk, states no count, and uses no banned term;
   each sentence is true against the code.
9. **Law.** The round-2 diff adds no `any`, `as`, non-null assertion, suppression comment, nested function declaration,
   or module-scope helper hidden in a test file, and every new or retitled test is named for what it proves.
