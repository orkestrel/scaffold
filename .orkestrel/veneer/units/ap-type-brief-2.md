# Unit AP-TYPE round 2 — exact caps, names, the report, and the guide's scope

Successor to `ap-type-brief.md`, which stays in force for every section this brief does not restate. What changed: the
round-1 audit (`apt-audit-verdict.md`) held the rule, its population, and its mutations, and carries G1 to G5. The
Orchestrator strikes round 1's continuity criterion (the 1199 and 1200 step under 0.1px).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-1 context in `/home/user/veneer-apt` (uncommitted
over `712ae72`).

## Objective

Every capped size pins its exact token, the Sass function and the floor table carry the right names, the continuity
blocks and the inline matrix are gone, and the report and guide state what the code and logs show.

## Context

**Evidence.** Read `/home/user/scaffold/.orkestrel/veneer/units/apt-audit-verdict.md` first, then the three lane
verdicts beside it (`apt-audit-objective-verdict.md`, `apt-audit-subjective-verdict.md`, `apt-audit-checker-verdict.md`).

**Law.** As round 1. Host as round 1, npm 11 through `tmp/units/env.sh`.

**Standing conditions.** AP-COLOR works in `/home/user/veneer-apc` again; its files are off-limits. Format only with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <file> ...` over the files you changed; never `npm run format`, never
`oxfmt --write .`. `dist/src/core/index.js` exists from round 1, and no change here touches `src/core`, so run no
`npm run build` or `npm run build:src`; the styles gate builds the styles itself.

## Unknowns

None.

## Scope

**Owned.** As round 1.

**Shared (report-only).** As round 1; rewrite `tmp/units/apt-shared.patch` from the final tree.

**Off-limits.** As round 1.

## Execution

Perform the assignment directly and spawn nothing.

1. **G2.** At each width at or above 1200, every selector's reading pins the exact token string (for example `36px`),
   as the base did. The tolerance stays only for readings below 1200.
2. **G4.** Rename the Sass function `fluid` to `fluid-size` and update every call, comment, the guide, and the
   `computeFluidSize` remarks. Rename `TYPE_THRESHOLD_CASES` to a name carrying the floor term, and title its case for the
   property it proves. Delete the four 1199-to-1200 continuity blocks and their reading maps; confirm 1199 and 1200 stay
   among the widths each fluid proof asserts against the oracle.
3. **G5.** Move the inline case matrix in `tests/src/styles/mixins.test.ts` to `tests/setupStyles.ts` as a frozen,
   exported table with TSDoc, register it in `tests/setupStyles.test.ts`, and import it.
4. **G3.** In § Font utilities: state that heading and size classes scale their `--vn-size-*` token and display classes
   their `--vn-display-*` token; write "none of these entries takes a breakpoint infix" where the section says the release
   writes none of them responsive; replace "after the walk" with "after every size class".
5. **G1.** The round-2 report's failing-first paragraph names, for each proof that passed on the baseline, the mutation
   that reddens it (the default legend under the cap mutation, the override case under the important mutation), and
   records the `.h4` to `.h6` and `.fs-4` to `.fs-6` defaults as regression pins no rule mutation reaches at a 16px root.
6. Re-run the seven mutations over the renamed function and retain their logs.

## Output

Write `tmp/units/apt-report-2.md` and return the same text: each change by file, the mutation table, the gate table with
log paths, and `tmp/units/apt-2.diff` (`git diff 712ae72` over owned files), `tmp/units/apt-shared.patch`, and
`tmp/units/apt-2-status.txt`.

## Deviation contract

As round 1.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides` exit 0, each
   logged.
3. `grep -rn -E "(^|[^-])fluid\(" src tests guides` returns nothing.
4. Every mutation reddens its named proof, each logged with the restore byte-identical.
5. `git diff 712ae72 --stat` names only owned and shared files.

**Observations, not criteria.** The journey and `npm test`: run neither.

## Review evidence

The Orchestrator supplies `apt-2.diff`, `apt-shared.patch`, `apt-2-status.txt`, the report, and the logs to the round-2
lanes.
