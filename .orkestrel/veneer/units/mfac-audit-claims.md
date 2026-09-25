# E-ID-MOTION-FACTOR audit — claims

Subject: E-ID-MOTION-FACTOR in `/home/user/veneer-mfac` (branch `unit/mfac`, uncommitted over Veneer `b613ae4`), briefed
by `e-id-motion-factor-brief.md`. Written by `opus` on Opus 5.5 and reported in `e-id-motion-factor-report.md`.
Evidence: `mfac.diff` (`git diff b613ae4`), `mfac-status.txt`, and `mfac-instruments/` (the proof, plant, and gate
drivers, the shared-file patch `mfac-motion-function.patch`, and every log). All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim.

1. **Every owned transition scales.** The floating label, the progress bar, nav, pagination, the navbar toggler, and the
   accordion button's transition each resolve to the release's duration and easing at a motion factor of `1`, to twice
   that duration at `2`, and to no transition at `0`; the accordion chevron, the collapse, modal, offcanvas, carousel,
   tooltip, popover, toast, and `.fade` rules are untouched; and no other transition in `src/styles` keeps a literal
   duration outside the rules other motion units own.
2. **The per-site form.** The `0.15s` sites read `--vn-motion-feedback`, which resolves to `150ms` at a factor of `1`;
   the `0.1s` and `0.6s` sites write `calc(<ms> * var(--vn-factor-motion))`, because no motion token resolves to either;
   and each easing stays the release's.
3. **The proofs.** Each owned site's case drives the real change and reads the running transition through
   `sampleTransition`: the factor-`1` duration and easing equal the release's, the factor-`2` duration divided by the
   factor-`1` duration equals `2`, and the factor `0` starts no transition. Each case failed at its ratio on the base
   partials (`mfac-red.log.txt`) and passes after (`mfac-green.log.txt`), and the pagination and floating-label plants
   fail with an `AssertionError` and restore identically.
4. **The ledger rows.** Each changed declaration has a § Departures row whose values equal the built cascade's, the
   `tokenized` member is true of each, and removing one row fails `npm run test:conformance` with an assertion
   (`mfac-plant-ledger.log.txt`).
5. **The § Factors paragraph.** Its exception list names exactly the transition timings that keep a release literal in
   the built cascade at `b613ae4`, and every other sentence of the paragraph, and each family section's rewritten
   transition prose, is true of the built cascade.
6. **The engine pin.** `tests/src/browser/Tab.test.ts` pins the nav link's `transitionDuration` as `0.15s, 0.15s, 0.15s`,
   which holds at a factor of `1` after this change, and the Tab and ScrollSpy proofs pass after it
   (`mfac-engine-read.log.txt`); the pin is a literal the cascade owns, which E32 forbids an engine proof to hold.
7. **The shared-file patch.** `mfac-motion-function.patch` adds `@function motion($duration)` to `src/styles/_mixins.scss`
   and rewrites the floating-label and progress sites to call it; the compiled cascade is byte-identical with and without
   it; and `.claude/rules/styles.md` places a declaration form two partials repeat in the mixins file.
8. **Scope and gates.** The status names only owned files and `git diff b613ae4 -- src` touches only the six partials;
   the oxfmt check, `npm run check`, `npm run lint:check`, `npm run test:conformance` (on its unloaded re-run),
   `npm run test:guides`, and `npm run test:policy` exit 0 in `mfac-instruments/`, and the whole styles project reads
   green.
