# Unit AP-TYPE round 3 — titles, three guide sentences, and the report

Successor to `ap-type-brief-2.md`, which stays in force for every section this brief does not restate. What changed:
the round-2 audit (`apt-audit-2-verdict.md`) held the rule, the rename, the exact caps, the floor table, and the matrix,
and carries J1 to J5. No rule changes.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-2 context in `/home/user/veneer-apt`.

## Objective

Every test title and guide sentence is true for every row and every token value, and the report claims no more than
its logs.

## Context

**Evidence.** Read `/home/user/scaffold/.orkestrel/veneer/units/apt-audit-2-verdict.md` and the three lane verdicts
beside it. Law, host, formatter, and no-build conditions as round 2.

## Unknowns

None.

## Scope

As round 2, and the guide paragraph that describes the `font.test.ts` proofs (J4) is owned in this round.

## Execution

Perform the assignment directly and spawn nothing.

1. **J3.** Retitle the mixin case so it is true for every `FLUID_SIZE_CASES` row, for example "applies the responsive
   rule to a $size rem size against a $root px root below the 1200px boundary and caps it at the size from the
   boundary".
2. **J5.** `describe('fluid size mixin')` becomes `describe('font size mixin')`, and the `FLUID_SIZE_CASES` TSDoc names
   the `font-size` mixin proof.
3. **J2.** Name `src/styles/utilities/_font.scss` where the section writes "This partial"; state that an element carrying
   `.h1` and `.fs-6` resolves the responsive size derived from `--vn-size-3`, keeping the precedence statement.
4. **J4.** The font proof paragraph states the widths the proofs read (390, 1199, 1200, and 1280, below and from the
   boundary) and lists the size class on a heading tag.
5. **J1.** The round-3 report's failing-first table adds the `.fs-6` later-value case under the guard mutation (18.358px
   against 16px), gives the full `xxl` mutation its own readings, and names the proofs each boundary mutation reddens
   instead of "every size proof".

## Output

Write `tmp/units/apt-report-3.md` and return the same text: each change by site, the gate table with log paths, and
`tmp/units/apt-3.diff` (`git diff 712ae72` over owned files), `tmp/units/apt-shared.patch`, and
`tmp/units/apt-3-status.txt`.

## Deviation contract

As round 2.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides` exit 0, each
   logged.
3. The `src/` hunks of `apt-3.diff` equal those of the round-2 `apt-2.diff`.

**Observations, not criteria.** The journey and `npm test`: run neither.

## Review evidence

The Orchestrator supplies `apt-3.diff`, `apt-shared.patch`, `apt-3-status.txt`, the report, and the logs to the round-3
lanes.
