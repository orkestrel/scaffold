# Unit W3-FIX report — the merged refusal case

Every prescription of the W3 audit verdict is adopted. The two overlapping cases are one case, the
terminal pair now has to represent a child that ran, the control is asserted before any wait, and the
case timeout clears its condition budget. Both mutation controls reddened that case and are reverted.

## Touched files

| File                                     | Change                                                                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/src/server/ProcessManager.test.ts` | Merged the refusal case at `:154` and the barrier-order case at `:263` into one case; added the spawn-evidence terminal-pair assertion; moved the registered-child assertion ahead of the wait; deleted the sibling case and its scratch, marker, and process-id cleanup. |

Diffstat:

```text
 tests/src/server/ProcessManager.test.ts | 104 +++++++++-----------------------
 1 file changed, 28 insertions(+), 76 deletions(-)
```

`git status --porcelain` reports exactly that one file. `git diff --stat -- src/` is empty, so both
mutations are reverted. No shared or off-limits file is modified, nothing is committed, and no git
state-changing command ran.

## The merged case's shape

`tests/src/server/ProcessManager.test.ts:156`, named
`refuses a launch whose own options destroyed the registry mid-construction, and reaches the terminal moment of the child that launch spawned before its barrier resolves`.

The title carries both claims the merge folds together: the refusal spawned and tore down a child,
and the destroy barrier is what carried that teardown.

Order of the body, with the audit prescription each step closes:

| Line      | Step                                                                                          | Prescription |
| --------- | --------------------------------------------------------------------------------------------- | ------------ |
| `:164`    | `{ timeout: 15_000 }` paired with the `5_000` condition budget at `:213`                       | 6            |
| `:172`    | The refused launch: `childCommand('sleep')`, `on: { exit: refused.handler }`, the `grace` getter that starts `manager.destroy()` mid-construction | 5 |
| `:186`    | `await Promise.all(teardown)` — the destroy barrier                                            | 5            |
| `:189`    | `const settled = refused.count` — the recorder as the barrier resolved                         | 5            |
| `:195-203`| The control: a second registry, the same fixture, the same hook, the race removed, torn down by its own `await covered.destroy()` | 5 |
| `:206`    | `expect(registered.count).toBe(1)` immediately after the control's `destroy`                   | 2            |
| `:210`    | `waitForCondition('the refused launch reaches the terminal moment of the child it spawned', () => refused.count === 1, { budget: 5_000 })` | 5 |
| `:217-219`| `isProcessError(thrown)` is `true`; the code is `protocol`; `manager.count` is `0`             | 5            |
| `:224`    | The terminal pair represents a child that ran                                                  | 1 and 3      |
| `:229`    | `expect(settled).toBe(1)` — the barrier-order assertion the sibling owned                      | 5            |

The terminal-pair assertion:

```ts
const terminal = refused.calls[0]?.[0]
expect(terminal).toSatisfy(
	(pair: ProcessExit | undefined) =>
		pair !== undefined && ((pair.code !== null && pair.code >= 0) || pair.signal !== null),
	'the refused launch recorded the terminal pair of a child that ran',
)
```

`toSatisfy` carries the disjunction and prints the received pair on failure, which a boolean
assertion loses. The property is disjunctive rather than an exact pair because the pair is
host-varying and race-varying: the fixture installs a `SIGTERM` handler and exits `0`, and a child
still in interpreter bootstrap when the signal lands dies on the signal instead. Either reading is a
child that ran. A spawn fault reports the host's negative errno as the code — `-2` for `ENOENT`,
measured — and a cutoff that confirmed nothing reports both fields null. The predicate rejects both.

Nothing claim 5 lists as surviving the merge was lost, so the deviation contract did not fire. The
sibling's `expect(raced.count).toBe(1)` after its wait was the wait's own condition restated, and the
`waitForCondition` at `:210` carries it.

### Unknown resolved

The barrier-order assertion needs the recorder snapshot taken **before** the merge's wait, and it is,
at `:189` immediately after `await Promise.all(teardown)`. The sibling's own comment fixes this: "a
terminal moment absent at the barrier is one the barrier did not wait for rather than one that never
arrives". A snapshot read after the wait is a value the wait itself forced, so it can only report
`1` and proves no ordering. The comment at `:187-188` records the reason in the merged case.

### What the sibling contributed and what left with it

Carried over: the barrier snapshot and its assertion, and the framing that the barrier is the only
thing that can carry the teardown.

Deleted with the sibling case: the `createScratch` allocation, the `raced.pid` and `registered.pid`
markers, the `existsSync` and `readFileSync` reads of them, the `pid` bookkeeping, and the
`try`/`finally` that killed a leaked process id and destroyed the scratch. The markers were only read
for optional cleanup and were never asserted, per claim 5. Every import stays in use by other cases
in the file; the scoped lint run confirms it.

## Mutation controls

### Control A — spawn suppression (claim 5's evidence still binds)

The mutation from the W3 report, in `src/server/ProcessManager.ts` between `this.#ids.add(id)` and
`const child = this.#construct(id, options)`:

```ts
if (options.grace !== undefined && this.#destroying) throw createProtocolError(id)
```

Reading `options.grace` runs the caller's getter, which starts the teardown, so the launch is refused
before `#construct` spawns anything. The refusal is still `protocol` and the registry is still empty.

Command:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/ProcessManager.test.ts -t 'reaches the terminal moment of the child that launch spawned'
```

Result — `Tests 1 failed | 12 skipped (13)`:

```text
Error: Condition "the refused launch reaches the terminal moment of the child it spawned" did not hold within 5000ms (waited 5002.361623ms)
 ❯ tests/src/server/ProcessManager.test.ts:210:4
```

**Failing line: `:210`**, the `waitForCondition` call. The control's own assertion at `:206` passed
under this mutation, which is the separation claim 2 asked for: an absent refused child fails at
`:210`, and an uninstalled hook would fail at `:206`.

Reverted. `git diff --stat -- src/` empty; the same command without `-t` reports `Tests 13 passed (13)`.

### Control B — the terminal pair reads as a spawn fault

In `src/server/Process.ts`, in `#settle`, the recorded pair is replaced by the spawn-fault shape:

```ts
const exit = Object.freeze({ code: -2, signal: null, drained })
```

Everything else is untouched: the child really spawns, the barrier really carries its teardown, the
control really records its own terminal moment. Only what the pair reports changes.

Result — `Tests 1 failed | 12 skipped (13)`:

```text
Error: expect(received).toSatisfy()
Expected value to satisfy:
the refused launch recorded the terminal pair of a child that ran
Received:
Object { "code": -2, "drained": true, "signal": null }
 ❯ tests/src/server/ProcessManager.test.ts:224:21
```

**Failing line: `:224`.**

The second rejection claim 1 names was measured the same way, with
`Object.freeze({ code: null, signal: null, drained })`:

```text
Error: expect(received).toSatisfy()
Received:
Object { "code": null, "drained": true, "signal": null }
 ❯ tests/src/server/ProcessManager.test.ts:224:21
```

**Failing line: `:224`.** Both reverted; `git diff --stat -- src/` empty afterwards, and the file runs
`Tests 13 passed (13)`.

### How control B was derived, and the mutation that could not serve

The audit describes control B as a failed native spawn. The direct form of that — pointing the
`spawn` call in `src/server/Process.ts:145` at an absent executable — is not usable as a control. It
kills the runner before any test result exists:

```text
npx vitest run ... -t 'reaches the terminal moment of the child that launch spawned'
 RUN  v4.1.11 /home/user/orkestrel/process
EXIT=143
```

Three runs produced that, twice under `--reporter=dot` and once under `--reporter=verbose`, each
returning in well under its cap with an empty result stream and a `SIGTERM` exit. `.claude/rules/tests.md`
refuses that as evidence: a revert that reddens anything beyond the named test broke the harness, and
its count is not evidence. I did not chase the cause, because it lies outside this unit's scope.

Control B targets the same defect one step later and more exactly than the spawn mutation does. The
audit's claim 1 states the property as a property of the recorded pair — "a non-negative `code` or a
non-null `signal`, rejecting negative spawn-fault codes and `{ code: null, signal: null }`" — and
control B falsifies exactly that pair, with the rest of the path real. Both rejected shapes were run,
not argued.

Two readings taken while deriving it, both on Linux with Node v22.22.2 on 2026-08-25, recorded
because the assertion rests on them:

- A `spawn` of an absent executable reports `pid` `undefined`, emits `error` with `ENOENT`, and closes
  with `exitCode` `-2` and `signalCode` `null`. The negative errno the `ProcessExit` TSDoc documents
  is what a real spawn fault produces, so control B's `-2` is that shape rather than an invented one.
- `killProcess` at `src/server/helpers.ts:615` guards `child.pid === undefined` before negating it, and
  the spawn fault produces `undefined` rather than `0`, so no path there signals process group `0`.

## Validation

| Command                                                                                                    | Result                              |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/ProcessManager.test.ts` | `Tests 13 passed (13)`, 1.97s       |
| the same command, three consecutive repeats                                                                | `13 passed` each time               |
| the same command with control A applied and `-t 'reaches the terminal moment of the child that launch spawned'` | `Tests 1 failed \| 12 skipped (13)` at `:210` |
| the same command with control B applied, `code: -2`                                                        | `Tests 1 failed \| 12 skipped (13)` at `:224` |
| the same command with control B applied, `code: null, signal: null`                                        | `Tests 1 failed \| 12 skipped (13)` at `:224` |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/ProcessManager.test.ts`                | exit 0                              |
| `npx oxfmt --config .oxfmtrc.json --check tests/src/server/ProcessManager.test.ts`                          | `All matched files use the correct format.` |
| `npx tsc --noEmit --project tsconfig.json`                                                                 | exit 0                              |

The count moved from 14 to 13 because two cases became one; no case was dropped.

The typecheck is the one command outside the brief's stated tool bound. It is read-only and
non-mutating, and it is the only run that can catch a type error in the new `toSatisfy` call before
the Orchestrator's gates. `toSatisfy` reaches the assertion surface through
`JestAssertion extends CustomMatcher` in `@vitest/expect`; its matcher parameter is declared `any`
there, and the arrow at `:225` annotates `ProcessExit | undefined` explicitly, so no `any` enters this
file. No tree-wide `format`, `lint --fix`, or `build` ran.

`npm run test:src` is the Orchestrator's run after I exit, per the brief.

## Acceptance criteria

1. Scoped `ProcessManager.test.ts` run green — `Tests 13 passed (13)`, four times.
2. Both mutation controls reported red at named lines and reverted — control A at `:210`, control B at
   `:224` in each of its two shapes; `git diff --stat -- src/` empty.
3. One case where two overlapping cases stood; explicit timeout paired with the budget — the case at
   `:156` carries `{ timeout: 15_000 }` at `:164` against the `{ budget: 5_000 }` at `:213`.

## Deviation state

No deviation. The merge lost no property claim 5 lists as surviving it. Control B was derived from the
audit's own statement of claim 1 rather than from a spawn mutation that destroys the runner, and that
derivation is recorded in full earlier here.
