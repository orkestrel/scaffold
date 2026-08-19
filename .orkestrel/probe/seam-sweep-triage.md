# Six-lens sweep — triage into repair units

29 findings survived refutation. Full evidence for each is in `seam-sweep-findings.md`; this file
groups them by the file that owns the fix, so each unit writes a disjoint set and can be audited on
its own.

Order is by damage, not by file. Two units close false-proof paths and go first, because for this
package a wrong proof is worse than a crash: a crash is visible and a receipt is believed.

## Unit S1 — the runtime stage stops certifying what it did not run (`RuntimeStage.ts`)

The heaviest unit. Three high findings, two of which issue receipts for cases that never executed.

- **A skipped test yields a clean check.** `#findings` collects module errors and
  `allTests('failed')`. A `.skip`, a `todo`, or a skipped `describe` produces neither, so the check is
  clean and a receipt is issued for a case whose test never ran. This is the same defect class the
  package exists to prevent, reached without touching `Case.files` at all.
- **The per-run eviction removes nothing.** The design's own risk register says to evict each result
  after returning it. The calls that were meant to do that do not, so runner state and the workspace
  results cache grow one entry per inspection for the life of the process.
- **Worker stdout shares the stream that frames JSON-RPC.** Anything a test prints can corrupt a
  protocol frame on the entry's stdio channel.
- Plus one low: a `Case.test.path` both the shape and the guard admit can make `prove` throw rather
  than return a verdict.

Acceptance leads with the skipped-test control, because it is the cheapest demonstration that a
receipt can be wrong: a case whose only test is skipped must not earn one.

## Unit S2 — the deadline bounds the work, not the queue (`Probe.ts`)

One high and three medium, all one root plus its neighbours.

- **The deadline is armed before the inspection is queued.** `#inspectRuntime` starts the timer, then
  calls `stage.inspect`, which appends to the stage's queue rather than running. So the budget covers
  queue time, while `ProbeOptions.deadline` documents it as bounding one runtime stage.
- **Under two concurrent claims that misattributes and then destroys.** A second claim's timer can
  fire while its inspection has barely started; the expiry path destroys the shared stage and installs
  a replacement, failing a different claim already bound to the destroyed instance.
- **Only the runtime stage is deadlined**, so a stalled type or lint stage turns a `tools/call` into an
  unbounded hang.
- **The boot control discards the findings that explain why arming failed**, so a refusal says a
  control was not detected and not what the stage actually reported.

Concurrency is reachable and this unit must assume it: the stdio transport reads with a plain data
handler and nothing awaits the async message listener beneath it, and `prove` has no mutual exclusion.

## Unit S3 — the lint stage survives its child's death (`LintStage.ts`)

Two high and four medium, all one subject: what happens when the Oxlint server goes away.

- **A signal-killed server makes `prove` and `destroy` hang forever**, because liveness is read from
  `exitCode` alone.
- **An orphaned document promise ends the host** when the probe is destroyed and nothing handles the
  rejection.
- **`child.stdin` carries no error listener**, so an `EPIPE` from a write racing the child's death is
  an uncaught exception rather than a stage fault the coordinator could recycle around.
- **The cleanup handler throws and replaces the real diagnosis**, so the exit code and signal — the
  only evidence of why the stage stopped — are discarded and the document map is never pruned.

This unit is where a resident service earns the word resident. Every finding here is a way the probe
stops being available without saying so.

## Unit S4 — the type stage's overlay cannot outlive its inspection (`TypeStage.ts`)

- **Overlays are applied outside the `try`**, so one bad path in a claim pins a stale in-memory copy of
  a real workspace file for the life of the process. That is the stale-source defect the design's five
  laws exist to prevent, reached through the cleanup path rather than through caching.
- **`#versions` is never pruned** while `#overlays` is, so the stage retains one entry per distinct
  claim path forever.
- Its class documentation describes a project selection the coordinator no longer uses.

This unit is a prerequisite for the candidate-source overlay work, which rebuilds the same lifetime.

## Unit S5 — the contract stops describing a package that does not exist (`src/core/*`, `src/server/types.ts`, `helpers.ts`)

Two high and six more. Documentation defects reach every consumer, and two of these are worse than
wrong prose.

- **The canonical `Claim` example declares a control byte-identical to its case**, so the documented
  example of the package's central idea can never earn a receipt. Anyone copying it gets a refusal.
- **`CLAIM_SHAPE` documents a derivation that does not exist.** It says the tool admits calls with
  `compileGuard(CLAIM_SHAPE)`; the tool admits them with `isClaim`, and `compileGuard` is never called
  anywhere in the package. The single-source story the shape's own comment tells is not true, and only
  a test holds the two together.
- **`Control.reason` is required, validated at three layers, and read by nothing** — the same defect
  as `Claim.project` before it was routed, and it needs the same ruling: route it or remove it.
- Five more where a sentence describes behaviour the code does not have: an mtime-keyed revalidation
  that actually hashes contents, a root-project fallback whose only consumer throws, a teardown
  guarantee the coordinator refuses to trust, a `Verdict.id` described as a revision identity, and an
  `expire` event whose text claims a recycle that has not happened yet and may not.

## Unit S6 — the entry owns its own shutdown (`src/bin/main.ts`)

The entry wires no shutdown and no error observation, so a disconnect orphans the process and every
fault the probe contains is discarded. Note the architecture rule: a runtime entry declares no
module-scope constant and no module-scope function, so the lifecycle belongs on the server surface.

## What this does to the plan

These sit before the candidate-source implementation. S1 and S2 close false-proof paths that need no
new mechanism, S3 and S4 repair the resident lifetime the overlay work builds on, and S4 in particular
is a prerequisite because the overlay rebuilds the lifetime it fixes.

Two findings are already known and stay where they are: the type stage's `fileExists` gap is the
candidate-source defect and belongs to that design's units, and the entry's shutdown finding overlaps
a withdrawn claim about orphaned processes — the processes do exit, and the finding that stands is
about discarded faults rather than leaked children.

## Added to S2 by the third repair round's audit

**A `prove` rejection emits two `error` events, not one.** The audit triggered a real arming failure
and observed one rejected call and two identical events: `#arm` emits and rethrows, and `prove` emits
the same error again on the way out.

The first repair round asked for exactly one event per rejection and produced the second emit while
closing a case that had none. The audit confirmed the duplicate exists in the commit before round 3
as well, so round 3 did not introduce it — the guarantee was simply never true.

A consumer counting error events double-counts every arming failure. It belongs to S2, which owns
`Probe.ts` and already carries the arming and error-path work.

## The third round's design decision, endorsed

The audit ruled the fixed resident set plus one recycled slot the right bound: it preserves declared
projects, admits an undeclared one without letting caller strings grow resident memory, and gives
repeated use of one undeclared project locality. It measured the cost the round predicted —
alternating two undeclared projects rebuilds a service each time at 432-573 ms — and ruled it
acceptable for an exceptional path provided it stays documented, because it is caller-driven CPU work.

It refused a least-recently-used cap for the reason the round gave, and refused rejecting undeclared
projects because that removes an admitted capability.
