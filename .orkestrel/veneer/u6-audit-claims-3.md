# U6 audit round 3 — numbered claims

Subject: the cumulative U6 diff in the Test checkout `C:/Users/mikes/WebstormProjects/test`, from
`f49bc7f` (0.0.18) to the working tree, after the second fix run Astra made from
`units/u6-brief-4.md` (thread `01a0be6c-d381-75a3-93f4-7c34d642ef29`, report
`units/u6-report-4.md`, logs `units/u6-round4-*.log`). Rounds 1 and 2 are recorded at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict.md`,
`u6-audit-verdict-2.md`, and the lane reports under `units/` there. Rule on every claim with
`CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact text).
Read the actual diff (`units/u6-diff.patch.txt`) and the live checkout, never the report alone.
The design is `units/u6-design-planner-report.md` as amended by `u6-design-verdict.md` under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`. Law:
`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `.claude/rules/` there.

1. **`releaseMedia` settles (round 2 findings 11, 16).** `releaseMedia` samples the axes it
   carries before clearing, sends the reset, then waits until `matchMedia('print')` is false and
   the readings are unchanged across consecutive polls, refusing
   `Media emulation did not clear from the tester` when the budget expires; a case reads every
   media axis on the line after `await releaseMedia()` with no wait of its own and passes; the
   Patterns fence clears emulation before recording the host preference.
2. **`stageMedia` waits per query (finding 12).** Each staged query is awaited through a bounded
   wait rather than read once, keeping
   `Media emulation did not reach the tester: <query>` as the exhaustion voice.
3. **Refusal restores rather than clears (finding 13).** On that refusal `stageMedia` re-sends the
   effective medium and features it carried into the call, waits for the restoration, and then
   throws; a case drives a real refusal and reads a provider-staged override back afterwards. The
   case's mechanism is a real engine refusal, not a replacement of any browser API or provider
   member; judge whether its options object (whose `print` accessor answers differently on
   successive reads) is a legitimate hostile-input fixture under `AGENTS.md`'s ban on mocks and
   behavioural fakes, or a fake that the ban reaches.
4. **Axis cases stage the inverse (finding 14).** The colour-scheme and forced-colors cases record
   the host reading, stage its inverse, assert the inverse arrived before calling `stageMedia`,
   prove it survives the motion-only stage, and read the recorded value back after the release; no
   assertion in them compares a value to itself on any host.
5. **`releasePointer` keeps the marker (finding 15).** The marker is removed only after the
   `mouseReleased` send resolves, in a `finally` that still parks the pointer, so a rejected send
   leaves the marker for a retry; a case drives a real CDP rejection and proves the marker
   survives and a corrected retry clears it and `:active`. The idle path stays silent.
6. **`stageMedia` remarks (finding 17).** The remarks name the axes the call carries and say that
   another emulated feature the provider configured is cleared, matching the guide's `Bounds`.
7. **Guide parity.** Every `Summary` cell still equals its TSDoc description paragraph; the new
   `releaseMedia` exhaustion voice has a `Voices` row quoting the shipped sentence; the settle
   bound, the refusal restoration, the narrowed omitted-axis sentence, and the pointer retry each
   appear in `Bounds` or `Limits`; `test:guides` is green.
8. **Waits are bounded and discriminating.** Every wait the fix added carries a budget and a
   description naming what did not arrive, and no wait can pass without the fact it names being
   true; the stability rule (unchanged readings across consecutive polls) cannot resolve while an
   override is still reported.
9. **Every earlier contract holds** on the cumulative diff: one `cdp()` site through
   `readProperty` and `invokeUnchecked`; the hold's ordering, marker-before-press, scale mapping,
   and `:active` read-back; `readStyle`'s `::` check before `CSS.supports` and `readPixels`
   forwarding; the media option mapping and the `{}` refusal; the six owned files and nothing
   else; no `any`, `as`, `!`, `@ts-*`, `eslint-disable`, nested function, hidden helper, or
   `console` statement; no case name carries a control identifier.
10. **Gates.** Every gate the fourth report lists reproduces green on the same tree on managed
    Chromium, the two consecutive browser-project runs agree, and
    `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` is green on Edge (the verifier's reading).
