# U7c guide bounds carried to U7e (from units/u7c-report.md § Guide bounds for U7e)

Parity minimum only: a row or sentence the landed mechanism makes false is corrected; nothing is
added for its own sake.

1. § Showcase names the heading, the Dark mode button, and a Showcase region; the shell now also
   renders a `Buttons` region carrying every `BUTTON_SPECIMENS` row, and `app/browser/main.ts`
   constructs a `Delegate` over the document beside the `Showcase`.
2. § Showcase: the shell stylesheet declares one layout class, `.specimens`, in its own `shell`
   layer; it paints nothing, so the no-paint sentence still holds.
3. § Tests: the proof list gains `tests/app/browser/sections/ButtonSection.test.ts`; the helper
   proofs cover `readingToProjection` in `tests/setup.test.ts` and `resolveSpecimen` and
   `recordState` in `tests/setupBrowser.test.ts`.
4. § Compatibility: every recorded Button step has a live Veneer counterpart driven from the
   journey on both motion axes; the Proof column's meaning is unchanged.
5. § Compatibility: the open forced-colors row is confirmed at run time; the installed
   `MediaOptions` declares `print` and `motion` only.
6. § Tokens or § Departures: the focus ring reads 2.2797472825343092 in light and
   2.358684054793209 in dark against the canvas, the same for every variant because
   `--vn-focus-color` derives from the primary role alone (below the 3:1 non-text minimum).
7. § Tokens or § Departures: the composed text contrast members below 4.5 (every `btn-primary`
   host in dark mode at 2.585598980085744; `btn-outline-light` in light at 1.0541115652738484;
   the full set pinned in the journey) are recorded rather than claimed away.
8. § Tokens: a disabled host is dimmed with element `opacity: 0.65`, which a contrast reader does
   not composite, so its ratio equals its enabled twin's.
9. § Showcase or the ledger's Artifacts row: the capture registry and the per-state frame scopes
   (rest, pressed, focus as page frames; hover and active as element frames).
10. § Examples: no fence shows a consumer's entry constructing a `Delegate`; the showcase's
    `main.ts` is that pattern and the distribution consumer case drives it.

Out-of-scope findings recorded against their owners (not U7e's): Test-side `captureFrame` with
`element` returns an opaque white frame for a specimen beyond roughly 900 px at the 1280 variant
(`button-primary-pressed--light-1280.png` 75×35, 141 bytes) while the 390 variant is correct;
`captureFrame` without `element` clears `:hover` under the pointer; `readStates` announces
`disabled`, not `unavailable`; the paint calibration readings (focus ring below 3:1, dark
`btn-primary` text 2.59:1, light `btn-outline-light` 1.05:1) are the user's open design question.
