# E-ID-BUTTON-CASCADE fix-round audit — claims

Subject: E-ID-BUTTON-CASCADE rounds 3 and 4 in `/home/user/veneer-ebc` (branch `unit/ebc`, rounds 1 to 4 uncommitted
over Veneer `e07b3a6`), carrying the findings of `ebc-audit-verdict.md`. Round 3 was briefed by `ebc-brief-3.md`,
written by `opus` on Opus 5.5, and reported in `e-id-button-cascade-report-3.md`; it stopped on item 3, and round 4
(`ebc-brief-4.md`, `builder` on Sonnet, reported in `e-id-button-cascade-report-4.md`) applied the unit's verified
patch under the Orchestrator's ruling that the brief records. Evidence: `ebc-4.diff` (the whole change over `e07b3a6`),
`ebc-4-status.txt`, round 3's `ebc-3.diff`, and the logs and instruments under `ebc-instruments/r3/` and
`ebc-instruments/r4/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The first round's claims
(`ebc-audit-claims.md`) and lane verdicts sit beside them. The compiled cascade is
`/home/user/veneer-ebc/dist/src/styles/index.css`. A unit report's prose is not a claim subject. A mutation counts as a
kill only when the failing case's message names an assertion failure; read every other failure as no kill. Rule every
claim.

1. **Kills.** In `ebc-instruments/r3/logs/ebc-3-mutations-final.log.txt` and the per-mutation `-final` logs, the
   `class`, `target`, `important`, `spacing`, `nav`, and `no-surface` mutations each kill the cases the round-3 report's
   mutation table names, each with an `AssertionError` whose assertion distinguishes the mutation from the passing
   case, and each restore is byte-identical to the live source.
2. **Reduced motion.** `ebc-instruments/r3/probe/revert-3.mjs` turns reduced motion on before any reading, and its log
   reads every `revert` property on each class's button form equal to the release's, except values the class writes.
3. **`.btn` in every state.** The `.btn` forms case in `tests/src/styles/elements/button.test.ts` reads each enabled
   form at rest, hovered, pressed, and keyboard-focused, and each disabled and checked form, against its anchor form;
   it admits under focus exactly `appearance` and `outline-offset`; `outline-offset` differs between a focused button
   and a focused anchor in Chromium with no stylesheet (`ebc-instruments/r3/probe/btn-focus-3.mjs`, its log in
   `ebc-instruments/r3/logs/`); and `state-spacing` kills the case (`ebc-instruments/r4/`).
4. **Tailwind anchor.** The Tailwind pairing case anchors the plain button to the surface's own values, and
   `no-surface` kills it; `tests/fixtures/tailwind/markup.html` is byte-identical to `e07b3a6`.
5. **Term.** No hit of `bare` (case-insensitive) under `src/`, `tests/`, `app/`, or `guides/` names the button surface
   on the `button` tag. The hits that remain name something else, among them the `.btn` class with no role variant, a
   bare import, a bare tag, and a bare panel. No constant carries `BARE` for the button surface.
6. **Titles, comments, and names.** The tag proof's title states the utility exception its assertions read; the
   comment above the first `button` rule in `_button.scss` names what every button keeps; `BUTTON_KEPT_LONGHANDS`
   replaces `BUTTON_REBOOT_LONGHANDS` at every site, and no site names the old constant; the Badge section comment is
   true of the reading in `ebc-instruments/r3/logs/ebc-3-probe-badge.log.txt`.
7. **Scope and law.** Rounds 3 and 4 change only paths `ebc-brief-3.md` and `ebc-brief-4.md` own; the diff adds no
   `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden helper; every added or changed
   case title states what the case proves.
