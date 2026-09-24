# Audit claims — TIP (`tp`), round 1

Subject: `tp.diff` (the worktree `/home/user/veneer-tp` against `2a3f223`: each untracked owned file as
`git diff --no-index /dev/null <path>`) and `tp-status.txt`, the shared-file patch `tp-shared.patch`
(one unified diff against `2a3f223`), the unit's report `b-modal-tp-report.md`, and its retained logs
under `tp-instruments/` (`tp-failing-first.log.txt`, `tp-mutations.log.txt`, `tp-gates.log.txt`),
against the effective brief `b-modal-tp-brief.md`, the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M1 to M20, § Family record), the
wave-2 terrain `b-modal-w2-terrain-report.md` (§ TIP), the first terrain `b-modal-terrain-report.md`,
and the mid-campaign note `w2-w3-note-1.md`. The unit was written by `opus` on Opus 5.5. Each claim is
falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish
that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
fixed rulings stand (the hint and popover rung bindings, the `reset-text` append per M11, the barrel
and showcase orders, one specimen per explicit side, the plugin rows' shape); the fixture class in
`tests/src/styles/fixtures/mixins.scss` is a file the brief's grant of the mixin case makes necessary,
so the Orchestrator grants it retroactively as the brief's scope gap, not the unit's deviation; the
stacking paragraph stays as the base has it because MODAL rewrites it, and the disagreement between
that paragraph and the filled Alias cell closes when MODAL lands; the validation copy was deleted
before the report, as the brief requires, so a lane rules the gate and mutation claims from the code's
assertions and the retained logs, and names which it read; the `test:setup` timeouts the report
records under load are the Orchestrator's reading.

1. **Scope and delta.** `tp-status.txt` lists exactly the eight owned paths the brief names and
   nothing else; `tp.diff` carries those files and no other; `tp-shared.patch` touches only files the
   brief lists as Shared plus the granted fixture file, applies with `git apply --check` to a fresh
   extract of `2a3f223`, adds no line to a vendored file, an off-limits file, a sibling unit's file,
   `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, or `README.md`, and leaves the
   MODAL, OFFCANVAS, and TOAST entries, the stacking paragraph, the barrel, and the showcase as the
   base has them.
2. **The partials against the oracle.** `_tooltip.scss` and `_popover.scss` write, in the components
   layer, exactly the selectors the inventory records under `tooltip` and `popover` with the recorded
   declarations, departing only where a `#### tooltip` or `#### popover` row records the departure;
   `--bs-tooltip-zindex` reads `var(--vn-stack-hint)` and `--bs-popover-zindex` reads
   `var(--vn-stack-popover)`; each automatic placement is written by `@extend` of its explicit side;
   no literal colour, black, or white is written; no `!important`; the `reset-text` mixin's dropped
   `text-align: left` fallback is recorded as a `declared` row on both keys and cannot change a
   computed value; the minifier rewrites the report names (`#0000`, the merged `border` shorthand)
   leave every expanded declaration equal to the inventory.
3. **The proofs distinguish their mutations.** Each mutation the report names as executed has a
   retained entry in `tp-mutations.log.txt` or `tp-failing-first.log.txt` recording its site, command,
   exits, summary, and failing cases, and the named case's assertions distinguish it from the passing
   case: the literal `1080` and `1070` against the rung bindings (a wrapper retune must move the
   computed `z-index`), the `reset-text` call dropped from each partial, one mixin declaration
   dropped, the `.tooltip.show` rule dropped, two sides' arrow rules swapped, one automatic placement
   extending the wrong side, the header strip and the `:empty` rule dropped, and a literal fill; the
   T-box and P-box cases, whose mutations the report names without executing, distinguish an inset or
   a text size written as the release's literal. A lane names, per mutation, whether the assertion
   distinguishes it, and whether a named mutation with no log leaves its case unevidenced under note 1.
4. **The `reset-text` mixin.** The mixin, appended after the `utility-variable` mixin, writes the
   release's reset declaration set with the `start` alignment alone, the `400` weight and `1.5` rhythm
   through the `--vn-weight-body` and `--vn-line-body` tokens; both partials include it; its case in
   `tests/src/styles/mixins.test.ts` reads every declaration it writes and reddens when any one is
   dropped; a technique two partials share is a mixin under D46, and its name and shape follow the
   existing mixins in `src/styles/_mixins.scss`.
5. **The sections and their specimens.** `TooltipSection` and `PopoverSection` extend
   `SpecimenSection` over their constants; one specimen per explicit side, each alone inside a
   `.viewport` frame with no trigger and no inline style; each tip carries `role="tooltip"` and a
   unique `id`; no specimen carries `data-popper-placement` or `aria-describedby`; tooltip specimens
   carry `show` and popover specimens carry neither `fade` nor `show`; the popover headers are `h2`
   elements; every tip box and arrow lies inside its frame at 390 and 1280; the declined frames (a tip
   without `show`, the automatic placements, the empty popover header) are recorded with their reason
   per M2; the empty-header decline holds under M2, or a lane names the specimen M2 requires; the
   section proofs' case populations derive from `TIP_PLACEMENTS` and the specimen tables (note 1).
6. **Registries and orders.** `CaptureSubject` gains the eight subjects and `CASCADE_KEYS` one resting
   row per specimen reading `background-color` on the tip's inner box or header, never on an arrow,
   so the journey's hanging set stays unchanged; no `DRIVEN_KEYS` row; `listed`, the order case, the
   dash-proof component set, the `Showcase.ts` construction after `AccordionSection`, the
   `app/browser/index.ts` rows, and the `Showcase.test.ts` and `index.test.ts` lists agree with each
   other, with the barrel's `@use` lines after `components/close`, and with M14; the tip case tables
   sit in `tests/setupStyles.ts`, are frozen and exported, and are bound to the inventory by
   derivation in `tests/setupStyles.test.ts`.
7. **The guide.** `guides/veneer.md` gains the `_tooltip.scss` and `_popover.scss` § Files rows,
   `### Tooltip classes` and `### Popover classes` in barrel position, `#### tooltip` and
   `#### popover` tables whose rows equal the rows the report says the gate measured, the selector,
   variable, and `plugin` rows in § Compatibility ending "Owner: J-ENGINE.", the popover-and-hint
   Alias cell, and the rewritten outside-ledger and sanitizer sentences; the plugin rows' obligations
   match `node_modules/bootstrap/js/src/tooltip.js` and `popover.js` at the worktree; the 390 width
   limit the guide states matches the report's measurement; every sentence the patch adds is true of
   what ships and states only which rule applies each value (note 1), claiming nothing for the unread
   `--bs-popover-box-shadow` property.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export;
   the added comments, TSDoc, guide text, and the report follow the writing rule (no banned term, no
   count of a growable set, no list item named by its position, each code token followed by a noun, no
   temporal `new`, `now`, or `currently`, no cross-reference `above` or `below`); the report records
   each gate's command with its result line; a lane lists every count the report states as a finding
   outside the claims for the record.
