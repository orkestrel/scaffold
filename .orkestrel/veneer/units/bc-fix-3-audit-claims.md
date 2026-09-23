# B-PASSIVE-C rounds 2 and 3 — audit claims

Subject: the fix rounds `opus` wrote in `/home/user/veneer-bc` from
`/home/user/veneer-bc/tmp/units/b-passive-c-brief-2.md` (interrupted by the session rate limit) and
`b-passive-c-brief-3.md` (its completion) over the round-1 verdicts
(`/home/user/veneer-bc/tmp/units/bc-audit-analyst-verdict.md`, `FAIL 2, 3, 5, 6, 7, 9`;
`bc-audit-reviewer-verdict.md`, `FAIL 6, 7; outside the claims: F1 to F5`;
`bc-audit-checker-verdict.md`, `FAIL 3, 9`). Evidence: `/home/user/scaffold/tmp/audit/bc-fix-3.diff`
(the whole diff against `3a9202a`, untracked files as additions; the round-1 writes are inside it),
`bc-fix-3-status.txt`, and the completion report `/home/user/scaffold/tmp/audit/bc-report-3.md`
(the round-1 report is `/home/user/veneer-bc/tmp/units/b-passive-c-report.md`). The frames sit under
`/home/user/veneer-bc/tmp/capture/states/`. The design is
`/home/user/veneer-bc/tmp/units/b-passive-design-verdict.md`; D15's amendment is
`/home/user/veneer-bc/tmp/units/b-sweep-design-verdict.md` § Amendment; the family record is
`/home/user/veneer-bc/tmp/units/b-passive-family.md`. Rule each claim CONFIRMED, BROKEN, or UNRESOLVED
with `file:line`; rule a claim about a proof on the mutation named and whether the assertions
distinguish it from the passing case.

1. **The palette consequence is proved** (round-1 analyst 2; fix finding 1). In
   `tests/src/styles/components/list-group.test.ts`, the palette case (`paints $paint on a selected
   row through $property and leaves it where the primary role moves`) retunes `--vn-palette-blue`
   and `--vn-color-primary-base` one at a time on the document element and reads the selected row's
   painted `background-color` and `border-color`: the reading follows the palette retune and ignores
   the role retune. Its two rows carry distinct titles. Mutation: `--bs-list-group-active-bg:
   var(--vn-palette-blue)` written as the literal `#0d6efd` in
   `src/styles/components/_list-group.scss` reddens the `background-color` row alone (`1 failed | 32
   passed (33)`), and the partial is byte-identical after the revert (SHA-256 `6249c8cf…55b9`).
2. **The proofs read what they claim** (round-1 analyst 3, checker 3; fix finding 2). (a) In
   `card.test.ts` the tab guard case compares a resting link inside `.card-header-tabs` against the
   active one; the mutation `.active` dropped from the tab selector reddens it (`1 failed | 23 passed
   (24)`). (b) In `list-group.test.ts`, `LIST_GROUP_ACTION_HOSTS` and `LIST_GROUP_ACTION_MARKUP`
   drive a resting host and an `active` host independently, on anchor and button hosts; the
   mutation `:not(.active)` dropped from the hover, focus, and press rules reddens the state cases
   (`3 failed | 30 passed (33)`), where the selected `Ash` and `Fir` read the driven paint. (c) The
   group fixture carries `.card-img-top`, `.card-img-bottom`, and `.card-footer` on a non-last and a
   non-first card, and the embedded list first in one card and last in another; the non-last
   `.card-img-top` rule removed reddens the card-group case (`expected 5 to be +0`). (d) Both
   override cases set the retune on an ancestor so shadowing is read; moving `--bs-card-spacer-x`
   from `.card` to `:root` and `--bs-list-group-item-padding-x` from `.list-group` to `:root` each
   redden the override case alone. Rule each on whether the assertions distinguish the mutation.
3. **Every recorded selector is rendered** (round-1 reviewer F3, analyst 3; fix finding 3). In
   `app/browser/constants.ts`, `Card group` renders one card with `.card-img-top` and `.card-footer`
   and one with `.card-img-bottom`; the `Card list corners` specimen places the group first in one
   card and last in another; `CardSection.test.ts` asserts both (the footer removed from the first
   card reddens it, `1 failed | 1 passed (2)`); `card-list-corners` is a `CascadeKey` row in
   `tests/setup.ts` and a `CaptureSubject` member; no selector the family's § Evidence records for
   the card is rendered by no specimen.
4. **The anchors are real links** (round-1 analyst 7, reviewer 7; fix finding 4). Every
   `.card-link`, header `.nav-link`, and list-group action anchor carries `href="#main"` with
   distinct accessible names; `CardSection.test.ts` and `ListGroupSection.test.ts` assert it (`href`
   removed from `Route` and from `Dispatch lane` each redden one case, `1 failed | 1 passed (2)`);
   every card and list-group frame and accessibility artifact exists for the four variants and each
   artifact records the links in the tree and in the focus order (`Card base`: Batch, Route; `Card
   tabs`: Open, Closed; `Card pills`: Inbound, Outbound; `List group disabled`: Oak, Elm; `List group
   actions`: Dispatch lane, Holding lane, Return lane); the keyboard-walk durations were measured
   before and after and reported.
5. **The guide** (round-1 analyst 6, reviewer 6, F5; fix finding 5). § Card classes names the image
   placements, the header navigations, and the empty slots without a count; both sections' barrel
   sentence reads `The component partial loads in the components layer, at the barrel's Bootstrap
   order`; the button-host state sentence in § List group classes is true of the shipped rules;
   `active` and `disabled` are written as class words wherever the sections name those states; the
   prose follows `.claude/rules/writing.md` (no count, no `should`, no `simply`).
6. **The `LIST_GROUP_KEYS` doc block** (round-1 reviewer F2; fix finding 6) states that the journey
   drives the state, shoots an element frame of the specimen lifted to the document's start, and
   reads the state back after its own shot, with D7's reason (an in-place element frame comes back
   blank); its frames agree with it.
7. **The minor edits** (round-1 reviewer 7; fix finding 7). One comment above the `#{''}` empty
   declarations in `src/styles/components/_card.scss` names why they are written and its compile
   claim holds; the card-group case title reads `only at and above its boundary` without
   interpolating the key.
8. **Scope is honest.** The status equals the round-1 set with no path added or removed (the
   modified and untracked lists in `bc-report-3.md` § `git status --porcelain`);
   `tests/setupServer.test.ts`, `tests/app/browser/sections/ButtonSection.test.ts`,
   `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, and the vendored files are untouched; no
   `tmp/probe/` file remains; the three SHA-256 readings in the report match the tree.
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles`
   `473 passed`; `test:app` `30 passed`; `test:conformance` `17 passed`; `test:guides` `18 passed`;
   `test:policy` `109 passed | 1 skipped`; four capture journeys `26 passed` each; `test:journey`
   `104 passed`; `test:setup` red on the `tests/setupServer.test.ts` Set literal (the Orchestrator's
   integration edit) and the shared-declaration sweep case (closed by B-SWEEP-2 on the session
   branch) and nothing else. UNRESOLVED until the Orchestrator's independent chain; rule `npm run
   check` yourself where the sandbox allows it.
