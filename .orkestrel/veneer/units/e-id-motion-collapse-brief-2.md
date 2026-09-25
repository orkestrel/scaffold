# Unit E-ID-MOTION-COLLAPSE, continued — the fade proof's collapse pin joins the owned set

Successor to `e-id-motion-collapse-brief.md` (staged as `tmp/units/mcol-brief.md`), which stays in place unedited and
still binds except where this brief overrides it. What changed: the unit stopped before any edit
(`e-id-motion-collapse-stop-report.md`), because `tests/src/styles/components/fade.test.ts` pins the collapse's
`['height', '0.35s', 'ease']` in the case `yields the transition to the collapsing rule on an element carrying the fade
and collapsing classes`, and that file was off-limits. The Orchestrator's search had covered the collapse and accordion
files only.

## The ruling

- **Owned, added.** That one case in `tests/src/styles/components/fade.test.ts`, its comment included. The case proves
  the load order of the fade and collapse partials, so it must not pin the collapse's timing: compare the element that
  carries both classes with a plain `.collapsing` element, as the stop report proposes, and keep the lone fading
  element's reading. Settle the wording and the assertion shape yourself, under `.claude/rules/tests.md`; name the case
  for what it proves.
- **Proof of the rewritten case.** Add a plant, `fade-order`, that loads the fade rule after the collapse rule for the
  compound element (for example a scene stylesheet giving `.fade.collapsing` the fade's opacity transition in a later
  layer), and confirm the rewritten case fails with an `AssertionError`; log it beside the other plants and restore.
- Everything else is as the original brief states. Proceed from its Execution step 1.

## Output

As the original brief states, in `tmp/units/mcol-report.md`, covering the stop and everything after it.
