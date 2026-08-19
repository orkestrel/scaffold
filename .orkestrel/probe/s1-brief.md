# Unit S1 — the runtime stage stops certifying what it never ran

## Role and engine

`implementer` on Claude Opus 5. You are the sole serial writer in `/workspace/probe`.

## Objective

Close four defects in the runtime stage. Two of them issue receipts for cases that never executed,
which for this package is the worst failure available: a crash is visible, and a receipt is believed.

## Context

Read before acting:

1. `/workspace/probe/AGENTS.md` and every rule under `/workspace/probe/.claude/rules/`.
2. `/workspace/probe/src/core/types.ts` — `Check`, `Verdict`, and `Finding` are authoritative.
3. `/workspace/probe/src/core/helpers.ts` — `computeReceipt` is what these defects defeat.
4. `/home/user/scaffold/.orkestrel/probe/seam-sweep-findings.md` for the full evidence, and
   `seam-sweep-triage.md` for why this unit runs first.

The tree is green at its current commit. Inside a bench sandbox `npm test` may fail on the vendored
`tests/config.test.ts`, which cannot spawn a nested process there; that file is off-limits and the
failure is environmental.

## Defects

### A — a skipped test yields a clean check, so a receipt is issued for a case that never ran

`#findings` collects module errors, `allTests('failed')`, and unhandled errors. A specification whose
tests are all `test.skip`, `test.todo`, or inside a `describe.skip` produces none of those, and Vitest
reports the module state as `passed`. So `#findings` returns `[]`, which `src/core/types.ts` defines as
the clean result, and `computeReceipt` requires only that every case check be clean.

The consequence, stated plainly: an agent submitting

```ts
import { test } from 'vitest'
test.skip('greets', () => { expect(1).toBe(2) })
```

with a control declaring `stage: 'type'` receives a full receipt. The receipt asserts runtime
evidence and the runtime stage executed nothing.

The structural guard that exists — `module.state() === 'failed' && findings.length === 0` — fires only
where findings already exist and never where nothing ran.

Close it so a case that executed no test cannot be clean. Decide and state whether a skipped test is a
finding or a refusal, and make the message say which of the two happened: nothing ran, or something
ran and passed.

### B — worker output shares the stream that frames the protocol

The entry runs the Model Context Protocol transport over `process.stdout` as newline-delimited
JSON-RPC, and the runtime stage runs claim-supplied test code in worker threads of that same process
whose stdout Vitest pipes back into `process.stdout`. A test containing `process.stdout.write('x')`
puts `x` in front of the next response, the client's line framer drops the malformed line, and the
`tools/call` it belonged to never resolves.

The corrupting input is the tool's own advertised argument, so any connected client reaches this with
a legitimate claim about code that prints.

`createVitest` takes a fourth parameter carrying `stdout` and `stderr`, and the stage passes only two.
Give the resident runner streams that are not the protocol channel, and prove a claim whose test
writes to stdout no longer corrupts a response.

### C — the per-run eviction removes nothing

The stage's own documentation says it "runs that specification, evicts its result, and deletes the
file". Every inspection writes a uniquely named specification, so every key it creates can never
recur, and the `finally` that is meant to evict does not: of the three calls it makes, only
`clearSpecificationsCache` removes a key. `state.clearFiles` re-registers a placeholder task rather
than deleting, and `invalidateFile` clears a transform result while leaving the module node in place.

So runner state grows by one entry per inspection for the life of the process, with results, error
stacks, and logs retained.

The property to reach is that a resident probe's runner state does not grow without bound across
inspections. Reaching it may mean a different eviction call, or recycling the runner on a threshold,
or something else — choose, measure the growth before and after, and state the cost. If no bound is
reachable without recycling, say so and implement the recycle rather than documenting the leak.

### D — a test path that makes `prove` throw instead of returning a verdict

Both the shape and the guard admit a `Case.test.path` the runtime stage cannot map to a project, and
the stage throws rather than returning a verdict. An input the contract advertises as valid must not
produce an internal error. Decide between refusing it at the contract and reporting it as a finding,
consistent with what you chose in defect A.

## Scope

- **Owned**: `src/server/stages/RuntimeStage.ts`, `src/server/types.ts`, and
  `tests/src/server/**` only for the tests these defects owe.
- **Off-limits**: everything else. Specifically `src/core/**`, `src/server/Probe.ts`,
  `src/server/stages/TypeStage.ts`, `src/server/stages/LintStage.ts`, `src/server/factories.ts`,
  `src/server/helpers.ts`, `src/bin/main.ts`, `guides/**`, `package.json`, `vite.config.ts`,
  `configs/**`, and every dotfile. If a fix genuinely needs `src/core/helpers.ts` or
  `src/server/factories.ts`, stop and report rather than reaching.
- **Tools**: read, write, and `Bash` for validation only.
- **Permissions**: do not commit, push, tag, publish, install a dependency, or run a destructive
  command. Do not add an npm package. Do not read, print, or copy any secret.

## Criteria

Every criterion owes a committed test, and each test is red before the fix and green after. Record the
exact command and both counts.

1. A case whose only test is skipped does not produce a clean check, and no receipt is issued for it.
   Cover `test.skip`, `test.todo`, and `describe.skip`.
2. A case whose test genuinely passes still produces a clean check and still earns a receipt. The fix
   must not make every claim fail.
3. A claim whose test writes to stdout does not corrupt a protocol response. Prove it over the real
   spawned entry, reading the client side, not by inspecting configuration.
4. Runner state does not grow without bound across inspections. Paste the measurement before and
   after, over enough inspections that a per-inspection leak is unmistakable.
5. A `Case.test.path` the contract admits never makes `prove` throw an internal error.
6. Every existing guarantee holds: `process.exitCode` untouched, all three stages abandon on
   `destroy`, expiry bounded and recovering, integer `elapsed`, no `*.probe-*` file after an expiry,
   one `error` event per `prove` rejection.
7. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test` each
   exit 0, run in that order.
8. `npm test` reports no skipped and no todo test in the final tree.
9. `git diff --stat` touches only owned files.

## Execution

Perform this assignment directly. Spawn no subagent.

## Deviation contract

Stop and report when a fix needs an off-limits file, when two criteria contradict, or when a gate
reddens for a reason your change does not explain. Report expected, found, the exact command and its
output, whether the work is done, and at most one short hypothesis.

## Output

Return exactly: **Files written**, **Validation**, **Acceptance evidence**, **Deviation**,
**Decisions**.
