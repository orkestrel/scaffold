# U6 audit round 6 — numbered claims

Subject: the cumulative U6 diff in the Test checkout `C:/Users/mikes/WebstormProjects/test`, from
`f49bc7f` (0.0.18) to the working tree, after the run a native `builder` made from
`units/u6-brief-7.md` (report `units/u6-report-7.md`) on round 5's findings
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-5.md`). Rule on every
claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Read the actual diff (`units/u6-diff.patch.txt`) and the live checkout, never the report
alone. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `.claude/rules/` there.

1. **`releasePointer`'s `@throws` (round 5 analyst 3).** The sentence states the shape the code
   builds at `src/browser/helpers.ts:658`: when both the release and the park reject, the
   aggregate carries the park rejection as its `cause` and the release rejection in its `errors`;
   the `@remarks` beside it and the `Bounds` bullet agree; the `Summary` cell still equals the
   description paragraph.
2. **The rejected-press case (round 5 reviewer 4).** The case that opens with a direct protocol
   rejection carries no assertion reading `POINTER_HOLD` before any hold; its name says the
   marker is recorded only after the press send resolves; the `pointerdown` recorder and
   `expect(markers.calls).toEqual([[false]])` remain and discriminate.
3. **`holdAccessible`'s failure shape (round 5 reviewer 9).** Its `@throws`, its `@remarks`, and
   the `Bounds` bullet say the missed-press refusal can carry a release rejection as `cause`.
4. **The wrap (round 5 reviewer 8).** No line of the `stageMedia`/`releaseMedia` bullet in
   `guides/test.md` runs past the bullet's column or ends mid-sentence.
5. **Nothing else moved.** Outside those items the diff is byte-identical to the round-5 tree: the
   recorded-readings settle, the option locals, the guarded restoration, the marker-after-press
   ordering, the missed-press `try`, the sentinels without a unit identifier, the six owned files
   and nothing else; no `any`, `as`, `!`, `@ts-*`, `eslint-disable`, nested function, hidden
   helper, or `console` statement.
6. **Gates.** Every gate the seventh report lists reproduces green on managed Chromium and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` is green on Edge twice (the verifier's
   reading).
