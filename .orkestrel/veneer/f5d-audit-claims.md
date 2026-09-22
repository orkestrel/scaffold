# Audit claims — F5d PHYSICAL in `@orkestrel/veneer` (working tree over `3ff4e9a`, 2026-09-22)

## Subject

The F5d unit, written by `opus` from `/home/user/veneer/tmp/units/f5d-brief.md` under the user's
D11 ruling: every logical property the cascade declared reverts to the physical property
Bootstrap 5.3.8 writes for the same rule; every proof reads the physical property with its
expected value unchanged; the direction tables and scanners in `tests/setupStyles.ts` and the
`index.test.ts` case that forbade physical inline-axis declarations are gone; the guide's
direction sentences and the `img` departure row say physical. The unit's report is
`/home/user/scaffold/tmp/audit/f5d-report.md`.

## What this round decides

Whether F5d lands as one commit. A BROKEN claim in code sends the unit to a fix round; a BROKEN
claim in prose alone is corrected by the Orchestrator at landing.

## Already established — do not re-run

- The census of logical declarations, proofs, machinery, and guide sentences before the unit:
  `/home/user/scaffold/tmp/audit/f5d-terrain.md`.
- The user's rulings D5, D11, D12 (`/home/user/veneer/ROADMAP.md` § Rulings).

## Review evidence

`/home/user/scaffold/tmp/audit/f5d-audit-evidence.md`: the status output, the diff
`/home/user/scaffold/tmp/audit/f5d.diff`, the unit's report, the brief, the terrain, and the
Orchestrator's gate log `/home/user/scaffold/tmp/audit/f5d-gates.log.txt` when present.

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **The compiled cascade declares no logical property.** A `postcss` walk over the unminified
   compile (`sass` with `style: 'expanded'`, `loadPaths: ['src/styles']`) lists no declaration
   whose property matches the terrain's pattern; the report shows the walk before (the population)
   and after (empty), and an independent walk agrees.
2. **Each revert is Bootstrap's property for the same rule.** For every declaration the terrain's
   census lists, the physical property written is the one the oracle inventory records for the
   same selector where the inventory has that selector, in the inventory's longhand order; where
   the inventory has no such selector, the report names the site and the order chosen.
3. **No value, token, selector, or layer changed.** The diff under `src/styles/**` changes property
   names only: every changed line's value text is unchanged, no `--vn-` or `--bs-` token moved, no
   selector text changed, no `@layer` moved. (A two-axis shorthand split into two longhands keeps
   both values.)
4. **Every proof reads the physical property with its expected value unchanged.** For every proof
   the terrain lists, the read property is physical and the expected pixel or string value is the
   same as at `3ff4e9a`; the report names any expectation that changed and why, and the round rules
   whether that change is a rendering difference or an error.
5. **The direction machinery is gone and the kept pieces have consumers.** `PHYSICAL_LONGHANDS`,
   `EDGE_SHORTHANDS`, `RADIUS_SHORTHAND`, `SIDE_KEYWORD_PROPERTIES`, `matchesEdgeShorthand`,
   `matchesRadiusShorthand`, `matchesSideKeyword`, `matchesDirectionSensitive`,
   `filterAsymmetricDeclarations`, and `scanPhysicalDeclaration` appear nowhere under `tests`,
   `src`, or `guides`; `splitTopLevelValues` and `normalizeValueToken` survive only with a consumer
   other than their own proof; the `index.test.ts` physical-property case is gone; the styles setup
   inventory case lists the module exactly.
6. **The case tables carry physical keys.** Every case table in `tests/setupStyles.ts` whose keys
   named a logical property now names the physical one, and its freeze case in
   `tests/setupStyles.test.ts` still binds.
7. **The shared-file patches are exact and complete.** The report returns patches for
   `tests/distribution.test.ts` and `tests/app/browser/integration.test.ts` that replace every
   logical read the terrain lists there, and nothing else.
8. **The guide is true and in parity.** No § Styles or § Deferred selectors sentence names a logical
   property or direction neutrality as the cascade's policy; the `img` departure row is corrected
   or deleted with the reason stated; the D5 byte-stream sentence is untouched (F6's);
   `npm run test:guides` passes.
9. **The gate chain is green.** Every `=== <gate> exit=` line in the Orchestrator's gate log reads
   `exit=0` (UNRESOLVED if the log is absent when you read it).
10. **Scope is honest.** `git status --porcelain` lists only the owned files the brief names; nothing
    under `src/browser/**`, `src/core/**`, `app/**`, `configs/**`, `tests/fixtures/**`,
    `tests/setupServer.ts`, or `tests/conformance.test.ts` changed; no probe remains under
    `tmp/probe/`.
11. **Prose holds.** No changed prose line contains a banned term in a banned sense (pattern
    `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`,
    case-insensitive), and no count of a growable set is stated as a number.
12. **The unit is coherent.** The kept selector normalizer and shadow reader still have one job
    each; no helper duplicates an installed `@orkestrel/test` export; the guide's § Styles reads as
    one policy (Bootstrap's physical properties) with no residue of the direction-neutral design.

## Unknowns

- Which expectations changed under the physical read, if any; the report says.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose and the Orchestrator corrects
it at landing. A BROKEN claim in code (1 to 7) opens a fix round. A lane that returns no verdicts
is a lane that did not run.
