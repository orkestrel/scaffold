# Unit BARE-BUTTON (`cb`), round 2 — successor brief

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote round 1, in `/home/user/veneer-cb` (branch
`unit/cb` from `a9dff19`). The executor that opens this brief is that subagent.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/cb-audit-verdict.md`) confirmed the scope,
the cascade, the hook, and the ledger, and found one proof gap, two false comments, false guide
sentences, and report defects. This round carries C-a to C-c from that verdict. The original brief
`b-cross-cb-brief.md` stands for everything this brief does not change: its scope, off-limits list,
host facts, tools, and limits.

## Fixes

- **C-a (B6-LIST-GROUP, F1, LIST-GROUP-COMMENT, F2).**
  - In `tests/src/styles/components/list-group.test.ts`, add a case in the form of the dropdown
    button-item case: the disabled `button.list-group-item-action` reads equal to its disabled anchor
    form on `font-family`, `font-size`, and `line-height`; an enabled button action and an anchor action
    focused through the keyboard read equal on `outline-style` and `box-shadow`, with the anchor's
    shadow held to `none`. Retain the red runs under the `font-size: inherit` mutation and the unscoped
    focus-visible mutation.
  - Correct or remove the state case's comment that says a button host carries the elements layer's
    color transition.
  - In the elements and nav cases, change the wrapper's metrics to values no size token and no line
    token resolves to, such as `19px/29px`, update each expected size and line value, and keep each
    comment true. Retain a run showing a universal rule writing `var(--vn-size-5)` and
    `var(--vn-line-body)` reddens the elements case with the changed metrics.
- **C-b (claim 7).** In the shared patch's `guides/veneer.md` changes:
  - Rewrite the § Files row as "…and the calibrated surface and its states on a button with no `class`
    attribute and no `data-bs-target` attribute, in the elements layer."
  - Define the bare button once in the § Styles paragraph by those two attributes, and write "bare
    button" in the § Files row and the Additions Reasons, in place of "a button no class claims".
  - Add the reboot's pointer cursor on an enabled button to the § Styles list, or drop "and nothing
    more", so the list names everything a classed button takes from the elements layer.
  - Split the `data-bs-target` sentence: "The `data-bs-target` attribute keeps the release's carousel
    indicators out as well, because the release gives a resting indicator no class. The attribute sits
    on the tag itself, so the rule still treats the tag by what it carries rather than by where the
    markup puts it."
  - Wrap the § Showcase paragraph at the guide's 100-column width.
- **C-c (claim 3).** In the report's coverage matrix, separate the declarations each form no longer
  takes from the bare rule from the computed values that move because an inherited property changed,
  and list the close control's padding and the indicators' disabled `pointer-events` value with the
  rest.

## Report form

Follow every code token with its noun, quote each gate's literal result line from its log, state no
diff-stat tally, and write no temporal narration.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree; `npm run check` exits 0.
2. The owned-proofs command from round 1 exits 0, and the added list-group case and the changed elements
   case each redden on their named mutations, retained in `tmp/units/cb-mutations-2.log.txt`.
3. With the revised shared patch applied in a scratch copy of `a9dff19`: `npm run test:conformance`,
   `npm run test:guides`, and the Showcase run exit 0; `git apply --check` of the revised patch exits 0
   on a fresh extract.

## Output

`tmp/units/cb-report-2.md` (and the same text as the final message), `cb-2.diff`, `cb-2-status.txt`,
`cb-shared-2.patch` superseding `cb-shared.patch` whole, the interdiffs against round 1, and the
mutation log. Nothing is committed.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix needs a file outside the
round-1 scope. Decide, record, and carry on for the replacement metrics, the case title, and where the
case sits.
