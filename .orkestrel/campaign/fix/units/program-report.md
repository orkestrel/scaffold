# Unit breaking-program — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s15-22** — applied: Renamed in place in src/core/helpers.ts: programDefinition -> buildProgramDefinition (:999), noticeDefinition -> buildNotice (:1034), aggregateDefinition -> buildAggregateDefinition (:1056), emptySums -> buildEmptySums (:844), emptyTallies -> buildEmptyTallies (:889); no factories.ts entry, no create* prefix, no collision. Every consumer, @example, types.ts doc text, guide row and fence, README fence, and test updated; the five TSDoc first sentences rewritten third person.
- **s15-23** — applied: copyJSONValue deleted; its single caller (the metadata copy inside buildProgramDefinition) calls structuredClone; no cloners.ts; the unused JSONValue import dropped; guide row, fence import, fence call, and the 'deep-copy metadata' clause removed; the describe('copyJSONValue') block deleted and one case added pinning that buildProgramDefinition keeps an own __proto__ metadata key without touching the copy prototype (proved discriminating by a probe: structuredClone keeps the own key, a naive per-key clone loses it).
- **carry: qualifier, rater, reason** — applied: isQualificationValidationResult -> isReasonValidationResult from @orkestrel/reason (src/core/helpers.ts:533); QualificationValidationResult -> ReasonValidationResult in the ScriptedQualifier fixture; reason atom, rule, logicalDefinition, factorGroup, fieldFactor, staticFactor, quantitativeDefinition -> create*; rater LineResult.success dropped from the deriveStatus rating fixture. The baseline npm run check (exit 2) listed exactly these as TS2724/TS2305/TS2353.

## Symbols moved

- programDefinition -> buildProgramDefinition
- noticeDefinition -> buildNotice
- aggregateDefinition -> buildAggregateDefinition
- emptySums -> buildEmptySums
- emptyTallies -> buildEmptyTallies
- copyJSONValue -> removed (structuredClone at the metadata copy)
- upstream adoption: qualifier isQualificationValidationResult -> reason isReasonValidationResult
- upstream adoption: qualifier QualificationValidationResult -> reason ReasonValidationResult
- upstream adoption: reason atom, rule, logicalDefinition, factorGroup, fieldFactor, staticFactor, quantitativeDefinition -> create*
- upstream adoption: rater LineResult.success removed

## Files touched

- src/core/helpers.ts
- src/core/programs/Program.ts
- src/core/validators.ts
- src/core/factories.ts
- src/core/types.ts
- guides/program.md
- README.md
- tests/setup.ts
- tests/setup.test.ts
- tests/src/core/helpers.test.ts
- tests/src/core/validators.test.ts
- tests/src/core/factories.test.ts
- tests/src/core/integration.test.ts
- tests/src/core/programs/Program.test.ts
- tests/src/core/programs/ProgramManager.test.ts

## Tests changed

- deleted: helpers > copyJSONValue (three cases)
- added: helpers > buildProgramDefinition > keeps an own __proto__ metadata key without touching the copy prototype
- renamed: the noticeDefinition, aggregateDefinition, programDefinition describes
- modified: deriveStatus > returns unrated when rating failed (fixture drops LineResult.success)
- failing-first: none against a defect (rename and removal rows); the added case proved discriminating by the /tmp/prog-probe/binds2.mjs probe

## Gates

- `npm run check (baseline, before any edit)` → exit 2 — TS2724 '@orkestrel/qualifier' has no exported member 'isQualificationValidationResult'; TS2724/TS2305 for reason atom, rule, logicalDefinition, factorGroup, fieldFactor, staticFactor, quantitativeDefinition; TS2305 QualificationValidationResult; TS2353 'success' does not exist in type 'LineResult'
- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 2587ms on 48 files using 4 threads.
- `npm run lint:check` → exit 0 — no diagnostics
- `npm run check` → exit 0 — no diagnostics
- `npm run build` → exit 0 — Declaration files built in 2187ms; built in 2.57s
- `npm test` → exit 0 — src:core 216 passed; policy 111; config 46; setup 78; guides 23

## Diff stat

```text
15 files changed, 428 insertions(+), 400 deletions(-)
```

Status at return (writer's reading): `M README.md |  M guides/program.md |  M src/core/factories.ts |  M src/core/helpers.ts |  M src/core/programs/Program.ts |  M src/core/types.ts |  M src/core/validators.ts |  M tests/setup.test.ts |  M tests/setup.ts |  M tests/src/core/factories.test.ts |  M tests/src/core/helpers.test.ts |  M tests/src/core/integration.test.ts |  M tests/src/core/programs/Program.test.ts |  M tests/src/core/programs/ProgramManager.test.ts |  M tests/src/core/validators.test.ts`
Built `dist/` moves: yes: dist/src/core/index.d.ts declares the five build* helpers and none of the removed or old names

## Observations

- s15-23 behavior difference measured on Node v22.22.2 (/tmp/prog-probe/probe.mjs): structuredClone clones a cyclic input the deleted recursion overflowed on, and a 200000-level tree still throws RangeError; JSONValue admits no cycle, so the cycle difference is unreachable through the typed API; the own __proto__ key survives as an own enumerable data property with the copy prototype Object.prototype
- buildNotice sits beside the pre-existing buildNotices (resolves authored notices into applied determinations): distinct exports differing by one character; flagged for the audit lane
- TSDoc first sentences rewritten only in the five renamed blocks; isTallies and createProgram keep the imperative form their families use, for the voice wave
- guide and README fences called reason bare-noun constructors no gate saw (fence imports checked only against @orkestrel/program); adopted under the standing condition
- Program.ts helpers import block restored to alphabetical order; test import lists left in their pre-existing unsorted order
- guide Types and Helpers tables re-padded
- test:distribution not run per the brief
- throwaway probes under /tmp/prog-probe/, outside the checkout; the rm was denied by the permission system, no residue in the repository

## Deviations

- none

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/program.diff`,
`tmp/units/breaking/program.status`.
