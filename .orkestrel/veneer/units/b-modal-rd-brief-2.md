# Unit RAMP-DOWN (`rd`), round 2 — successor brief

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote round 1, in `/home/user/veneer-rd` (branch
`unit/rd` from `42fd88e`). The executor that opens this brief is that subagent.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/rd-audit-verdict.md`, with the lane
verdicts beside it) confirmed the twin, the byte equality, the offcanvas stop, and the guide, and ruled
that the offcanvas partial keeps its walk. It found that the fixture case does not pin the twin's
direction and that two comments state the refactor the ruling keeps out. This round carries R-a to R-c.
The round-1 brief `b-modal-rd-brief.md` stands for scope, host facts, tools, and limits, with one
change: the `_offcanvas.scss` partial is owned for its comment alone.

## Fixes

- **R-a (claim 4).** Make the fixture case in `tests/src/styles/mixins.test.ts` distinguish the twin
  writing `breakpoint-up($name)` in place of `breakpoint-down($name)`: mount the named ramp specimens
  and read their padding below and at each boundary through the viewport helper the sibling case
  uses, or assert each condition's comparator. Keep the selector and yielded-boundary assertions and
  the zero-branch control. Retain the red run with the `breakpoint-up` mutation.
- **R-b (F1).** In `src/styles/_mixins.scss`, state that the twin emits the unsuffixed rule set first,
  ahead of the named entries, and limit the comment's final sentence to a family whose unsuffixed class
  comes first. In `src/styles/components/_offcanvas.scss`, rewrite the comment above the bare panel: the
  partial keeps its own walk because the release writes each responsive panel's below-boundary and
  at-and-above blocks together, one name at a time, and writes the bare panel after all of them, an
  order the `breakpoint-each-down` mixin cannot reproduce. The built stylesheet stays byte-equal to
  `rd-base.css`.
- **R-c (claim 6).** Run `npm run test:guides` in a scratch copy with `rd-shared.patch` applied and
  retain the log.

## Report form

Follow every code token with its noun, write no temporal word (`still`, `no longer`), quote each gate's
literal result line from its log, state no diff-stat tally, and retain every file the report names.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0; `npm run check` exits 0.
2. `npm run build:src` exits 0, and `cmp` of the built stylesheet against `rd-base.css` exits 0.
3. `npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/modal.test.ts
   tests/src/styles/components/table.test.ts tests/src/styles/components/offcanvas.test.ts` exits 0, and
   the case reddens under the `breakpoint-up` mutation, retained in `tmp/units/rd-mutation-2.log.txt`.
4. With `rd-shared.patch` applied in a scratch copy, `npm run test:guides` exits 0, retained in
   `tmp/units/rd-guides-2.log.txt`.

## Output

`tmp/units/rd-report-2.md` (and the same text as the final message), `rd-2.diff`, `rd-2-status.txt`,
`rd-shared-2.patch` if the shared patch changes (else say it is unchanged), and the logs. Nothing is
committed.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix changes the built
stylesheet's bytes or needs a file outside the round-1 scope and the offcanvas comment. Decide, record,
and carry on for the reading method in R-a and the comments' wording.
