# U6 audit round 4 — numbered claims

Subject: the cumulative U6 diff in the Test checkout `C:/Users/mikes/WebstormProjects/test`, from
`f49bc7f` (0.0.18) to the working tree, after the third fix run Astra made from
`units/u6-brief-5.md` (thread `01a0be83-905a-7512-92f0-4413a06e0b10`, report
`units/u6-report-5.md`, logs `units/u6-5-*.log`). Rounds 1 to 3 are recorded under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/` (`u6-audit-verdict.md`, `-2`, `-3`
and the lane reports under `units/`); round 3's § Ruling on the settle is the design this round
judges. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). Read the actual diff (`units/u6-diff.patch.txt`) and the
live checkout, never the report alone. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`
and `.claude/rules/` there.

1. **The marker (verdict-3 § Ruling).** `MEDIA_STAGE` (`data-media-stage`) is declared in
   `src/browser/constants.ts` in alphabetical place with a TSDoc naming its value form; the first
   `stageMedia` on an unmarked root reads the four axes (`print`, `prefers-reduced-motion:
   reduce`, `prefers-color-scheme: dark`, `forced-colors: active`) and parks them as the marker's
   value before its first send; a later stage keeps the first marker; the value form the report
   names (an ordered bit string) is what the code writes and reads.
2. **Release to a knowable target.** With the marker present, `releaseMedia` re-sends the recorded
   readings as explicit emulation, waits per axis until each reading equals its recorded value,
   then removes the marker; with no marker it sends the empty reset, takes its baseline strictly
   after the send, and waits for a later reading equal to that baseline; the exhaustion voice is
   `Media emulation did not clear from the tester`; no path seeds a streak from a pre-reset
   sample.
3. **Proofs of the settle.** A provider-staged inverse on each of the colour-scheme and
   forced-colors axes survives a stage-and-release round trip and reads its staged value on the
   line after `await releaseMedia()`; the all-axis immediate-read case still passes; a case reads
   a stable value after a release with nothing staged; the media Patterns fence and its
   transcription clear emulation before recording the host preference.
4. **One read per option.** `options.print` and `options.motion` are each read once in
   `stageMedia`; the accessor fixture is gone; the guide's `Bounds` states that the read-back
   exhaustion path cannot be driven from inert input against a conforming engine and that its
   restoration is covered by review.
5. **Guarded restoration.** The refusal-path restore (send and wait) sits inside its own
   `try`/`catch`; the refusal `Media emulation did not reach the tester: <query>` always reaches
   the caller, with a restore failure attached as `cause`; the guide states the refusal path can
   take two budgets.
6. **Pointer marker on a rejected press.** `holdAccessible` records the marker only after the
   `mousePressed` send resolves (or removes it on rejection before rethrowing), keeping
   release-on-miss; the `POINTER_HOLD` remark in `constants.ts` states the release removes the
   marker only after the button-up send resolves; a case proves a rejected protocol press leaves
   no marker and a completed hold leaves one; `releasePointer`'s park failure surfaces with the
   release rejection attached rather than replacing it.
7. **Bounds and parity.** `Bounds` states that a release restores readings as explicit emulation
   rather than removing every override, that a release with nothing staged yields a stable
   rather than proved-clear reading, that the budget is checked between polls so a frame that
   never paints is not bounded, and the park-failure shape; the `MEDIA_STAGE` `Surface` row and
   every `Summary` cell equal their TSDoc description paragraphs; the exhaustion voice has its
   `Voices` row; `test:guides` is green.
8. **Controls.** The media control (`-t Media`) and the pointer control (`-t holdAccessible`) each
   have a red log and a green log of the same command under `units/`, the red reading is the
   one the report names (the old release returning `[false, false, false, false]` where the
   provider-inverse case requires `[true, true, true, true]`; the marker read `[[true]]` where
   `[[false]]` is required with the marker moved before the press), and the tree carries no
   plant.
9. **Every earlier contract holds** on the cumulative diff: one `cdp()` site; the hold's ordering,
   scale mapping, and `:active` read-back; `readStyle`'s `::` check before `CSS.supports`;
   `readPixels` forwarding; the media option mapping and the `{}` refusal; the six owned files and
   nothing else (`src/browser/types.ts` and `tests/setup.ts` unchanged since round 2); no `any`,
   `as`, `!`, `@ts-*`, `eslint-disable`, nested function, hidden helper, or `console` statement;
   no case name carries a control identifier.
10. **Gates.** Every gate the fifth report lists reproduces green on the same tree on managed
    Chromium, the two browser-project runs agree, and
    `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` is green on Edge twice (the verifier's
    reading).
