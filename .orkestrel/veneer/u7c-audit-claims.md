# U7c audit round 1 claims

Subject: unit U7c in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), written by
`opus` on native Opus 5 under `units/u7c-brief.md` with the dispatch message
`units/u7c-dispatch-message.txt` (both retained under `.orkestrel/veneer/units/`), report
`units/u7c-report.md`, over the U7b landing `0cbb563`. Evidence rendered by the Orchestrator:
`units/u7c-diff.patch.txt` (`git diff 0cbb563` plus `--no-index` renderings of the untracked
files) and `tmp/audit/u7c-status.txt`. Rule on the diff and the live files, never on the report's
word alone. Scope: implementation only, by the user's ruling: correctness, rule compliance, test
sufficiency, scope honesty; no wording, comment, doc-block, or guide-prose finding. Opus wrote the
unit, so the Astra analyst holds the objective lane and the Opus reviewer the subjective lane.
Claims marked `[mechanical]` are the checker's; every other lane rules on every claim. An extra
finding is an implementation defect with a site and a one-line failure scenario, numbered from 10.

1. The section family: `app/browser/sections/ButtonSection.ts` renders every row of the frozen
   `BUTTON_SPECIMENS` table (`app/browser/constants.ts`) into a `.specimens` grid with the row's
   tag, its class attribute verbatim, and its other attributes; constructs one `Button` engine per
   host that carries no `data-bs-toggle` and leaves every delegated host to the `Delegate`;
   destroys its engines in construction order; and destroys idempotently. `SectionInterface` and
   `ButtonSpecimen` in `app/browser/types.ts` carry readonly, single-word members. The family sits
   in `app/browser/sections/` with a star-export barrel that `app/browser/index.ts` re-exports;
   `Showcase` holds `#sections`, constructs them after its region, and destroys them first;
   `app/browser/main.ts` constructs a `Delegate` beside the `Showcase`; the `.specimens` rule in
   `app/browser/styles/_shell.scss` is layout only in the `shell` layer and paints nothing.
2. The table is proven, not described: `tests/app/browser/sections/ButtonSection.test.ts` renders
   the rows, cross-checks the table's `btn-*` classes against the class tokens `readCascade()`
   reports for the loaded cascade (a shipped variant the table omits reddens), asserts the
   ownership partition (the delegated specimens `Anchor`, `Toggle`, `Pressed`, `Disabled`,
   `Label`; an engine on every other host), release on destruction, and idempotent destruction;
   `tests/app/browser/Showcase.test.ts` asserts the section order, the rendering, and engine
   release at shell destruction; and every one of these cases can fail on the code it names.
3. The projection: `ButtonReading`, `ButtonProjection`, and `readingToProjection` in the
   host-independent `tests/setup.ts` (proven in the Node `setup` project, a reversed mutation order
   distinguished), with `recordState` and `resolveSpecimen` in `tests/setupBrowser.ts`; one reducer
   serves the oracle fixture's `after` reading and the live reading because the fixture satisfies
   `ButtonReading` structurally, and a one-sided reversal in `recordState` reddens the oracle
   comparison (report § Controls), so the comparison binds to the live side. Deviations D1 and D5
   are sound against `.claude/rules/tests.md` and the brief's own criterion 4.
4. The journeys in `tests/app/browser/integration.test.ts`, on every journey variant: the
   delegated click landing on the `Label` span (targets, cancelled, the host's pressed state on
   two clicks); the keyboard drives (space and enter on `Toggle`, enter on `Anchor` reached by
   traversal); the refusals (`disabled` in `readStates` for the native `disabled` button and the
   `aria-disabled` anchor, the exact refusal sentence, no mutation and no click recorded); the
   covered host (`readHit` returns the cover, the hold rejects with its sentence, no `aria-pressed`
   written, the host reached after the cover is removed); the focus ring reached by Tab with
   `readRing` equal across every specimen in a mode; the composed contrast set pinned (finite,
   above 1, the members below 4.5 enumerated, so a variant leaving or joining the set reddens);
   hover and active colour readings with release clearing `:active`; motion
   (`transition-duration` under `stageMedia({ motion: false })` and after `releaseMedia`); and the
   oracle: every recorded step driven and compared in the recording's order on both motion axes,
   the fixture's step membership per motion marker asserted equal to what was driven,
   `oracle.excluded` asserted empty against the fixture. Each assertion binds to a property the
   code can lose; none is vacuous.
5. The capture registry: `STATES` gains the ten `button-primary-*` states (rest, pressed, focus,
   hover, active, each with its dark twin); `PLACED` equals `STATES` on every run; the filename and
   placement proofs stay on; `CAPTURE=1` writes `<state>--<variant>.png` and the run's membership
   proof (`it.runIf(CAPTURE)`) asserts the written paths; rest, pressed, and focus are page frames
   and hover and active are element frames with the state re-read after the shot; no frame
   duplicates another (the disabled and outline hosts sit in every frame). Deviation D6 sits
   inside the brief's `button-{variant}-{state}` contract.
6. The consumer case in `tests/distribution.test.ts`: `bundleEntry` takes a named drive; the
   `installed entry ./browser` case imports `Button` and `Delegate` from the packed archive's
   `./browser` entry, constructs a `Delegate` over a detached root, toggles a `data-bs-toggle`
   host through a dispatched click and a plain host through its own engine, destroys both, and
   asserts the exact reading `['rest=null', 'pressed=true', 'active=true', 'engine=true',
   'released=null', 'restored=false']`; it ran rather than skipped, and the `runIf` misses are the
   pre-existing root-entry browser drives and `./browser` Node drives only.
7. `[mechanical]` No new surface and no unowned change: `package.json` is untouched (exports `.`,
   `./browser`, `./server`, `./styles`); `src/**`, `guides/**`, `configs/**`, the vendored
   `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
   `tests/setupConformance.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`,
   `tests/setupListeners.ts`, and `tests/fixtures/**` are absent from the diff and the status;
   the status shows exactly the brief's owned set plus the two new `sections/` directories; the
   export-set assertions in `tests/app/browser/index.test.ts` and `tests/setupBrowser.test.ts`
   name the new exports; the class sits in a lowercase plural family folder as a family of one
   with its barrel (the placement convention).
8. `[mechanical]` Law: in the diff no `any`, no assertion outside `as const`, no non-null
   assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property,
   no nested function outside the permitted anonymous forms, no skipped case other than
   `it.runIf`, no case named for a control, no `PLANT` residue; every module-scope helper added is
   exported and tested; the `Label` specimen's exclusion from the oracle comparison is asserted in
   code with the reason the report gives; the controls' files carry their pre-plant digests
   (report § Controls) and the one post-control comment correction was re-gated.
9. The gates the report records exit 0 on managed Chromium and Edge (`format:check`,
   `lint:check`, `check`, `build`, `test:setup`, `test:setup:browser`, `test:app:browser`,
   `test:journey`, `CAPTURE=1 test:journey`, `test:distribution`, `test:policy`, `test:guides`,
   `npm test`); the verifier lane re-runs the chain on the host and its reading rules this claim.
