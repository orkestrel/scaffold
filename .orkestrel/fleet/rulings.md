# Rulings — the three design questions the acceptance round forced

Decided by the Orchestrator after a two-lane blind design pass. Both lanes ran on one brief, neither
saw the other. Where they disagreed, the disagreement was settled by running it, not by weighing the
arguments.

## A — the write guard promises location, not lineage

**Both lanes ruled the same way: narrow the claim, keep the mechanism.**

`WriteAnchor` is `{path, device, inode}`. That pair answers where the next write lands, never whether
the directory was left alone. The threat the guard exists to catch is a path-resolution escape — an
ancestor becoming a file, a symlink, a directory elsewhere, or nothing — and every one of those is
caught, because a replacement arriving by `rename` or `symlink` carries its own inode. Inode reuse
inside a write window is a continuity failure, not a containment failure, and it is outside the
guarantee.

Both lanes rejected widening `WriteAnchor` with a creation timestamp, on four grounds that survive
the Orchestrator's own measurement that `birthtimeMs` distinguishes a recycled inode 12/12 on this
host:

- `birth` is already a load-bearing word in this package — `Ownership` has a `birth` tier — and a
  `WriteAnchor.birth` timestamp beside it is two meanings for one word;
- on a filesystem without creation time Node reports a substitute, so the comparison silently
  degrades to comparing two identical substitutes: a guard that reports "same" exactly where it
  cannot see, which is the control-population failure `.claude/rules/quality.md` names;
- it breaks a second published type in one campaign;
- millisecond precision does not even close the case.

Holding an open directory handle would work and was rejected as the identity subsystem the brief
bounded out: it changes the host's behaviour rather than observing it, blocks deletion on Windows,
costs a descriptor per ancestor, and adds a release ordering `discard()` does not have.

**Test design taken from the subjective lane.** The objective lane proposed asserting that
`matchesAnchor` equals a device/inode comparison, which is the function compared against a
reimplementation of itself. The subjective lane's scenario is real: allocate the replacement
directory while the original is still live, so it necessarily holds a different inode, then rename it
over the target. `false` becomes a property of the scenario rather than of a pinned inode.

## B — the summary reports this run's outcome

**The lanes proposed different partitions. The subjective lane's is adopted; the objective lane's
extraction is adopted with it.**

The tail's axis changes from what ownership entitles audit to compare — a property of the plan, which
prints identically against a vacant target and a repaired one — to what actually decided each verdict
on this run:

- **bytes**: content-owned findings carrying `observed`, where the hex comparison was made;
- **existence**: content-owned `missing` findings plus every presence-owned finding, where presence
  or absence decided it and no bytes were read;
- **nothing**: birth-owned findings, not examined.

The objective lane proposed four counts, keeping content-owned-missing separate from presence-owned.
Rejected as longer without being clearer: both are decided by existence alone, which is the axis, and
the brief bounds a paragraph inside a one-line summary.

The verb moves to the past tense, which removes subject-verb agreement from the sentence entirely and
leaves one inflection point on the noun. That dissolves the `0 of 1 planned path differ` defect rather
than patching it.

The pure projection extracts to `auditToSummary` in `src/bin/helpers.ts`, per the objective lane, so
the sentence is provable against hand-built audits instead of only by driving the CLI.

## C — the guard proves shape; the producer owns the correlation

**The lanes opposed each other directly. Settled by reading the code rather than by argument.**

The objective lane held that `isFinding` accepting `birth` with `stale` leaves the published boundary
unsound, since `isAudit` composes it and public materializer verbs accept guarded audits. The
subjective lane held that the correlation is a theorem about `inferDrift`, and that encoding it in the
type would be a second copy of that case analysis able to drift from it.

Verified: `Materializer.repair` re-derives every finding itself at `src/server/Materializer.ts:251`,
passes the caller's audit to `#reconfirm` only to require agreement, and builds its write set from
`derived.findings` — never from the caller's. `remove` acts only on `foreign` findings, which carry no
ownership. A semantically impossible `Finding` therefore produces a refusal and never a wrong write.

`.claude/rules/quality.md` bounds the fix by reachability: a defect reachable through the package's
own shipped code is repaired now, and an obligation reachable only through a hypothetical foreign
implementation is documented on the interface that owns it. This is the second. The type and the
guard stand; the boundary is stated in prose, and the theorem is proven where it lives — a producer
matrix over `artifactToFinding` whose negative control is drawn from outside the population it
covers, asserting that `isFinding` accepts a verdict no cell of the matrix produces.

One defect falls out of the ruling and is repaired with it: `#reconfirm` raises "moved since its
audit" for a verdict that never described the target at all, which is a wrong diagnosis rather than a
wrong action.

## Order

A, then C, then B. Serialized: C and B both rewrite `guides/scaffold.md:630-647`, and A touches the
transaction section and the server sources.

## Acceptance round 2 — FAIL, reconciled

Both lanes returned FAIL on the successor brief. They broke different claims, which is the shape
`references/reconcile.md` calls two correct answers to two different questions rather than a tie.
Every finding below was reproduced by the Orchestrator or carries the lane's own measured control.

### Where the lanes split

- **Claim 1** — the objective lane broke it on containment (a dangling link pointing _inside_ the
  root is now refused exactly like one pointing outside). The subjective lane broke it on the gate
  (the multi-environment-requires-core question runs for every verb, so an existing workspace of that
  shape can no longer be audited or repaired). Both retained; the claim was a universal carrying two
  subjects.
- **Claim 3** — the objective lane confirmed. The subjective lane falsified it with a control:
  gzip expands incompressible input, so wire bytes can exceed decoded bytes and the declared-length
  pre-check refuses a body the enforced bound admits. The comment's "a declared length is at or under
  the decoded count" is false. Measurement beats derivation.
- **Claim 5** — the objective lane broke it: a generated browser-app workspace fails `check` and
  `test`. The subjective lane could not decide it, lacking browser dependencies. The Orchestrator
  reproduced the objective lane's finding directly.
- **Claim 7** — the objective lane confirmed. The subjective lane found the site one line below the
  repair: a directory is created by `mkdirSync` and recorded only after a `readAnchor` that can throw
  between them.
- **Claim 9** — the objective lane could not decide it because the Orchestrator never supplied a
  disposition of the 27 sweep findings. That omission is the Orchestrator's.

### The pattern both lanes converged on

The chain's **code** rulings held under attack. Its **prose** rulings drifted: where the chain chose
to document a limit rather than close it, the prose was written for the option that lost, or written
more confidently than the code earns. The trailing separator is the worst case — the shipped
declaration's `@example` says `isFilesystemPath('project/') // false` while the build returns `true`,
inside a guide section whose stated purpose is telling a reader the truth about what the package will
not do. Prose is the half that gets installed 41 times.

### Bound established

Zero of the 41 published packages export both `browser` and `server` without a root export, so the
gate regression reaches no fleet package. It is a real defect and it does not block propagation.
