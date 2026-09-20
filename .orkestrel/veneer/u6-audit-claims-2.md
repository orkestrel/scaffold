# U6 audit round 2 — numbered claims

Subject: the cumulative U6 diff in the Test checkout `C:/Users/mikes/WebstormProjects/test`, from
`f49bc7f` (0.0.18) to the working tree, after the fix run Astra made from
`units/u6-brief-3.md` (thread `01a0be54-1ae5-73f3-b99c-dbc65ccd3927`, report
`units/u6-report-3.md`, control logs `units/u6-3-*.log`). Round 1's claims, lane reports,
and verdict are at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-claims.md`,
`u6-audit-verdict.md`, and `units/u6-audit-{reviewer,analyst,checker}-report.md`. Rule on every
claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Read the actual diff (`units/u6-diff.patch.txt`) and the live checkout, never the report
alone. The design is `units/u6-design-planner-report.md` as amended by `u6-design-verdict.md`
under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`. Law:
`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `.claude/rules/` there.

1. **Hold ordering (round 1 findings 14, 15).** In `holdAccessible`, the `POINTER_HOLD` marker is
   read and the double-hold refusal thrown as the first statement of the implementation body,
   before the target resolves; the marker is set before `mousePressed` is sent; a case proves a
   second hold on an absent second name refuses with `Pointer is already held at` rather than the
   absent voice.
2. **Release (finding 15).** `releasePointer` keys `mouseReleased` on the marker alone, so a marker
   whose press never landed is still released; the idle-release and hook cases still pass.
3. **Unnamed axes (finding 16).** `stageMedia` re-sends the effective `prefers-color-scheme` and
   `forced-colors` readings as features beside `prefers-reduced-motion`; cases prove a
   provider-staged dark scheme and an active forced-colors mode each survive a motion-only stage
   and return to the recorded host reading after `releaseMedia`; a case proves the print axis
   survives a motion-only stage (`matchMedia('print')` still true, the print paint still reads).
4. **Discriminating motion proofs (analyst 8, finding 18).** Wherever a media case proves a change
   and a restore, it stages `motion` as the inverse of the host's recorded reading, so the restore
   assertion can fail; no restore assertion compares a value to itself.
5. **Documentation truth (findings 17, 24; analyst 14).** The `releaseMedia` description paragraph
   (TSDoc and the guide `Summary` cell, equal) states that the reset clears every emulated medium
   and media feature so the engine's own readings return, and the `Bounds` bullet names that a
   provider-configured override is cleared; the `stageMedia` `@returns` and the guide say the
   read-back covers `print: true` and either `motion` value and that `print: false` is sent with a
   frame wait and no read-back; the Bounds list is one Markdown list.
6. **Controls with receipts (findings 19, 20).** For each of the scale (`const scale = 1` planted
   in the source), pseudo (the `pseudo` argument dropped from the `getComputedStyle` call), and
   release (the explicit release omitted) controls, a red log and a green log of the same focused
   command exist under `units/`, the red log's failing assertion is the mapped-hold, the
   element-versus-pseudo, or the post-release assertion respectively, and the tree carries no
   plant.
7. **Suite hygiene (findings 22, 23).** No `console.log` the unit added remains in
   `tests/src/browser/helpers.test.ts`; each `it.fails` sentinel case carries a comment stating that
   an assertion inside its body cannot fail the suite and that the following case carries the
   proof.
8. **Bounded waits.** Every `waitForCondition` the fix added has a bounded timeout and a failure
   that names what did not arrive, so a value that never settles reddens the case rather than
   hanging or passing.
9. **Round 1 confirmed claims still hold** on the cumulative diff: one `cdp()` call site through
   `readProperty` and `invokeUnchecked`; `hoverAccessible` is the resolver plus `userEvent.hover`;
   the hold's scale mapping, payloads, marker value, frame wait, and `:active` read-back with
   release-before-refuse; `readStyle`'s `::` check before `CSS.supports`; `readPixels` forwarding;
   the media mapping and the `{}` refusal; every `Surface`, `Voices`, `Limits`, `Bounds`, and
   Patterns row with `Summary` cells equal to TSDoc; every new name absent from the hosted guides;
   only the six owned files changed; no `any`, `as`, `!`, `@ts-*`, `eslint-disable`, nested
   function, or hidden helper.
10. **Gates.** Every gate the third report lists reproduces green on the same tree on managed
    Chromium and `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` is green on Edge (the
    verifier's reading).
