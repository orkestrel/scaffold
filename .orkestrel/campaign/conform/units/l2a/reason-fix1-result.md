## Fix round 1 — closed

Closed the first audit round's refutation of claim 4 (two behavioural rows lacking a failing-first proof) and findings F-1 to F-4. Added a `## Fix round 1` section to `/home/user/scaffold/tmp/units/conform/conform-reason-report.md`. Below is that section's content, returned per the brief's § Output.

## Fix round 1

Closes the first audit round's refutation of claim 4 and its findings F-1 to F-4, from `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/reason-objective-r1.md`.

**reason-fix1-1 (claim 4, reason-obj-2).** `guides/reason.md:932` set back to `// 40 — (10 + 25) + 5` and `tests/guides.test.ts:453` to `expect(result.value).toBe(40)`; `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` into `reason-obj-2-before.txt` read 1 failed, 93 passed, the named assertion failing `expected 41 to be 40`. Both lines restored to `41`; the same command into `reason-obj-2-after.txt` read 94 passed.

**reason-fix1-2 (claim 4, reason-obj-1's parser suite).** `src/core/parsers.ts`'s `parseDefinition` temporarily called `parseJSONAs(json, (value): value is Definition => isDefinition(value) || (typeof value === 'object' && value !== null && 'reasoning' in value))` in place of `parseJSONAs(json, isDefinition)`, accepting any object carrying a `reasoning` key regardless of the exact-record check. Control run into `reason-obj-1-parsers-control.txt` read 3 failed, 6 passed, including "refuses a definition carrying an extra key — the records are EXACT". The line was restored to `parseJSONAs(json, isDefinition)`; the same command into `reason-obj-1-parsers-after.txt` read 9 passed. `git diff` over `src/core/parsers.ts` after restoration shows no hunk.

**reason-fix1-3 (F-1).** The re-propagation sentence in § Shared-file patches now reads: "Every row that names `guides/reason.md` moved it. Copy the file verbatim into `/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`."

**reason-fix1-4 (F-2).** Grep verified: pattern `is written through an array path AND also read through an array path` over `/home/user/fleet` excluding `node_modules` returns `guides/reason.md`, `tests/src/core/reasoners/LogicalReasoner.test.ts`, and `src/core/reasoners/LogicalReasoner.ts`, all inside this package. Pattern `Derived \$\{derivedFact\.predicate\}` returns only `src/core/reasoners/InferentialReasoner.ts`. Added § Breaking entry naming both changed message strings and the "No consumer edit" sentence.

**reason-fix1-5 (F-3).** Ran the four patterns over the population. Two are genuinely empty (`subjectToFacts\(subject: Subject, trace`, `(factToArityKey|factToKey|instantiateFact|findUnboundVariables)\(source`). Two return a hit each — false positives against surviving current code, not against a removed form — and are recorded as ruled rather than forced into "Empty": `remove\((id|name|groupId[^)]*): string\): void` matches `types.ts:980` / `FactorManager.ts:102`, the current `FactorManagerInterface.remove(groupId: string): void` clear-all overload; `premises: \[[^\]]*\], conclusion` matches `tests/src/core/validators.test.ts:552`, a surviving `Inference` literal, not the removed `RuleResult.conclusion` member. This is a deviation from the row's literal "add to Empty" instruction, recorded rather than silently forced, because the substance the audit re-derived (no old form survives) still holds even though the exact pattern text also catches current code.

**reason-fix1-6 (F-4).** `guides/reason.md:583` now reads `runtime behavior around duplicates`.

### Failing-first proofs, appended

| Rows | Command | Before | After |
| --- | --- | --- | --- |
| reason-obj-2 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` | 1 failed, 93 passed | 94 passed, exit 0 |
| reason-obj-1 (`parsers.test.ts`) | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/parsers.test.ts` | 3 failed, 6 passed | 9 passed, exit 0 |

### Gates

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |

`npm run test:guides` alone read 94 passed, exit 0. `git -C /home/user/fleet/reason diff` over `src/core/parsers.ts` shows no hunk (fully restored); `tests/guides.test.ts` carries only the unit's own hunks with `41` in place. `git -C /home/user/fleet/reason status --short` lists 51 entries, unchanged from dispatch. `gate-format-check.txt` now exists.

Files touched this round: `/home/user/fleet/reason/guides/reason.md` (rows 1 and 6), `/home/user/fleet/reason/tests/guides.test.ts` (row 1 control, restored), `/home/user/fleet/reason/src/core/parsers.ts` (row 2 control, restored, no net diff), `/home/user/work/evidence/reason-proofs/**` (overwritten `reason-obj-2-before.txt`; new `reason-obj-2-after.txt`, `reason-obj-1-parsers-control.txt`, `reason-obj-1-parsers-after.txt`, `gate-format-check.txt`), `/home/user/scaffold/tmp/units/conform/conform-reason-report.md` (this section).

No deviation occurred; every control read red as expected and every restored line matches the tree's prior state exactly.
