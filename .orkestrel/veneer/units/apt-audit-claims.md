# AP-TYPE audit, round 1 — claims

Subject: the AP-TYPE change in `/home/user/veneer-apt` (branch `unit/apt`, uncommitted over Veneer `712ae72`), briefed by
`ap-type-brief.md` under the ruling `appearance-design-verdict.md`, and reported in `ap-type-report.md`. The owned diff
is `apt.diff`, the shared patch `apt-shared.patch`, the status `apt-status.txt`, and the logs, scripts, and probes
`apt-instruments/`, all under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree's compiled cascade is
`/home/user/veneer-apt/dist/src/styles/index.css`; the base cascade is `/home/user/veneer/dist/src/styles/index.css`. The
capture portfolio, when present, is `/home/user/veneer-apt/tmp/capture/states/`. Each claim is falsifiable; rule every
one.

1. **Scope and gates.** The status lists only the brief's owned and shared files. Each gate log ends on exit 0 with the
   count the report states (`test:src:styles` 1439, `test:setup` 320 on its rerun, `test:conformance` 26,
   `test:guides` 20, and `format:check`, `lint:check`, and `check` clean), and the first `test:setup` failure is
   timeouts only.
2. **The rule.** The `fluid` function returns `calc(S - max(S * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px))` for a
   size `S`, and that value equals Bootstrap 5.3.8's compiled responsive value for every default size above 1.25rem at
   a 16px root (compare `node_modules/bootstrap/dist/css/bootstrap.css` for `h1` to `h3`, `.fs-1` to `.fs-3`, the
   display classes, and `legend`) at any viewport width under 1200px.
3. **Population.** In the compiled cascade, `h1` to `h6`, `.h1` to `.h6`, `.fs-1` to `.fs-6`, `.display-1` to
   `.display-6`, and `legend` each declare the fluid value over their own token and a cap of that token inside
   `@media (width >= 1200px)`; `.fs-*` values and caps carry `!important`; heading weight 600, display weight 300,
   and every line height are unchanged; no other emitted declaration differs from the base cascade.
4. **Proof oracle.** `computeFluidSize` in `tests/setupStyles.ts` is an independent TypeScript statement of the rule,
   and `tests/setupStyles.test.ts` pins it to the brief's literal figures (26.28, 23.925, 21.57 and the display row at
   390; 51.7925 for the 101px retune; 24.71 for the 32px `h5`; 12 for the 12px `h6`).
5. **Proof coverage.** The proofs read each selector at 390 and at 1280 against the oracle, the 101px retune at 390,
   1199, 1200, and 1280 with a step under 0.1px, the 12px floor, the 32px `h5`, `<h1 class="fs-6">` at 390 and 1280,
   the weights, and the legend at its default and at 40px.
6. **Mutations.** Each of the seven mutations in the report reddens its named proof with the reading the report states,
   and each restore is byte-identical. For the proof each mutation targets, the assertions distinguish the mutated
   value from the passing one.
7. **Failing first.** The baseline run over the owned partials at `712ae72` reads 34 failed of 73 collected, and each
   proof that passed on the baseline is one the guard mutation reddens.
8. **Moved pins.** Every pin the source change reddened now reads at an explicit viewport, with no pin weakened to a
   range or deleted.
9. **Guide.** Every changed ledger row equals the conformance gate's reading; the `h5`, `h6`, `.h5`, `.h6`, `.fs-5`, and
   `.fs-6` caps sit in the Additions table; the font prose states the rule and its 1.25rem floor truly against the
   code; the new prose states no count and uses no banned term.
10. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression comment, nested function declaration, or
    module-scope helper hidden in a test file; the Sass names follow `.claude/rules/names.md` and `styles.md`; every new
    test is named for what it proves. The inline 1199-to-1200 continuity check the report names in four test files is
    either acceptable repetition or a duplication the consolidation law requires to move to one shared helper.

**Rendered surface.** The heading, display, `.fs-*`, and form frames at 390 show smaller headings than at 1280, the
same heading sizes at 1280 as before, and no heading or display that clips or overflows its specimen.
