# Terminal contract for @orkestrel/process — reconciliation, 2026-08-21

Lanes: planner (Opus, subjective) and analyst (Sol, objective), blind to each other, both
working from the measured `upstream-teardown-finding.md`.

## Convergent, adopted

`destroy()` keeps `Promise<void>` and gains a BOUNDED drain window. `evidence` freezes at the
terminal moment. `lines` ENDS (`done: true`) rather than throwing, and queued lines are
delivered before the end. Two public getters derive from the private fields that already
exist — no second flag. The source break is accepted for a 0.0.6, taken by mcp through a
tarball before either publishes. Real-child proofs with controls throughout.

Both lanes independently rejected the same losing options: an unbounded `close` wait (turns a
wrong answer into a hang, and that hang is LIVE in supervisor today), resolving on native exit
(preserves the defect), and publishing a `snapshot()` capture method (ratifies the reinvention
four sites already hand-roll).

## Split, ruled

**1. `drained` lives on `ProcessExit`, not on the entity — the subjective lane.** The
objective lane placed it on `ProcessInterface` and rejected `ProcessExit` because "the public
`exit` promise cannot settle on the cutoff path". That objection is true of TODAY's code and
false under the design being adopted: the ruled `#settle(false)` resolves `#exit` on the
cutoff path, so the terminal result exists on every path. `ProcessExit` is the object that
exists ONLY at the terminal moment, so a too-early read becomes impossible by construction —
which is the defect class this entire round is closing. A getter invites the read that a
value forbids.

**2. `stop()` reaches the terminal moment too, not `destroy()` alone — the subjective lane.**
The objective lane scoped observation teardown to `destroy()`. Two live consumers refute it:
supervisor's probe path calls `stop()` and never `destroy()`, and the guide's own cancellation
fence aborts then awaits `exit`. Under a destroy-only rule both hang, and "call the other verb"
is correctness by vigilance — the thing this design exists to remove. The objective lane's
cost (a consumer stopping a chatty child to keep reading it) is paid by the ruled behaviour:
lines already framed and queued ARE delivered before the end, so only bytes that would have
arrived after a termination the caller asked for are lost. `stop` means "end permanently" in
the fixed lifecycle vocabulary, so ending observation with it is coherent. CARRIED TO
IMPLEMENTATION: `manager.stop(id)` then evicts as a consequence — verify that against the
existing manager suite and report it rather than assuming it is fine.

**3. The Windows guard moves into the POSIX branch — the subjective lane, on the merits.**
The objective lane read the code correctly (a live root already gets `killTree` first) and
concluded no change. But the guard's cost is not reaching the orphan — it is the RACE WINDOW:
the caller decides to stop, the child exits, the liveness read sees an exited root, and the
tree kill never runs, orphaning the descendant that then defers `close` for seconds. That is
precisely the case producing the pathological drain. The pid-reuse hazard is real and is
closed for both package callers, which drive `stopChild` while the `ChildProcess` handle is
still open; it goes in the helper's TSDoc for an external composer. The POSIX branch keeps
its behaviour EXACTLY — the guard moves into it, unchanged — because the POSIX symmetry is
unmeasured and reversing an unmeasured branch is how this campaign got here.

**4. `settled` and `stopping` — the subjective lane's names.** `ProcessInterface` is
deliberately host-independent (`signal` is a `string`, not `NodeJS.Signals`), so `closed`
borrows a Node event name into a contract that avoids them. `settled` derives literally: it
is true exactly when `exit` has settled. Both lanes chose a present participle for the
latched termination fact and both flagged the latch; it is documented as monotonic rather
than renamed, since the fact consumers hand-roll is "a termination was initiated". The
private renames follow so the class's vocabulary matches its contract.

## Measured, not chosen

`PROCESS_DRAIN` gets no guessed default. The lanes proposed 5000 and 1000 and the subjective
lane admitted nobody has measured the ordinary close-minus-exit distribution. The
implementation MEASURES it across the existing fixture set on this host, picks a value
covering the tail, and records the reading with its date beside the constant.

## Carried into the units

- The objective lane's `ProcessManager` hazard — a child spawned by a `launch` still inside
  option evaluation when destruction begins, whose teardown then runs unobserved. No
  speculative code change: write the test, and fix only if it reds.
- The subjective lane's `#settle` ORDERING is load-bearing and its failure is silent: the
  field must be set before the read ends are destroyed, or a host `close` fired by that
  destruction reports a truncated read as `drained: true`. The proof row must fail before the
  ordering is applied.
- Releasing the child's read ends may not release the event loop; the "a supervisor can exit
  after destroy" claim needs its own row, with the control that omits the `destroy()`.
- supervisor's `ProviderExecution` needs NO edit under ruling 2. Its probe path in
  `ProviderExecutor` still leaks the child and takes a `finally`.

## Units

| Unit | Engine | Owns |
| --- | --- | --- |
| U1 contracts | Opus | `src/core/types.ts`, `src/core/constants.ts` |
| U2 terminal routine | Sol | `src/server/Process.ts` |
| U3 helpers | Sol | `src/server/helpers.ts`, `src/server/types.ts`, `src/server/execution/execute.ts` |
| U4 fixtures and child suite | Sol | `tests/src/server/fixtures/child.mjs`, `tests/src/server/Process.test.ts` |
| U5 helper and registry suites | Sol | `tests/src/server/helpers.test.ts`, `tests/src/server/ProcessManager.test.ts` |
| U6 guide and parity | Opus | `guides/process.md` |
| U7 audit | cross-engine per authorship | read-only |
| U8 gates | verifier | the chain |

Serial in the checkout. Sol units run NATIVELY, not through a bench exec: every proof spawns
children and a sandboxed bench denies grandchildren.

## Orchestrator rulings on U1's escalations, 2026-08-21

**`drain: 0` is an immediate cutoff, not a disabled bound.** The sibling `delivery` treats `0`
as disabling its bound, and `drain` deliberately differs: an unbounded drain is the exact
defect this option exists to prevent, so no value may request one. Document the difference
where the option is declared rather than letting a reader infer the sibling's rule.

**`src/server/factories.ts` and `src/server/ProcessManager.ts` are added to U2's owned set.**
Both carry typecheck errors only because `Process` has not yet gained the members, and both
clear when it does. Neither needs an edit of its own; the grant exists so the unit is not
stopped by a file the plan's list omitted.

## The carry that would have made U4's tests pass for the wrong reason

U1 measured that the package's OWN win32 termination path — `taskkill /F /T` against a live
root — reaped every descendant in the fixture set and closed within 0.01ms across 30 runs.
So a `drained: false` row driven through the ordinary `stop`/`destroy` path will never reach
the cutoff, and a test written that way passes while proving nothing.

The shapes that actually reach the cutoff:

- a root-only kill with the descendant still alive — finite at 127-193ms, so the row needs a
  `drain` below that;
- the `orphan` fixture, where the root ends itself and the descendant never does.

And the trap: `tree-write`'s grandchild lives only about 250ms after its `.ready` file
appears, so a row that waits 300ms before terminating measures an already-closed pipe and
passes for the wrong reason. U4 must terminate the instant the file appears.

## Correction from U4, measured — the ordering claim was overstated

This reconciliation stated that the `#settle` latch must precede destroying the read ends
because "a host `close` fired by that destruction reports a truncated read as
`drained: true`". **That is not reachable in the shipped code.** U4 applied the exact
inversion and the row passed: `#settle` runs to completion in one synchronous body, so the
host `close` the destruction fires is delivered on a later tick and always finds the latch
set, wherever inside the body it was set. `#exit.resolve` idempotency is what prevents a
late close relabelling `drained`, and the exit count stayed at one under the inversion too.

The latch position is observable at exactly one point: `emit('exit', exit)` runs between the
latch and the destroys, so an `exit` listener reads `child.settled` from inside that
delivery. The true claim is narrower and is what the row now asserts: **a consumer handed
the terminal value must not read a child that still reports itself unfinished.** Under the
inversion that reads `settled: false`, and the row reds.

Keep the ordering — the narrower claim is real and worth protecting — but the rationale in
any guide sentence must be the narrow one, not the unreachable one.

## Behaviour change U4 surfaced for the auditor

`#removeAbortListener` moved out of `#end` into `#settle`, so the caller's abort listener is
now released at the terminal moment rather than synchronously at the `destroy()` call. No
type contract covers it. U4 judged it correct — the terminal moment is where every other
observation surface is released — and rewrote the row accordingly. The audit rules on it.

## The audit overturned my Windows ruling — recorded, because I was wrong

I ruled the `stopChild` exited-root guard should move into the POSIX branch, overriding the
objective design lane, which had ruled KEEP IT. My stated reason was that both package
callers drive `stopChild` while the `ChildProcess` handle is still open, so the pid cannot
have been reused. **That reason is false**, and the audit proved it:

- `Process.stop()` calls `stopChild()` after an arbitrarily old terminal moment — the suite
  itself calls it after `await child.exit`.
- `execute()` blocks calls after `close`, but an abort or timeout landing between native exit
  and `close` still enters `stopChild()`.
- Holding a JavaScript `ChildProcess` object does not establish that its numeric pid still
  identifies that process.

And the move buys nothing it claimed: the adjacent Windows row proves `taskkill` reports the
root missing and leaves the descendant running, so an orphan is unrecoverable after root exit
either way.

Worse, the row written to cover it ENCODES THE HAZARD AS THE EXPECTED RESULT: it supplies an
exited boundary carrying an unrelated live process's pid and asserts `stopChild()` kills that
live process. It passes because the unsafe behaviour happens.

RULED: restore the exited-root guard exactly as it was. Reverse that row into the negative
control it should always have been — an exited boundary must NOT address the live process a
stale pid names. The objective lane's original ruling stands, and this reconciliation's
override is withdrawn.

## The remaining audit rulings

**Totality (claim 1) — arm the drain after every native exit.** A natural root exit with a
descendant holding the pipes leaves `evidence` moving, `lines` pending, and `settled` false
forever, because only the host `close` or `#kill()` invokes `#settle()`. Narrowing the
contract to explicit termination is the honest alternative, and it is REJECTED because it
leaves the original hang live for the consumer this whole campaign exists to fix: mcp's
transport hangs `#onExit` off `child.exit`, which under that narrowing never settles. Arm the
bounded drain after every native exit; `drained: false` reports the cutoff honestly.

**`waitForClose` (claim 8) — give it its consumer rather than deleting it.** `#kill` races
`#exit.promise` against a timer it builds itself, which is the duplicate implementation the
helper exists to be. Route that wait through `waitForClose`. That satisfies the creation gate
and removes the duplication in one move; deleting the export would leave the duplicate.

**The abort-listener move is CONFIRMED correct** and additionally fixes the
stop-without-destroy path, which previously retained the listener.

**The comments restored the unreachable rationale (finding outside the claims).** U4 measured
that a host `close` from the read-end destruction arrives on a later tick, so the latch's
position cannot prevent it. The source comment and the test commentary say it anyway. They
must state only the narrow claim: the latch precedes terminal-value resolution and delivery.

**Six guide overclaims (claim 7)** follow from the above and are corrected with them.
