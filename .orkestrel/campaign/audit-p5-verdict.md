**Lane held: subjective** (design fit, API and vocabulary, architecture fit, simplification, guide voice). The dispatch did not reassign me to the objective lane, so every correctness question I hit is a referral, not a verdict.

## Per-claim verdicts

**1. F1 — two named doors, no behaviour change — UNRESOLVED**

The split landed and is clean. `src/server/Process.ts:412` `#failInputStream` and `:420` `#failInputCallback` replace the boolean method; the call sites carry no discriminator (`:158` stream, `:391` callback from `#confirmWrite`). Rule placement is as prescribed: the stream door holds the phase test, the callback door holds `#failure !== undefined || this.#terminating`. The names read as doors rather than as variants, and `#failInputStream` delegating to `#failInputCallback` composes correctly.

The "no behaviour change" half does not hold as written. The shipped stream door is not the old predicate re-housed:

```ts
// src/server/Process.ts:413
if (this.#child.stdin.writableEnded || this.#input &gt; 0 || this.#inputFault !== undefined) {
```

The pre-P5 door (recorded verbatim in `unit-p4fix-report.md:935-944`) was `emitted &amp;&amp; (this.#input &gt; 0 || this.#inputFault !== undefined)`. `writableEnded` is a new third condition, of a different kind — channel state, not phase state — and it is load-bearing: F2 clears `#inputFault` at `#input === 0`, which destroys the latch that used to keep the door quiet after a constructor-input fault, so without this disjunct the proof at `tests/src/server/Process.test.ts:247` (`keeps constructor input closure quiet when a non-reading child exits`) would classify and emit. F2 as ruled was therefore not implementable as behaviour-preserving on its own, and the unit absorbed that silently instead of reporting it: the report (`unit-p5-report.md:36-44`) shows the line inside the hunk and says nothing about it, and the brief's deviation contract names exactly this case ("a prescription that cannot be implemented as ruled").

Required change, `src/server/Process.ts:412-413`: add the comment this file gives every other subtle guard (compare the `#terminating` comment at `:91-94`, `#push` at `:318-324`) naming why the stream door reads `writableEnded` — that it is what keeps a package-initiated closure quiet after F2 removed the `#inputEvent`/`#inputFault` latch, and that a `writable: true` channel never sets it, which is what keeps a later host fault classifiable. Right looks like a reader being able to tell the phase rule from the channel-state rule without reconstructing two prior revisions.

Referral (objective lane / Orchestrator): the old door classified when `#input === 0 &amp;&amp; #inputFault === undefined`; the new one goes quiet whenever `end()` has been called, which on a default `writable`-unset channel is its whole life. Settle whether a non-writable channel can produce a host-reported `stdin` `error` after the input phase settles cleanly — old code emitted `protocol` there, new code is silent forever. Settling command: `npx.cmd vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Process.test.ts` against a probe that ends the channel and then forces a stdin stream error with `#input === 0`.

**2. F2 — clear at `#input === 0`, remove `#inputEvent` — CONFIRMED**

`src/server/Process.ts:396-397` sets the fault then clears it unconditionally at zero; `#inputEvent` is gone from the field block (`:98-99`) and from every reader (grep over `src` returns no hit). The derivation the finding asked for is real. Behaviour neutrality holds only through claim 1's added condition — see that claim; and see finding A, which is the same class of state this claim exists to remove, left half-closed.

**3. F3 — residual signature pinned — CONFIRMED**

`tests/src/server/execution/execute.test.ts:211-218` asserts `failed` and then pins `expired`, `aborted`, `truncated`, `code`, and `signal` in one `toMatchObject`, beside the existing assertion as prescribed. It matches the contract sentence in `src/core/types.ts:250-253` and the guide at `guides/process.md:645-647` member for member. The failing-first control (`expired` flipped) is recorded in the report.

**4. F7 — name the input-fault door — BROKEN**

Three parts land. The code member sits in the centralized tuple (`src/core/constants.ts:23-30`), so `ProcessErrorCode` (`src/core/types.ts:485`) and the guard's admitted set (`src/core/errors.ts:64`) derive it with no edit, which is the right seam. The message names the door: `` `Command '${result.command}' failed while writing standard input` `` (`src/server/execution/execute.ts:213`). The guide enumeration moved with the tuple — the table row at `guides/process.md:827`, the type row at `:186`, the strict sentence at `:617-618`, the `spawn` row reworded at `:825`, and `createExecuteError`'s scope restated at `:871` — and `tests/guides.test.ts:697-707` gates that table's membership against the tuple, so this half is machine-held rather than prose-held.

The fourth part fails. The routing condition is wider than the door it names:

```ts
// src/server/execution/execute.ts:211-220
if (result.failed &amp;&amp; strict) {
    if (inputFailure.signal.aborted) { throw new ProcessError(/* code: 'input' */) }
    throw createExecuteError(result, cause)
}
```

`inputFailure` aborts from the stdin **stream** handler too (`:164`), not only from the input write callback (`:184-186`), and `child.stdin.end()` runs on every run (`:188`) whether or not the caller passed input. The listener at `:154-162` already draws the distinction the branch needs — it sets `cause` and terminates only when the fault actually ended the run, and returns early when `finish` already aborted — but the branch reads the raw `aborted` flag instead, so a stdin error that arrived after the run settled, or alongside a spawn fault, re-codes a genuine `spawn` failure as `input`. Nothing pins the other side: `tests/src/server/execution/execute.test.ts:179-189` exercises the spawn fault under `strict: false` and never sees the rejection, and the only `toBe('spawn')` in the tree (`tests/guides.test.ts:1092`) calls the factory on a synthetic result and never reaches this line. So "byte-identical for genuine spawn faults" is asserted by nothing.

Required change, `src/server/execution/execute.ts:212`: branch on the fact that the input fault ended this run, not on the controller's flag — the value the listener already computes (`cause === inputFailure.signal.reason`, or a discriminant the listener sets where it decides to terminate). Add the missing pin beside the F7 pin: a strict `execute` against an unspawnable file asserting `thrown.code === 'spawn'`, in `tests/src/server/execution/execute.test.ts` near `:179`.

Referral (objective lane / Orchestrator): whether the mis-route is reachable, and whether it is a race rather than a certainty, needs a run. Settling command: `npx.cmd vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/execution/execute.test.ts` with a strict spawn-fault case repeated enough times to expose ordering between `child.once('error')` and the `stdin` error from `:188`.

**5. No ride-along regression — UNRESOLVED**

I can rule the owned files coherent: everything I read in `Process.ts`, `execute.ts`, `constants.ts`, `errors.ts`, the execute suite, and the guide passages is either a prescribed edit or unchanged from the state `unit-p4fix-report.md` records, and the after-status adds only the amendment-owned `src/core/constants.ts`. I cannot close the claim. The block in `unit-p5-report.md:5-79` is a hand-elided summary, not a diff: its hunks carry no line numbers, its `-` lines drop type annotations that the pre-image had (`(cause: Error)` at `Process.ts:158`), and it contains no hunk at all for `guides/process.md` or `src/core/types.ts` though both are listed modified and the report asserts guide edits at `:81`. The pre-unit tree was already dirty (`unit-p5-report.md:89-98`), so no baseline separates standing edits from this unit's. Settling command: `git -C C:/Users/mikes/WebstormProjects/process diff HEAD -- src guides tests` read against the landed hunks in `unit-p4fix-report.md`, or the release commit's own diff at acceptance.

## Findings outside the claims

**A. `#inputFault` is now decided by nothing — `src/server/Process.ts:99, 396-397, 413.** `#completeInput` sets the field at `:396` and clears it at `:397` when `#input` reaches `0`, with no suspension point between the two statements and no other writer in the file. So `#inputFault !== undefined` implies `#input &gt; 0` at every observable moment, and its sole remaining read — the third disjunct of the stream door at `:413` — can never be the disjunct that fires. The field is a stored fact with no reader, which is the exact shape F2 was raised to remove and which `AGENTS.md` § Design laws forbids under "Derive state". Right looks like deleting `#inputFault` and the dead disjunct, leaving the stream door reading `writableEnded || this.#input &gt; 0`, which is also the version a reader can check. If it is kept, it needs the comment saying what it still decides.

**B. The guide's `protocol` row no longer covers what `protocol` means — `guides/process.md:829`.** The row reads "`ProcessManager.launch` ran after `destroy` had begun", but a supervised channel's host-reported stdin fault is also `protocol` (`src/server/Process.ts:424-427`, documented at `guides/process.md:336` and `:914-916`). The omission may predate P5, but P5 owned this table and its own row at `:827` ("A rejecting run's standard-input write reported a host fault") makes the gap actively misleading: a reader now learns that a standard-input fault is coded `input` and has no way to learn that the same fact on a `Process` channel is coded `protocol`. The membership gate at `tests/guides.test.ts:697-707` checks the row exists, never that its sentence is true. Right looks like the `protocol` row naming both doors, and the `input` row saying it belongs to `execute` alone.

**C. The quiet-phase sentence is now false for a non-writable channel — `guides/process.md:343-345`.** "The quiet phase ends with that write and `end` lifecycle" describes the removed latch. Under the shipped door, a channel that was never writable has `writableEnded` set from construction and stays quiet for its whole life; the phase ends only where `writable: true` kept `end()` uncalled. The following clause limits its claim to a `writable: true` channel, so the passage is not wrong end to end, but its rule and its example now disagree. Right looks like stating the rule the code holds: a channel the package ended is quiet for its life, and only a `writable: true` channel surfaces a later host fault as `protocol`.

VERDICT: FAIL — 1 broken, 2 unresolved, 0 not-evidenced, 3 findings outside the claims