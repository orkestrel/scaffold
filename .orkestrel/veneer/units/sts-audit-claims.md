# STATES audit — claims

Subject: STATES in `/home/user/veneer-sts` (branch `unit/sts`, uncommitted over Veneer `2376710`), briefed by
`states-brief.md` to carry the tenet audit's claims 7 and 12 (`tenets-styles/tenets-styles-audit-verdict.md`). Written
by `opus` on Opus 5.5 and reported in `states-report.md`. Evidence: `sts.diff` (`git diff 2376710`), `sts-status.txt`,
and `sts-instruments/` (the plant and gate drivers and the logs). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim subject. A mutation counts as a
kill only when the failing case's message names an assertion failure. Rule every claim.

1. **Press is read from paint.** `paints the held thumb with the blue palette entry mixed three tenths over white`
   drives a trusted hold, asserts `:active`, and reads the thumb's painted centre against the resolved `color-mix` and
   the release literal, with the resting fill as its control; the 60% plant fails it with an assertion.
2. **Disabled is read from paint and hit testing.** `lets the pointer through the disabled host and paints its thumb with
   the secondary text color` reads `pointer-events`, a hit test that passes through the disabled host, and the disabled
   thumb's painted fill against a thumb-shaped gauge filled with `var(--bs-secondary-color)`, with the enabled thumb as
   the control; the token plant fails it with an assertion.
3. **The transition is read from paint.** `runs the thumb fill transition with motion allowed and lands each fill at once
   under reduced motion` shows an intermediate painted fill with motion allowed and immediate end fills under the
   reduced-motion preference; the plant that drops the reduced-motion twin fails it with an assertion. The declaration
   readings it keeps are only those the frames cannot show, and the readings it drops are covered by the rendered ones.
4. **The disabled link button.** `dims a disabled link button and its anchor twin to the secondary text and lets the
   pointer through` reads the resolved colour, the `--vn-button-opacity` opacity, `pointer-events`, and a hit test on
   the `<button disabled>` and its `<a class="disabled">` twin against an enabled control; the opacity plant fails it.
5. **No fake motion.** The cases change motion only through the published `--vn-factor-motion` retune and the harness's
   staged preference, use no fake clock, mock, or stubbed animation, release the pointer, pane, media, and factor after
   each case, and hold under load by reading state rather than elapsed time.
6. **The prose.** § Form range classes states how each thumb state is read, true of the cases.
7. **Scope, law, and gates.** The diff changes only the three owned files; it adds no `any`, prohibited assertion,
   non-null assertion, suppression, nested function declaration, or hidden helper; every title states what its case
   proves; `check`, `lint:check`, the scoped styles run, `test:guides`, and `test:policy` exit 0 in
   `sts-instruments/logs/`.
