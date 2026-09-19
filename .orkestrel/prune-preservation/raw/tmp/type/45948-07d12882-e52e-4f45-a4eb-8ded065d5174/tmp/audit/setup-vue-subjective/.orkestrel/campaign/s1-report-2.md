# Unit S1 — report (round 2: stopped on an ownership gap; superseded by s1-brief-3.md)

Thread `01a0b0b4-d9af-7702-abe3-a4e1bc4dba22`, journal `tmp/codex/s1-2.jsonl` (swept at acceptance), 183 s. The stop is correct: the blueprint change reaches `tests/setup.ts` and the blueprint construction in `src/bin/CLI.ts#create`, neither owned. Orchestrator triage: obvious correction — the successor owns every consumer of the member.

S1 stopped on an ownership gap in `tmp/codex/s1-brief-2.md`. Implementation is not done.

No blueprint setup member or journey wrapper shape was settled. The existing `Blueprint.setup` member is a boolean at `src/core/types.ts:220`. Replacing it with runtime selections reaches consumers outside the assigned scope. The wrapper-registration probe was not run because the deviation contract requires stopping on an unowned change.

No artifacts or scripts were emitted or changed. No source, test, rule, or guide was changed. This report is the only file written.

The controls remain unrun. The following commands are the specified settling commands, not executed results.

| Control | Settling command | Failing count before | Passing count after |
| --- | --- | --- | --- |
| S1-C1: journey artifacts, script chain, and exclusion | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C2: absent browser application advice | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C3: materialized variant projects and provided values | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C4: setup runtime projects and scripts | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C5: exact-case target inference | `npm.cmd run test:src:bin` | Not run | Not run |
| S1-C6: vendored journey-wrapper admission | `npm.cmd run test:config` | Not run | Not run |

No gate command was run, so there are no gate exit codes or totals lines. The check, scoped formatter and linter, core, bin, config, and guides acceptance gates remain unrun. The policy, setup, and whole-test observations remain unrun.

The deviation concerns the consumers of the required blueprint change.

- Expected: implement the journey axis and setup runtime selection, update their consumers, and close `npm.cmd run check` within the owned files. The brief owns `src/bin/CLI.ts` only inside its inference block and owns `tests/src/core/**`, but it does not own `tests/setup.ts`.
- Found: `tests/setup.ts:178` declares `buildBlueprint(fields?: Partial<Blueprint>): Blueprint` and constructs the complete record directly. Its defaults include `setup: false` at line 191 and `showcase: false` at line 198, followed by `...fields`. A required journey member needs a default in this fixture. Replacing the setup boolean with runtime selections also requires changing its setup default and the example at line 175.
- Exact evidence: `src/core/types.ts:220` declares `readonly setup: boolean`; `src/core/validators.ts:294` validates that member with `isBoolean`; and `src/core/factories.ts:64` defaults it to `false`. Independently, `src/bin/CLI.ts:234` explicitly passes `setup: false` to `createBlueprint` inside `#create`, outside the owned inference block. The file reads exposed these consumers before any edit.
- Done: read the dispatch, repository instructions, relevant design evidence, and the blueprint consumers that expose the ownership gap. Not done: implementation, wrapper registration probe, regression controls, and gates. A successor brief needs to assign `tests/setup.ts` and the blueprint construction inside `CLI.#create` before this contract change proceeds.

The least-certain claim is the predicted typecheck failure after changing the blueprint contract. No candidate contract was written and no TypeScript diagnostic was measured. The ownership findings are direct source observations; this report does not claim that the unchanged checkout fails a gate. The wrapper's project registration remains unmeasured.