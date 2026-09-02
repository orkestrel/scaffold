# Unit breaking-qualifier — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s16-27** — applied: Deleted `export type QualificationValidationResult = ReasonValidationResult` from src/core/types.ts and `export const isQualificationValidationResult: Guard<QualificationValidationResult>` from src/core/validators.ts, with the now-unused `Guard` type import and the `isReasonValidationResult` import that backed it. Retyped `QualifierInterface.validate` (src/core/types.ts) and `Qualifier.validate` (src/core/Qualifier.ts) to `ReasonValidationResult` imported from @orkestrel/reason. Removed the guide's `QualificationValidationResult` Types row, its `isQualificationValidationResult` Validators row, its fence import entry and fence assertion line, and retargeted the Methods table's `validate` Returns cell to `ReasonValidationResult`. Guide prose now names `ReasonValidationResult` among the reason-supplied types and tells a consumer to narrow a `validate` result with `isReasonValidationResult` from @orkestrel/reason, per the barrel rule against re-exporting another package's symbol. Removed the whole `isQualificationValidationResult` describe block from tests/src/core/validators.test.ts with its import, and the `qualificationDefinition` import that block was the sole user of. No alias, re-export, or shim left behind: the built barrel no longer carries either name (probe control below).
- **s16-30** — applied: Renamed the three message producers to the ruling's `describe*` prefix in src/core/helpers.ts, leaving `findRule` on `find*` for its locate meaning: findMissingReferences -> describeMissingReferences, findEmptyLogicalPasses -> describeEmptyLogicalPasses, findUnreadDerivations -> describeUnreadDerivations. Updated the import block and the three call sites in src/core/Qualifier.ts (re-sorted the block), the `@example` import lines and call lines inside each renamed TSDoc block, the guide's three helper table rows and their Summary text, the guide fence import and call, and the import block plus describe titles and assertions in tests/src/core/helpers.test.ts. Rewrote each renamed block's TSDoc first sentence in the third-person form the brief's Execution clause requires (`Describes each ruling whose...`, `Describes each logical pass carrying no rulings.`, `Describes each quantitative pass never read by a later pass.`). Adjusted the guide sentence `The reference-scan and subject-guard helpers` to `The reference-describing and subject-guard helpers` so no prose still calls these a scan.
- **s16-32** — applied: Declared `QualifierErrorContext` in src/core/types.ts with readonly optional `pass`, `definition`, and `cause`, covering every real payload, and documented in `@remarks` why `cause` stays `unknown`. Retyped `QualifierError.context` from `unknown` to `QualifierErrorContext | undefined` and the constructor's third parameter from `unknown` to `QualifierErrorContext`, and rewrote the class `@remarks` to state which code carries which member. Changed the DEFINITION throw in `Qualifier.qualify` from the bare `definition.id` string to `{ definition: definition.id }`; the `mapEngineError` sites already passed `{ pass, cause }` and now typecheck against the declared shape. Added a `QualifierErrorContext` Types row and rewrote the Errors table Summary and its prose in guides/qualifier.md, and extended the Errors fence with the `context` reads. Red-then-green recorded below.

## Symbols moved

- QualificationValidationResult - removed (src/core/types.ts)
- isQualificationValidationResult - removed (src/core/validators.ts)
- QualifierInterface.validate return: QualificationValidationResult -> ReasonValidationResult (@orkestrel/reason)
- Qualifier.validate return: QualificationValidationResult -> ReasonValidationResult (@orkestrel/reason)
- findMissingReferences -> describeMissingReferences
- findEmptyLogicalPasses -> describeEmptyLogicalPasses
- findUnreadDerivations -> describeUnreadDerivations
- QualifierErrorContext - added (src/core/types.ts)
- QualifierError.context: unknown -> QualifierErrorContext | undefined
- QualifierError constructor third parameter: unknown -> QualifierErrorContext
- upstream adoption (@orkestrel/reason 0.0.8): atom -> createAtom
- upstream adoption: check -> createCheck
- upstream adoption: factorGroup -> createFactorGroup
- upstream adoption: fieldFactor -> createFieldFactor
- upstream adoption: logicalDefinition -> createLogicalDefinition
- upstream adoption: quantitativeDefinition -> createQuantitativeDefinition
- upstream adoption: rule -> createRule
- upstream adoption: staticFactor -> createStaticFactor
- upstream adoption: transform -> createTransform

## Files touched

- /home/user/fleet/qualifier/src/core/types.ts
- /home/user/fleet/qualifier/src/core/errors.ts
- /home/user/fleet/qualifier/src/core/validators.ts
- /home/user/fleet/qualifier/src/core/helpers.ts
- /home/user/fleet/qualifier/src/core/Qualifier.ts
- /home/user/fleet/qualifier/tests/setup.ts
- /home/user/fleet/qualifier/tests/src/core/Qualifier.test.ts
- /home/user/fleet/qualifier/tests/src/core/helpers.test.ts
- /home/user/fleet/qualifier/tests/src/core/validators.test.ts
- /home/user/fleet/qualifier/guides/qualifier.md
- /home/user/fleet/qualifier/README.md

## Tests changed

- tests/src/core/validators.test.ts - removed the `isQualificationValidationResult` describe block whole (its cases covered extra members, a class instance, each wrong member, arrays, adversarial objects, the engine-populated result, and the membership rule) with the symbol's import and the `qualificationDefinition` import it was the sole user of
- tests/src/core/Qualifier.test.ts - retargeted `throws DEFINITION before the engine runs when validation is enabled` from `context: 'bad'` to `context: { definition: 'bad' }`
- tests/src/core/Qualifier.test.ts - added `carries no context on a throw with no payload`, pinning `context: undefined` on the DESTROYED throw from a destroyed qualifier
- tests/src/core/Qualifier.test.ts - added the `QualifierError context` describe with `reads each context member off a caught error without narrowing`, reading `context?.definition`, `context?.pass`, and `context?.cause` off constructed errors and `context` off a payload-free one
- tests/src/core/helpers.test.ts - replaced the `unknown`-narrowing dance in `maps ReasonError INVALID to DEFINITION, cause is the original error` with direct typed reads of `context?.cause` and `context?.pass`
- tests/src/core/helpers.test.ts - pinned the whole context record on `maps ReasonError DESTROYED to DESTROYED` and `maps a non-Error throw to ENGINE, message contains the stringified value` with `toEqual({ pass: 'p', cause: ... })`
- tests/src/core/helpers.test.ts - adopted the renamed helpers in the three describe titles and every assertion, and adopted the renamed reason constructors
- tests/setup.ts - adopted the renamed reason constructors in every shared definition builder

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format.
Finished in 2462ms on 43 files using 4 threads.
- `npm run lint:check` → exit 0 — > oxlint --config .oxlintrc.json --deny-warnings .
(no diagnostics)
- `npm run check` → exit 0 — > tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
(no diagnostics)
- `npm run build` → exit 0 — dist/src/core/index.js  43.08 kB | gzip: 11.18 kB
dist/src/core/index.cjs 45.62 kB | gzip: 11.42 kB
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — test:src    Test Files 4 passed (4)  Tests 162 passed (162)
test:policy Test Files 1 passed (1)  Tests 111 passed (111)
test:config Test Files 1 passed (1)  Tests 46 passed (46)
test:setup  Test Files 1 passed (1)  Tests 12 passed (12)
test:guides Test Files 1 passed (1)  Tests 18 passed (18)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Qualifier.test.ts (RED, before the s16-32 test edit)` → exit 1 — - "context": "bad",
+ "context": {
+   "definition": "bad",
+ },
tests/src/core/Qualifier.test.ts:238
Test Files 1 failed (1)  Tests 1 failed | 30 passed (31)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Qualifier.test.ts (GREEN, after)` → exit 0 — Test Files 1 passed (1)  Tests 33 passed (33)

## Diff stat

```text
README.md                         |  12 +-
 guides/qualifier.md               | 248 +++++++++++++++++++++-----------------
 src/core/Qualifier.ts             |  31 +++--
 src/core/errors.ts                |  17 +--
 src/core/helpers.ts               |  72 +++++------
 src/core/types.ts                 |  26 ++--
 src/core/validators.ts            |  18 ---
 tests/setup.ts                    |  92 ++++++++------
 tests/src/core/Qualifier.test.ts  | 179 ++++++++++++++++++---------
 tests/src/core/helpers.test.ts    | 125 ++++++++++---------
 tests/src/core/validators.test.ts |  91 ++------------
 11 files changed, 492 insertions(+), 419 deletions(-)
```

Status at return (writer's reading): `Every assigned row applied. The gate chain runs green in order: format:check 0, lint:check 0, check 0, build 0, test 0. `git status --short` lists only owned files: README.md, guides/qualifier.md, src/core/{Qualifier,errors,helpers,types,validators}.ts, tests/setup.ts, tests/src/core/{Qualifier,helpers,validators}.test.ts. No off-limits file moved; package.json, package-lock.json, tests/setupPolicy.ts, tests/policy.test.ts, configs/**, and the vendored dependency guide mirrors are untouched. No commit, stage, push, install, or discarding git command was run.`
Built `dist/` moves: true

## Observations

- Upstream adoption list, read from the red as the brief directed. `npm run check` at the launch exited 1 with 28 TS2724/TS2305 diagnostics, all in tests, all naming @orkestrel/reason's bare-noun value constructors: atom, check, factorGroup, fieldFactor, logicalDefinition, quantitativeDefinition, rule, staticFactor, transform. `npm run check:src` alone exited 0, so no src identifier was red.
- Adoption reached past the red list, deliberately. The guide fences, README.md, and the `@example` blocks in src/core/{types,Qualifier,helpers}.ts named the same removed constructors, and neither `tsc` nor the parity test can see them: tests/guides.test.ts resolves fence imports only for the MODULES map (`@orkestrel/qualifier`, `@src/core`) and skips `@orkestrel/reason`. Leaving them would have shipped documentation naming symbols the installed dependency no longer exports, so all were adopted in the same change under the brief's standing condition.
- Prose sweep pass 1, word-boundary, over src tests guides README.md. Zero hits for each removed or renamed package symbol: QualificationValidationResult, isQualificationValidationResult, findMissingReferences, findEmptyLogicalPasses, findUnreadDerivations. Zero hits for factorGroup, fieldFactor, logicalDefinition, quantitativeDefinition, staticFactor, transform. Surviving hits for `atom`, `check`, and `rule` are domain vocabulary independent of the removed constructors: the `for (const atom of extractAtoms(...))` loop variable, the `check: Check` parameter and `.check` property, the `Ruling.rule` and `Rule` domain nouns, the `npm run check` gate command, the `'cap-check'` test id, and the `rule:` field of the vendored policy fixture in tests/setupPolicy.ts.
- Prose sweep pass 2, case-insensitive over inflected stems, same paths. /qualificationvalidation/i, /findempty/i, /findunread/i, /find[a-z]*reference/i, /find[a-z]*pass/i, /find[a-z]*derivation/i all return zero, so no removed name survives as a plural, participle, or noun form. /validationresult/i returns only ReasonValidationResult and isReasonValidationResult, the adopted foreign names in src and guides/qualifier.md plus the off-limits guides/reason.md mirror. /findmissing/i returns only findMissing and findMissingSymbols from @orkestrel/guide in tests/guides.test.ts and the off-limits guides/guide.md mirror. /factorgroup|fieldfactor|staticfactor/i return hits only inside the off-limits guides/reason.md. /logicaldefinition|quantitativedefinition/i return only the reason TYPE names, the isLogicalDefinition and isQuantitativeDefinition guards reason did not rename, and the local tests/setup.ts helper buildContinuingLogicalDefinition.
- Prose sweep pass 3, English inflections of the renamed verb over the same paths. `grep -rniE '\b(find|finds|finding|found)\b[^.]{0,40}(missing|empty|unread|reference|derivation)'` and `grep -rn 'Find '` both return zero, so no sentence still describes these helpers as finding.
- Guide claims measured against the built artifact, not derived. A throwaway probe under the session scratchpad (never under the checkout, deleted from the report path) imported dist/src/core/index.js and printed: destroyed.code = DESTROYED, destroyed.context = undefined, engine.context?.pass = gates, definition.context = {"definition":"standard"}, describeMissingReferences = ["Ruling 'license' references missing rule 'absent' in pass 'gates'"]. Every guide sentence and fence comment I wrote for s16-32 and s16-30 matches those readings.
- The probe's negative controls fired against the same built barrel and reported absence, so it discriminates: `'isQualificationValidationResult' in barrel` = false, `'findMissingReferences' in barrel` = false, and QualifierErrorContext is absent at runtime because it is a type. The published surface therefore moved in both directions, which is the distMoves answer.
- Centralization sweep over the touched files. `grep -nE '^(const|let|var|function|class|interface|type|enum) ' src/core/*.ts` returns nothing, so no non-exported module-scope declaration remains. The two matches for an in-body assignment are `(definition.rulings ?? []).filter((ruling) => ...)` in Qualifier.ts and `.some((ruling) => ...)` in helpers.ts, both pre-existing anonymous callbacks passed directly as arguments, which the no-nested-function law permits. QualifierErrorContext is an interface and sits in types.ts; the removed guard leaves validators.ts holding only `is*` guards; the renamed helpers stay in helpers.ts, where `describe*` joins the existing describeComparison, describeValue, and describePremise family. tests/policy.test.ts passes with 111 tests, which is the syntactic placement proof.
- Text integrity on every touched file: valid UTF-8, no replacement character, no unintended control character, no trailing whitespace.
- Whole-suite `npm test` timing on this host, reported as an observation rather than a criterion: each project finished well inside its budget, the longest being test:config at 1.89s. No test was skipped, todo'd, or retried, and no timing-suspect failure occurred.

## Deviations

- s16-32 context freezing, decided and recorded. One design lane asked for a frozen copy of the context, the other refused a bespoke type entirely. The reconciled ruling in the brief says only `QualifierErrorContext` declared in types.ts, every construction site passing it. I implemented exactly that and did NOT freeze the stored record: freezing is an observable behavioural change no row asked for, and QualifierErrorContext's members are already readonly. Flagging it so the audit can rule if the Orchestrator wants the freeze.
- TSDoc voice scope. The brief's Execution clause says to rewrite the first sentence in third person where a block is touched, while s16-34 owns the package-wide imperative-to-third-person wave and is deferred. I rewrote the first sentence of exactly the three renamed helper blocks and the QualifierError class remarks, and left every other imperative first sentence in helpers.ts, validators.ts, errors.ts, and factories.ts untouched for that wave.
- Guide table voice, decided and carried on from. The guide's helper and error tables are imperative throughout, so the three rewritten Summary cells stay imperative (`Describe each ruling whose pass or rule does not exist.`) while the TSDoc first sentences are third person. Converting the whole table would be s16-34's wave.
- Test shape corrected mid-unit. My first draft of the s16-32 tests used try/catch with `isQualifierError` narrowing inside the catch, which `npm run lint` rejected with seven `vitest(no-conditional-expect)` errors. I reshaped them into unconditional assertions: `toThrow(expect.objectContaining(...))` for the thrown shapes, and direct typed reads off constructed errors for the member-access claim. The typed-read proof also lives unconditionally in the mapEngineError assertions.
- Guide additions beyond the literal row text, required by parity. QualifierErrorContext is a new barrel export, and tests/guides.test.ts asserts `documents every barrel export`, so it needed a Types row. Retyping validate made the Methods table backtick a foreign name, so the reason-supplied-types sentence now names ReasonValidationResult, and the Validators intro now tells a consumer to narrow a validate result with isReasonValidationResult from @orkestrel/reason. I also extended the Errors fence with the `context` reads so the guide demonstrates the payload it now claims.
- One import in tests/src/core/validators.test.ts was dropped rather than kept. Deleting the isQualificationValidationResult block left `qualificationDefinition` imported and unused, which lint rejects. This is a dead test import, not a contract symbol, so the no-removing-symbols-to-silence-lint law does not reach it; the helper itself remains exported, documented, and tested elsewhere.
- Import blocks re-sorted where a rename broke alphabetical order: the reason import blocks in tests/setup.ts, tests/src/core/Qualifier.test.ts, tests/src/core/helpers.test.ts, and two guide fences, plus the helpers import block in src/core/Qualifier.ts and tests/src/core/helpers.test.ts. No sort rule is configured, so this is a tidiness decision I made and carried on from.
- The `rm -rf` cleanup of the scratchpad probe directory was denied by the permission system. The probe never lived inside the checkout (it was written under the session scratchpad as the brief requires), `git status --short` confirms no stray file in the repository, and nothing about the tree depends on its removal.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/qualifier.diff`,
`tmp/units/breaking/qualifier.status`.
