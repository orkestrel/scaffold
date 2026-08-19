# Unit S3 — the lint stage survives its child's death

## Role and engine

`sol` — GPT-5.6 Sol, high reasoning effort. This is objective, constraint-heavy correctness work over
process lifetime and promise settlement, which is the engine's assignment.

## Objective

Make `LintStage` report its child's death instead of hanging on it, and make destroying a probe whose
Oxlint server already died a clean shutdown rather than a process kill.

## Context

Read before acting, in this order: `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `tests.md`, `quality.md`, `writing.md`; then this brief. No skill is
named for this unit.

Governing guide: `PROBE.md`, which lives in the ORCHESTRATOR's repository at
`/home/user/scaffold/PROBE.md`, not in your working directory. Read it there if your sandbox permits
the path; if it refuses, proceed without it — this brief carries every fact you need. `src/core/types.ts`
lines 306-311 document `ProbeInterface.destroy` as settling when every engine releases its resources.
That sentence is the contract two of these defects break.

The subject is `src/server/stages/LintStage.ts`, 305 lines. It drives Oxlint as a language server over
a child process, speaking LSP with `Content-Length` framing. Note that the package speaks two framings:
this stage's LSP to Oxlint, and the entry's newline-delimited JSON-RPC to the MCP client. Do not
conflate them.

Relevant methods, by line: `#destroy` at 82, `#document` at roughly 140-160, `#notify` at 191, `#send`
at roughly 196-203, `#fail` at roughly 290, `#exit` at roughly 300.

## Defects

### A — liveness is read from `exitCode` alone, so a signal-killed server hangs `prove` and `destroy`

`src/server/stages/LintStage.ts:89` and `:198`.

`grep -n 'exitCode\|killed\|signalCode' src/server/stages/LintStage.ts` returns exactly two lines:

```text
89:		if (child === undefined || child.exitCode !== null) return
198:		if (child === undefined || child.exitCode !== null) {
```

Both treat `exitCode !== null` as "the child is dead". Node leaves `exitCode` at `null` when a child
dies by signal and sets `signalCode` instead, so both sites read a signal-killed server as alive.

**This is reproduced, not inferred.** The Orchestrator ran it with a discriminating control:

```text
exit event      code=null signal=SIGKILL
child.exitCode  = null
child.signalCode= SIGKILL
GUARD exitCode !== null => false (false means the guard reads a dead child as alive)
write after death threw = false
CONTROL clean exit: exitCode = 3 signalCode = null
CONTROL guard exitCode !== null => true (must be true, or the guard never works at all)
```

The control is an ordinary `process.exit(3)`, drawn from outside the population the finding covers. It
returns `exitCode = 3`, so the guard detects that death correctly. The guard works; it works only for
the exit path.

The `write after death threw = false` line is the reason this hangs rather than errors. Writing to the
dead child's stdin does not throw, so the guard is the only thing that could report the death. When it
reads false, the write silently succeeds against a dead pipe and no reply ever arrives.

Two consequences follow, and the fix owes a test for each.

- `destroy()` deadlocks. Line 89 does not return, line 90 registers a `shutdown` request, the write
  goes nowhere, the child's `exit` event already fired so `#fail` never runs again, and nothing settles
  that promise. `Probe.#destroy`'s `Promise.all` therefore never settles either.
- A later `prove` hangs. `#document` registers its resolvers, `#notify` silently succeeds, no
  `publishDiagnostics` arrives, nothing calls `#fail`. Only the runtime leg is deadlined, so the lint
  leg of the coordinator's `Promise.all` waits forever. A killed linter produces neither a verdict nor
  an error.

`#exit` already knows the difference — it formats `signal ${signal}` when `code === null`.

### B — an orphaned document promise ends the host process on destroy

`src/server/stages/LintStage.ts:148`.

`#document` registers the document in three maps inside the promise executor (lines 144-146), calls
`#notify('textDocument/didOpen', ...)` at line 148, and attaches cleanup only at line 156 via
`return diagnostics.finally(...)`.

When the child has already exited, `#send` throws at line 199 and that throw escapes `#document`
before the `finally` is ever attached. The three map entries stay. The `diagnostics` promise is left
pending with no handler, kept alive by the `resolve`/`reject` closures stored in `#publishes` and
`#refusals`. Nothing recycles the lint stage — `Probe.#recycle` replaces only `#runtime` — so every
subsequent `prove` repeats it.

The leak then becomes a kill. `destroy()` reaches `#destroy` line 88, which calls `#fail`, which
rejects every entry in `#refusals`. Each orphan rejects with no handler attached, so Node raises
`unhandledRejection` for each and terminates the host. Tearing down a probe whose Oxlint server died
earlier kills the process instead of shutting it down.

Note the interaction with defect A: fixing A changes when B triggers but does not fix B. A correct
liveness read makes `#send` throw in more cases, not fewer, so B gets easier to reach. Fix both.

### C — `child.stdin` carries no error listener

An `EPIPE` from a write racing the child's death becomes an uncaught exception in the resident host
rather than a stage fault the coordinator could recycle around. The probe above shows the ordinary
post-death write does not throw synchronously, so this is the asynchronous stream-error path, which is
a different door to the same room.

### D — the cleanup handler throws and replaces the real diagnosis

When the child dies mid-inspection, the `didClose` cleanup at line 157 calls `#notify`, which reaches
`#send`, which throws. That throw replaces the real error — the exit code and signal, which are the
only evidence of why the stage stopped — with a generic "not running" message, and `#documents` is
never pruned because the deletes at 158-160 sit after the throwing call.

## Scope

- **Owned**: `src/server/stages/LintStage.ts`, and `tests/src/server/stages/LintStage.test.ts` for the
  tests these defects owe.
- **Off-limits**: everything else. Specifically `src/core/**`, `src/server/Probe.ts`,
  `src/server/stages/RuntimeStage.ts`, `src/server/stages/TypeStage.ts`, `src/server/factories.ts`,
  `src/server/helpers.ts`, `src/bin/main.ts`, `guides/**`, `PROBE.md`, `package.json`,
  `vite.config.ts`, `configs/**`, and every dotfile.
- If a fix genuinely needs `src/server/types.ts` or `src/server/helpers.ts`, stop and report rather
  than reaching. A liveness fix that wants a shared helper is exactly the case to report.
- **Tools**: read, write, and `Bash` for validation only.
- **Permissions**: do not commit, push, tag, publish, install a dependency, or run a destructive
  command. Do not add an npm package — the fixes here need none. Do not read, print, or copy a secret.

## Criteria

Every criterion owes a committed test, red before the fix and green after. Record the exact command and
both counts.

1. A stage whose Oxlint child was killed by signal reports that death rather than hanging. `destroy()`
   settles, and it settles within a bounded time you assert rather than "eventually".
2. A `prove` against a signal-killed lint stage produces an error rather than hanging.
3. Destroying a probe whose lint child died earlier does not raise `unhandledRejection` and does not
   end the host. Assert this by observing the process, not by reasoning about handler attachment.
4. The three maps — `#documents`, `#publishes`, `#refusals` — are empty after a failed `#document`
   call, not merely after a successful one.
5. A stage whose child is alive still lints normally and still reports real findings. The fixes must
   not make every lint fail. `tests/src/server/stages/LintStage.test.ts` already has a test that proves
   this; keep it green.
6. When the child dies mid-inspection, the error the caller receives names the exit code or the signal,
   not a generic "not running".

## How to drive a signal death in a test

The stage owns its child privately, so reach it the way a real failure would: let the stage warm, then
kill the Oxlint process by pid from outside. `pgrep`/`ps` against the workspace, or the child's own pid
if you can reach it without breaking encapsulation, are both acceptable. Do not add a public accessor
to the stage purely so a test can reach the child — that widens the published surface to serve a test,
which this repository refuses. If you cannot drive it without one, stop and report; that is a design
question for the Orchestrator, not a scope call for you.

`.claude/rules/tests.md` bans mocks and framework spies for project-owned behavior. A real child killed
by a real signal is the real thing, so this is not an exception to that rule — it is the rule.

## Execution

Perform this assignment directly. Spawn no subagent.

## Host facts your commands run under

- Working directory `/workspace/probe`. Nested process spawns are permitted.
- The whole-workspace `npm test` is safe and takes roughly three minutes.
- The `probe` Vitest project reads `tmp/probe/`, and several tests write there. Put any throwaway
  instrument in its own scratch directory, never in `tmp/probe`, or a sibling project's run will see
  your files and fail a directory-listing assertion. That collision is real and cost an earlier unit a
  repair round.
- A unit before you may have edited `tests/src/server/stages/LintStage.test.ts`. Read it as it is now
  rather than trusting any line number quoted for it.

## Where a throwaway instrument goes

Put it in `tmp/scratch/`, and nowhere else.

`tmp` is gitignored, so nothing there can enter a commit, and `.claude/rules/tests.md` forbids
committing a probe. `tmp/probe/` is gitignored too but the `probe` Vitest project collects
`tmp/probe/**/*.test.ts`, and sibling projects write there concurrently, so an instrument left there
is collected by a gate or trips another project's directory-listing assertion. A bare `scratch/` at the
repository root is NOT ignored — `git check-ignore` refuses it — so an instrument there walks into the
next commit.

Delete the instrument before you return, whatever it proved. If it settled a claim, promote it to a
real test in the mirrored location instead.

## Unknowns

Two things the Orchestrator does not know, named so you do not have to guess a plan around them.

- Whether defects A and C share one repair. If holding an explicit liveness boolean set by the `exit`
  handler also makes the `stdin` error listener redundant, say so and implement one mechanism. If they
  are genuinely two, implement two. Report which you found.
- Whether criterion 3 is drivable in-process or needs a child process. `unhandledRejection` terminates
  the host, so a test that triggers it in the Vitest worker may take the worker down rather than
  reporting. If it needs a spawned child, spawn one and say so in your report.

## Deviation contract

Stop and report when a fix needs an off-limits file, when two criteria contradict, when driving a
criterion needs a public API addition, or when a gate reddens for a reason your change does not
explain. Report expected, found, the exact command and its output, whether the work is done, and at
most one short hypothesis.

Where the conflict is ancillary — which test file a helper sits in, the order of two assertions — decide
it, record the decision, and carry on. Do not stop the unit over a detail you are equipped to settle.

## Output

Return exactly: **Files written**, **Validation**, **Acceptance evidence**, **Deviation**, **Decisions**.

Under **Validation**, name each gate you ran and its exit code. Under **Acceptance evidence**, give each
criterion its test name, and for each red-then-green proof the exact command with both counts. No
process diary.

## Standing condition — the shared `tmp/probe` directory

Four server test files write into one `tmp/probe/` directory, and `test:src` runs `src:core`,
`src:server`, and `src:bin` in a single Vitest invocation with no parallelism guard, so their files
run concurrently and see each other's writes.

This has already cost two units a repair round. It is a known condition, not a discovery.

Two rules follow, and they bind whatever you are writing:

- **Never assert that `tmp/probe/` is empty, or assert anything about its whole contents.** Assert that
  the specific files YOUR test created are gone. `.claude/rules/tests.md` requires exactly this: assert
  the membership a globbed set should have, never a total that a partly empty population satisfies.
- **Give every file your test writes a name unique to that test**, so a sibling running concurrently
  cannot collide with it or be mistaken for it.

Where a proof needs a whole workspace rather than a few files, take an owned scratch directory linked
to the real installed toolchain, as `tests/src/bin/main.test.ts` already does. Do not disable file
parallelism to make an over-broad assertion pass — that hides the defect and keeps the wrong assertion.
