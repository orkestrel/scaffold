# Unit VISIT-program — report

`implementer` on Claude Opus 5. Objective met: the setup proof landed, `test:guides` and the `test`
chain carry their planned values, `scaffold repair` ran clean, and every gate closes green. Nothing
was committed.

## The advisory as taken

`npx --no-install scaffold audit` at the start of the unit, at
`/home/user/orkestrel/program`, reported these advisories above its drift table:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The drift table closed with `48 of 126 planned paths drifted from the plan. Audit compared bytes at
101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.`

The `setup:` advisory names one module, `tests/setup.ts`, so the proof work list is one file:
`tests/setup.test.ts`. The `dependencies:` advisory is the fleet-wide TypeScript row the brief puts
out of scope.

## The proof file

`/home/user/orkestrel/program/tests/setup.test.ts` — 913 lines, 78 cases, one per behavioral
contract. `tests/setup.ts` is host-independent by construction (no `node:*`, no DOM, no Vue), so its
whole contract is reachable in the Node `setup` project and no half is deferred; the file's header
comment records that. Every expectation is a hand-written literal or comes from a second mechanism
`tests/setup.ts` does not share — the real `@orkestrel/qualifier`, `@orkestrel/rater`, and
`@orkestrel/reason` engines the fixture definitions are authored for, and the language's own own-key
and prototype reads. The file constructs a `Program` only to mint real event payloads for the
`recordEvents` proof; it asserts no program outcome, so no production behavior is re-proven here.

Module-scope helpers carry the second routes: `qualifySubject`, `rateSubject`, `concludeLogical`
(narrowing `ReasonResult` by its `reasoning` discriminant without a cast), `limitsStatus`,
`limitsAmount`, `collectPlaceholders`, and `collectCorpusDefinitions`.

What each block asserts:

| Block                                | Contract proved                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createFixedQualifier`               | Returns the pinned result for any subject and definition; delegates `validate` to a real qualifier that still refuses a dangling ruling; destroys the qualifier it borrows   |
| `createFixedRater`                   | Returns the pinned result for both call forms; destroys the rater it borrows                                                                                                |
| `createFixedEngine`                  | Pins one result for a subject and one per subject for a batch; delegates the registry to a real reasoner-free engine that misses rather than throws; `register` reaches it   |
| `createRecordingRater`               | Records lines and subject in call order; unwraps a rating definition so both call forms record one shape; returns the real rated result; `clear` empties without detaching   |
| `createRecordingEngine`              | Registers the quantitative and logical reasoners; counts each destroy; lets an option replace the default registry; reasons one result per batch subject                     |
| `createQuantOnlyEngine`              | Supports quantitative and refuses logical; misses a logical definition through `validate` naming the absent reasoner, without throwing                                       |
| `recordEvents`                       | Starts empty and records every wired event name in emission order (emitted in a deliberately non-execution order); `clear` empties without detaching                          |
| `cloneSubject`                       | Distinct copy a mutation cannot reach the original through; copies one level, so a nested value stays shared                                                                 |
| `isSubjectArray`                     | Accepts an array and an empty array; refuses a lone subject and an array-like record                                                                                        |
| `buildHostileSubject`                | Carries `__proto__` and `constructor` as OWN keys an object literal cannot express; leaves the prototype chain clean; fresh each call                                        |
| `buildLargeBatch`                    | Exact requested count down to empty; matches a hand-written four-subject table; distinct ids, both eligibilities, both partitions                                            |
| the malformed result fixtures        | Required collection absent at runtime while the type declares it; `success` still true; the discriminant a narrower reads survives                                           |
| `createQualificationResultClass`     | Reads through to the wrapped result and adds `extension`; exposes no own key, so a structural copy loses the whole result while the source keeps its keys                    |
| `createResultClass`                  | Answers a property read while `Object.keys` and `JSON.stringify` see nothing; reads live through to the record; answers `undefined` for an absent name                       |
| the qualification fixtures           | Each subject reaches the eligibility its name claims under a real qualifier; standard and referral differ by effect alone; the condition leaves global eligibility standing; wind and coastal scope to one line; zero-pass qualifies everything with no findings; the failing pass fails closed to referral |
| the rating fixtures                  | Standard rates to its one `base` line at 100 for any subject; the property rating pays wind 50 and ex-wind 75; an empty rating is separated from an empty qualification      |
| the authority fixtures               | Conditional limits `conditional` and no other status; unrated limits `unrated` and no other; clean limits no status at all; `buildAuthorityProgram` attaches freshly          |
| `buildBrokenLogicalDefinition`       | Fails a real reasoner without throwing, naming the premise-less rule; names its rule after the given id so the two broken fixtures never collide; neither carries a rating   |
| `buildAggregateGateProgram`          | Gates strictly above the threshold (101 fires, 100 does not, 99 does not); reads the summed portfolio field, not a top-level field; declares the one field its gate reads    |
| the batch fixtures                   | The batch program partitions by location and sums amount; the subjects split east pair / west single; both eligibilities present; the shared-id pair repeats one id and differs in eligibility; the eligibility-only batch pairs one of each |
| the eligibility-only fixtures        | Each omits its rating; each reuses by identity the qualification of the program it mirrors; the authority-carrying one adds only the clean authority; the missing-scope notice names a line no rating declares, freshly each call |
| the notice fixtures                  | Every `{{token}}` names a field the eligible subject carries; the notice program differs from the standard one by its notices alone                                          |
| `buildCarrierProgram`                | Fresh equal graph each call; self-contained gates and line (its own restriction lands, its line rates to 10) with the shared clean authority; its placeholder resolves        |
| the corpus definitions               | A real qualifier validates every corpus qualification; every scoped ruling names a line its paired rating declares; the authority-carrying failing program mirrors the failing one exactly; the all-scoped program scopes a restriction over every line it declares |
| `isBrowserVuePath`                   | Accepts a browser path in each separator family; refuses a sibling environment, a prefix lookalike, and a nested repeat                                                      |

## Mutation control

One control for the one proof file. The boundary expectation in
`buildAggregateGateProgram > gates strictly above the given threshold` was copied to the opposite
value (`expect(limitsAmount(gates, 100)).toBe(false)` → `.toBe(true)`), `npm run test:setup` ran
red, and the file was restored byte-for-byte from a copy taken before the edit.

Failing line:

```text
FAIL  |setup| tests/setup.test.ts > buildAggregateGateProgram > gates strictly above the given threshold
AssertionError: expected false to be true // Object.is equality
 ❯ tests/setup.test.ts:705:36
```

Under the mutation: `Tests  1 failed | 77 passed (78)`. After restoring: `Tests  78 passed (78)`.

## The visit

Run in the fixed order.

1. `tests/setup.test.ts` written.
2. `npm pkg set 'scripts.test:guides'='vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. `npx --no-install scaffold repair --groups manifest` → `1 written, 1 unchanged, 0 removed in ..`,
   which wrote `test:setup` as
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
4. `npm pkg set 'scripts.test'='npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`.
   The planned order was read from the installed scaffold's compiler at
   `node_modules/@orkestrel/scaffold/dist/src/core/index.js:4295`, which places
   `npm run test:setup` between `test:config` and `test:guides`.
5. `npx --no-install scaffold repair` → `49 written, 78 unchanged, 0 removed in ..`, ending
   `0 of 126 planned paths drifted from the plan.` It added the `setup` project to
   `vite.config.ts` (`include: ['tests/setup*.test.ts']`, `setupFiles: ['./tests/setup.ts']`, Node,
   browser disabled) and placed it in `projects` between `config` and `guides`.
6. `npm run format` → `Finished in 4167ms on 146 files using 4 threads.`

**Retained differing script values.** None. The full `repair` named no retained differing value, and
the closing audit reports no `scripts:` advisory. The only script values adopted are `test:guides`
and the `test` chain the blocked `configs` group forced.

## Gates

Each read bare, in gate order, at `/home/user/orkestrel/program`.

| Gate                  | Closing line                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 2744ms on 146 files using 4 threads.` |
| `npm run lint:check`   | No diagnostics; `EXIT=0`                                                                          |
| `npm run check`        | No diagnostics; `EXIT=0`                                                                          |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`; `EXIT=0`                        |
| `npm test`             | `EXIT=0`                                                                                         |

`npm test` per project: `test:src` 6 files / 218 tests, `test:policy` 1 / 93, `test:config` 1 / 46,
`test:setup` 1 / 78, `test:guides` 1 / 23. Every one passed.

## Closing audit

`npx --no-install scaffold audit` at exit reports no `setup:` advisory and no `scripts:` advisory.
What remains:

- `dependencies: typescript declares major 6, while the registry serves major 7.` — the fleet-wide
  row the brief scopes out.
- Seven `foreign` paths under the retired `orkestrel-human-journey` name plus `.claude/agents/codex.md`
  and `.codex/agents/claude.toml`, left alone for the Orchestrator to remove at commit.
- `0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and
  nothing at 6. The plan does not own 7 further paths beneath its groups.`

## Touched files

| File                                          | Change                                                                                  |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `/home/user/orkestrel/program/tests/setup.test.ts` | New. The setup proof: 78 cases over the fixture module's behavioral contracts.       |
| `/home/user/orkestrel/program/package.json`   | `test:guides` adopted, `test:setup` written by repair, `test` chain adopted             |
| `/home/user/orkestrel/program/vite.config.ts` | The `setup` project, written by repair and registered in `projects`                     |
| Vendored `.agents/`, `.claude/`, `.codex/`, `CLAUDE.md` | Rewritten by `scaffold repair` to the 0.0.52 plan                              |
| `/home/user/orkestrel/program/package-lock.json` | Arrived dirty with the 0.0.52 re-pin; untouched by this unit                          |

Diffstat over tracked files: `37 files changed, 737 insertions(+), 763 deletions(-)`. Untracked
additions: `tests/setup.test.ts` plus the orchestration paths repair created —
`.agents/skills/orkestrel-debrief/references/retention.md`, `.agents/skills/orkestrel-prove-journey/`,
`.agents/skills/orkestrel-publish/`, `.agents/templates/`, `.agents/transports/`,
`.claude/skills/orkestrel-prove-journey/`, and `.claude/skills/orkestrel-publish/`.

## Shared-file patches

None. Every file this unit wrote is owned by the brief.

## Deviation state

None. No reported module resisted the fixed proof shape, and no gate failed.

## Notes for the Orchestrator

- Throwaway runtime probes under `tmp/probe/` were used to read the fixtures' real values before
  writing any expectation (real qualifier, rater, and logical-reasoner output; own-key and prototype
  reads; the aggregate-gate boundary). All were deleted and the directory removed; `tmp` is
  gitignored and nothing from it entered the tree.
- `dist/` was rebuilt by the `build` gate and is gitignored.
- Acceptance criteria: (1) closing audit reports no `setup:` advisory — met; (2) every gate green,
  each read bare — met; (3) one mutation-control failing line reported, restored — met.
