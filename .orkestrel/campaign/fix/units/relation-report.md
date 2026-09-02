# Unit breaking-relation — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s17-10** — applied: Re-verified at src/core/types.ts:92 that ResolvedRelation was one interface with seven optional members, and that Model.ts still read each through a `?? ''` sentinel. Split it into a union discriminated on `relationship` over five exported arms — ResolvedBelongs (required column), ResolvedMany (required key), ResolvedOne (required key), ResolvedThrough (required through/source/target), ResolvedMorph (required key/tag/label) — each written out with its own `relationship`, `name` and `model` rather than extending a shared base, so no public base type is added without a consumer. ResolvedRelation is now a `type` alias over those arms, so `extends ResolvedRelation` no longer compiles. Model.#through returns ResolvedThrough and each loader takes its own arm (#loadMany takes ResolvedMany | ResolvedOne because #loadOne delegates to it); every `?? ''` is gone — `grep -rn "?? ''" src` returns nothing. RelationManager's `entry.through !== undefined` clause became dead once the arm made the member required and was deleted. Guide: the ResolvedRelation Types row records the interface-to-type kind change, the five arm rows were added, Contract item 4 records the union and the required-per-arm invariant, and a narrowing fence was added under 'Resolving relations directly'.
- **s17-11 rename half** — applied: Renamed RelationManagerInterface.models() to names() in src/core/types.ts and the implementing RelationManager.names() in src/core/RelationManager.ts. Updated the guide's RelationManagerInterface Types row, its Methods table row and lead-in sentence, the 'The registry surface' section and its fence, and the Tests bullet. Updated the two call sites and the header comment in tests/src/core/RelationManager.test.ts. `npm run check` produced exactly two errors after the rename (TS2551 at RelationManager.test.ts:36 and :48) — that red was the derived consumer set, and nothing else in the package named the old member.
- **s17-09/s17-13 audit carriers** — applied: Amended the guides/relation.md Tests section: the helpers.test.ts bullet drops isRelationDescriptor and names readColumn and countAttached, and a new bullet points at tests/src/core/validators.test.ts describing what it covers (the object form, the builders' output, and the string / array shorthands the guard refuses). The linked file exists, so the guide parity check 'links only to test files that exist' covers the new bullet.

## Symbols moved

- RelationManagerInterface.models() → RelationManagerInterface.names()
- RelationManager.models() → RelationManager.names()
- ResolvedRelation (interface) → ResolvedRelation (union type alias)
- added ResolvedBelongs (interface)
- added ResolvedMany (interface)
- added ResolvedOne (interface)
- added ResolvedThrough (interface)
- added ResolvedMorph (interface)
- Model.#through(): ResolvedRelation → Model.#through(): ResolvedThrough
- Model.#loadBelongs param ResolvedRelation → ResolvedBelongs
- Model.#loadMany param ResolvedRelation → ResolvedMany | ResolvedOne
- Model.#loadOne param ResolvedRelation → ResolvedOne
- Model.#loadThrough param ResolvedRelation → ResolvedThrough
- Model.#loadMorph param ResolvedRelation → ResolvedMorph

## Files touched

- /home/user/fleet/relation/src/core/types.ts
- /home/user/fleet/relation/src/core/Model.ts
- /home/user/fleet/relation/src/core/RelationManager.ts
- /home/user/fleet/relation/src/core/helpers.ts
- /home/user/fleet/relation/guides/relation.md
- /home/user/fleet/relation/tests/src/core/RelationManager.test.ts
- /home/user/fleet/relation/tests/src/core/helpers.test.ts

## Tests changed

- /home/user/fleet/relation/tests/src/core/RelationManager.test.ts — `manager.models()` becomes `manager.names()` at both call sites, and the header comment names the registry surface as `count` / `names` / `has`.
- /home/user/fleet/relation/tests/src/core/helpers.test.ts — added 'defaults the target model to the relation name when a builder omits it', pinning the exact values the new guide fence claims for the three-argument `hasThrough` form. Mutation check: changing the expected `model` from 'reps' to 'representatives' reddens exactly that test (npm run test:src, exit 1, 'expected … "model": "representatives" … "model": "reps"'); reverted, and the same command returns 45 passed.

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 2451ms on 44 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no output
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- `npm run build` → exit 0 — [unplugin:dts] Declaration files built in 1917ms. ✓ 9 modules transformed. ✓ built in 2.16s. Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — src:core 45 passed (45); policy 111 passed (111); config 46 passed (46); setup 10 passed (10); guides 23 passed (23)
- `node /home/user/work/verify-stage.mjs relation` → exit 0 — contract 2c15840, database 2ded05a, emitter 3f59367, guide be6111e, html bc53632, indexeddb bf4730e, markdown 9c0dfc7, sqlite 5a9340b, test cced24a — each OK as the installed copy

## Diff stat

```text
guides/relation.md                     | 50 ++++++++++++-----
 src/core/Model.ts                      | 59 ++++++++++----------
 src/core/RelationManager.ts            |  8 +--
 src/core/helpers.ts                    | 10 ++--
 src/core/types.ts                      | 98 +++++++++++++++++++++++++++++-----
 tests/src/core/RelationManager.test.ts |  6 +--
 tests/src/core/helpers.test.ts         | 11 ++++
 7 files changed, 174 insertions(+), 68 deletions(-)
```

Status at return (writer's reading): `M guides/relation.md |  M src/core/Model.ts |  M src/core/RelationManager.ts |  M src/core/helpers.ts |  M src/core/types.ts |  M tests/src/core/RelationManager.test.ts |  M tests/src/core/helpers.test.ts`
Built `dist/` moves: true

## Observations

- Adoption list was empty. `npm run check` on the committed baseline exited 0 against the staged closure, so no renamed upstream symbol reached this package and nothing was adopted. `node /home/user/work/verify-stage.mjs relation` confirmed every staged tarball is the installed copy.
- The `prove` MCP tool returned a transport error rather than a verdict — 'Legacy protocol 2025-11-25 cannot represent a stream result'. No receipt line and no 'no receipt' line exists to quote. Fell back to a throwaway type probe under the scratchpad (never under the checkout), deleted after the run.
- Type probe result, coverage and controls. Coverage: it compiles one draft file against the repository's own root TypeScript project options and reports on the `type` stage only. CASE — a function narrowing on `relationship` and returning [resolved.through, resolved.source, resolved.target] — exit 0. CONTROL A — `interface ExtendedRelation extends ResolvedRelation` — exit 2, 'error TS2312: An interface can only extend an object type or intersection of object types with statically known members', at the declared `type` stage. CONTROL B — reading `resolved.column` without narrowing — exit 2, 'error TS2339: Property column does not exist on type ResolvedRelation. Property column does not exist on type ResolvedMany', at the declared `type` stage. So the ruling's claim holds: `extends ResolvedRelation` stops compiling.
- CONTROL C falsified an assumption worth recording. `return resolved.source ?? ''` written anew on a required ResolvedThrough column compiles clean (exit 0), and oxlint with the repository config reports nothing about it. The union removes every place a sentinel was needed; it does not make one unwritable, and neither tsc nor lint refuses a fresh one. The standing guard is that no arm member is optional, so a sentinel is now visibly dead code rather than a load-bearing fallback.
- Word-boundary sweep for `models` over src, tests, guides/relation.md, guides/README.md and README.md returns seven hits, and the case-insensitive inflected sweep (`models`, `Models`, `MODELS`, `model's`, `models'`, `modelled`, `modeling`, `modelling`) returns those plus eleven possessive `model's` hits. Every one is the English noun for the Model entity or its possessive — types.ts:261 and guides/relation.md:140,308 ('vends models'), guides/relation.md:328 ('Define all related models up front'), guides/README.md:32 (inside the vendored database mirror's description), and the two RelationManager.test.ts titles. None names the removed method.
- Sweep for the deleted sentinel: `grep -rn "?? ''" src` returns nothing.
- Centralization sweep over the touched files is clean: no module-scope declaration other than the class in Model.ts or RelationManager.ts, no unexported module-scope declaration in types.ts / helpers.ts / validators.ts / factories.ts / errors.ts, no nested function declaration or assignment in any src body, and the barrel is unchanged because the new arms ride the existing `export * from './types.js'` row. Every touched file is valid UTF-8 with no replacement characters. The parity INTERNAL list stays empty — no class was interned.
- The new guide fence was executed against the built package before it shipped: `resolveRelation('reps', hasThrough('accountReps', 'accountId', 'repId'))` returns {"relationship":"through","name":"reps","model":"reps","through":"accountReps","source":"accountId","target":"repId"}, exactly the values its comments claim.
- Pre-existing counts in prose sit outside this unit's rows and were left alone: guides/relation.md line 3 and README.md line 8 each say 'Five relation kinds'. Recorded here against whichever row owns the package's prose vocabulary, for a later change.
- Whole-suite timing on this host, reported as an observation and not a criterion: `npm test` completed with every project green — src:core 750ms, policy, config 2.05s, setup 347ms, guides 509ms. No timing-suspect failure arose.
- The published declaration moved as expected: dist/src/core/index.d.ts now carries `export declare type ResolvedRelation = ResolvedBelongs | ResolvedMany | ResolvedOne | ResolvedThrough | ResolvedMorph`, the five arm interfaces, and `names(): readonly string[]` on both RelationManagerInterface and RelationManager.

## Deviations

- No stop-and-report condition arose. No target name collided with an existing export, no two rows moved the same symbol differently, no rename reached an off-limits file, and no gate failed.
- Judgment call recorded rather than escalated (arm naming and shape): named the arms ResolvedBelongs / ResolvedMany / ResolvedOne / ResolvedThrough / ResolvedMorph so the family reads against the existing ResolvedRelation rather than against the raw `Relation` and `RelationDescriptor` names, and wrote `relationship`, `name` and `model` out in each arm instead of extending a shared base. A base interface would have to be exported under the centralized-file rule and documented under guide parity, which adds a public type with no consumer.
- Judgment call recorded rather than escalated (guide prose in the row's radius): guides/relation.md:191 pluralized the `ResolvedRelation` code token, which .claude/rules/writing.md refuses. Rewrote that clause to 'one `ResolvedRelation` per entry' inside the paragraph the row already rewrites.
- Judgment call recorded rather than escalated (TSDoc and its proof): rewrote resolveRelation's first sentence into the third-person form because the row touches that block, moved its throw statement from @remarks into an @throws tag, and matched the tag's wording to the fleet form observed in the installed @orkestrel/database declarations ('@throws An `INVALID` {@link RelationError} when …'). Added the guide's narrowing fence and, with it, the executed assertion that pins its values — .claude/rules/documentation.md requires the assertion that breaks when a prose behaviour claim goes false, and the three-argument `hasThrough` default-model path had none.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/relation.diff`,
`tmp/units/breaking/relation.status`.
