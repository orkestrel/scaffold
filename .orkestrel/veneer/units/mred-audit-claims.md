# E-ID-MOTION-REDUCED audit — claims

Subject: E-ID-MOTION-REDUCED in `/home/user/veneer-mred` (branch `unit/mred`, uncommitted over Veneer `21c821a`),
briefed by `e-id-motion-reduced-brief.md` (the staged copy with its base filled in is
`e-id-motion-reduced-brief-staged.md`) under `../e-id-motion-design-verdict.md`, its Reduced motion row and unit 2.
Written by `opus` on Opus 5.5 and reported in `e-id-motion-reduced-report.md`. Evidence: `mred.diff` (`git diff 21c821a`),
`mred-status.txt`, and `mred-instruments/` (the plant driver `mred-plants.sh` and applier `mred-plant.py`, the gate
driver, and the logs). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only
when the failing case's message names an assertion failure. Rule every claim.

1. **The release readings.** Bootstrap 5.3.8's `bootstrap.css` writes no reduced-motion rule for the placeholder glow or
   wave and slows both spinners to `--bs-spinner-animation-speed: 1.5s` under the preference, and it already stops the
   progress stripes; so each of the four stops is a departure and the stripes are parity.
2. **The rules.** Under `(prefers-reduced-motion: reduce)` the built cascade declares `animation: none` on
   `.spinner-grow` and `.spinner-border`, `opacity: 1` on `.spinner-grow`, and `animation: none` on
   `.placeholder-glow .placeholder` and `.placeholder-wave`, each through the `reduced-motion` mixin, and no longer
   declares the `1.5s` speed. No `transform` declaration is needed, because the grow spinner's only scale comes from its
   keyframe.
3. **The proofs read the rendered result.** The placeholder and spinner cases read `getAnimations()`, `animation-name`,
   opacity, transform, the box, and the label's rendering and text under the staged preference, and read the running
   timelines before and after it; the grow spinner keeps its `Loading...` label in the accessibility tree.
4. **Red first, and each plant kills.** The failing-first reading (`mred-red.log.txt`) and the `base` plant fail the new
   cases; the `spinner-slow`, `glow-drop`, and `grow-opacity` plants each fail the cases the report names with an
   `AssertionError`; each restore is byte-identical. Each assertion distinguishes its plant from the passing tree.
5. **The ledger rows.** § Departures records the dropped `1.5s` speed for each spinner and § Additions records each new
   declaration, in the tables `npm run test:conformance` measured, and the conformance gate reads them.
6. **The prose is true.** § Spinner classes, § Placeholder classes, § Keyframes, and the two § Compatibility rows state
   only what the cascade and the proofs do: both spinners stop, the grow spinner renders a whole opaque disc and keeps
   its label, both placeholder animations stop, and each names the release's treatment.
7. **No other reader moves.** No engine proof under `tests/src/browser/**` reads a spinner's or a placeholder's
   animation, and the app journeys that read the `glowing-placeholder` key and the grow spinner's running animation run
   without the reduced-motion preference, so this change leaves their readings as they were.
8. **Gates.** The scoped oxfmt check, `npm run check`, `npm run lint:check`, `npm run test:conformance`,
   `npm run test:guides`, and `npm run test:policy` exit 0, and `npm run test:src:styles` reads `Tests 1507 passed`, in
   `mred-instruments/`.
9. **Scope and law.** `mred-status.txt` names only the owned files; the unit's entry builds wrote only its worktree's
   `dist/`. The diff adds no `any`, prohibited assertion, non-null assertion, suppression, nested function declaration,
   hidden helper, mock, or fake; each case title states what the case proves.
