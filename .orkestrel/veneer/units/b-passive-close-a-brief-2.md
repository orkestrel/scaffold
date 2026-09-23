# Unit B-PASSIVE-CLOSE-A, round 2 — the two shapes the lint gate refused

Successor to `/home/user/veneer-bpc/tmp/units/b-passive-close-a-brief.md`. What changed and why:
round 1 (`b-passive-close-a-report.md`) applied every obligation and stopped, correctly, on two
shapes the brief prescribed that the gates refuse: the `BUTTON_OUTLINE_CASES` map callback's `mode`
shadows the outer `mode` (`no-shadow`, denied), and the `VENEER_GUIDE_PATH` import in
`tests/setupStyles.test.ts` has no remaining use after the four reads moved to `readVeneerGuide()`
(`no-unused-vars` and `TS6133`). The brief's parenthetical that the inventory needs that import was
wrong: the inventory row is a string literal. This round fixes both shapes and runs the validation
the stop held. The round-1 brief binds where this one is silent.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bpc` (detached at
`d60d91c`, the round-1 writes uncommitted in the tree). Perform the assignment directly and spawn
nothing. Use absolute paths under `/home/user/veneer-bpc` and run every npm and npx command from
there. Do not commit, push, install, or run `git checkout`, `git restore`, `git stash`, `git
reset`, `git clean`, or `git checkout-index`.

## Objective

Both shapes are corrected, and every validation command in the round-1 brief's § Execution exits as
its § Acceptance criteria state.

## Obligations

1. In `tests/setupStyles.ts`, the `BUTTON_OUTLINE_CASES` derivation's map callback skips the tuple's
   mode member and uses the outer `mode` the filter already matched:
   `.filter(([, candidate]) => candidate === mode).map(([role, , fill, , active, focus]) =>
   Object.freeze([role, mode, fill, active, focus] as const))`.
2. In `tests/setupStyles.test.ts`, remove `VENEER_GUIDE_PATH` from the `./setupStyles.js` named
   import list (the `'VENEER_GUIDE_PATH'` string in the export-name inventory stays).
3. Run `npx oxfmt --config .oxfmtrc.json --write` over the two files, then every validation command
   the round-1 brief's § Execution names, from `/home/user/veneer-bpc`.

## Output

Append a `## Round 2` section to `/home/user/veneer-bpc/tmp/units/b-passive-close-a-report.md` (and
return it): the two sites, every gate's exit with counts, `git status --porcelain`, and deviations
per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`.

## Acceptance criteria

The round-1 brief's criteria 1 to 4, with the scoped `oxlint`, `npm run check`, `npm run build:src`,
the scoped browser run, `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides`
exiting 0.
