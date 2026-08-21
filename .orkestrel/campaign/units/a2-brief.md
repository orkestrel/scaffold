# A2 — focused falsification of R1's construction departure

## Subject

Commit `16f36c1` in `/home/user/test` — fix round R1, written by the Sol implementer. The round's
one departure from the A1 prescriptions: the `createRecorders` construction restored the
guard-narrow shape (partial accumulation narrowed by the new public `isRecorderMapComplete` guard
in `src/core/validators.ts`) rather than the tuple-annotated `fromEntries` the subjective lane
prescribed or the bare replacement the objective lane prescribed.

## What the round decides

Whether R1 is accepted. The wider chain has its own round; this one attacks only R1's fresh
surface.

## Already established — verified by the Orchestrator directly

All four tsc projects, the core suite (87 tests), lint, and format exit 0 at `16f36c1`. The
factory contains no `Object.fromEntries`. The promoted desync regression ran red before the repair
(`expected 1 to be +0`) and green after. The compile proofs bind exact per-key tuples and exercise
inference through an `EventSourceInterface` reference.

## Review evidence

The actual diff: `/home/user/scaffold/tmp/design/r1-diff.patch` (also `git show 16f36c1`). The
writer's report: `/home/user/scaffold/.orkestrel/campaign/units/r1-report.md`. Read the delivered
source directly at the tip. `git status` is clean.

## Execution limits

Your allowlist is Read/Grep/Glob — you cannot execute. Rule from source, the diff, and the
supplied executed evidence. For any claim that needs a run, return UNRESOLVED with the exact
settling command and the Orchestrator runs it.

## Numbered claims — attempt refutation

CONFIRMED requires naming the attack you tried that failed. Do not hedge.

1. The construction is honest end to end: no expression in `createRecorders` or
   `isRecorderMapComplete` rides an `any`-producing overload, an unsound index write, or a
   variance hole that would let a wrong per-key recorder type reach the declared return. Name the
   specific expression you attacked.
2. `isRecorderMapComplete` is total over its declared inputs: no input the types admit makes it
   throw, and its narrowing is truthful — it cannot return `true` for a map missing a listed
   event, including under duplicate names, an empty events list, and a widened array.
3. The guard's name, file, export, and barrel row satisfy the naming and placement rules for a
   new validators kind file.
4. The signal lifetime cleanup is correct under every interleaving of: scoped add, manual remove
   before lifetime abort, lifetime abort before manual remove, one-shot fire before lifetime
   abort, already-aborted lifetime at add, and the same callback registered both scoped and
   unscoped. The internal cleanup controller detaches its own listener in each.
5. The widened-array keying limit is documented where a reader meets it, in language the writing
   rules permit.
6. R1 as a whole introduces no new public surface beyond the guard, and every changed TSDoc claim
   is checkable.

## Output

The `orkestrel-falsify` verdict shape: numbered verdicts with evidence, findings outside the
claims to the BROKEN standard, one terminal line.
