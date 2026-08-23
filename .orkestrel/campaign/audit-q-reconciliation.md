# FIX-Q audit — reconciliation, and the ruling that ends the seam

Both lanes returned FAIL. Objective: 8 broken. Subjective: 7 broken, 2 unresolved, 3 findings outside
the claims. Dated 2026-08-23.

## The seam has exhausted its budget, and the recurrence has a direction

`.claude/rules/quality.md` § Rounds and verdicts: three rounds at one seam is the budget, and reaching
it switches the search strategy. **The CommonJS decision has consumed five.** The subjective lane
named the direction: every revision of this predicate adds a refusal that removes a drive without
naming it.

The same section says a directed recurrence ends the depth search — locate the source, then plan the
downstream work from it. **This round located the source**, so the breadth sweep it prescribes has
already paid out and the next unit is the ruling, not a sixth patch.

## The source

The probe asks whether a **typed** CommonJS consumer can take a subpath. TypeScript decides that from
the **declaration** the `types` condition resolves. Every selector so far classified the **runtime
target**. Reproduced by the Orchestrator with mismatched fixtures under `node16`:

```text
  package             types      runtime    .cts consumer under node16
  decl-cts-rt-mjs     .d.cts     .mjs       accepts
  decl-mts-rt-cjs     .d.mts     .cjs       TS1479
```

The two authorities agree in every ordinary package, which is why a wrong subject survived four
falsifications: nobody built a package where they disagree until this round.

## The ruling

Stated as `.claude/rules/quality.md` requires — the invariant, the constraint bounding it against
over-correction, and the interface where a consumer meets the obligation. A ruling that names only
the defect it replaces produces the opposite defect next round.

**Invariant.** Membership of the CommonJS compile probe is decided by the resolved declaration's
format: a `.d.cts` declaration admits, a `.d.mts` declaration refuses, and a `.d.ts` declaration takes
its own nearest enclosing `package.json` scope. The runtime target's format is a different question,
and the runtime drive already answers it by loading the target.

**Constraint.** The ruling must not buy correctness by removing evidence:

- An invalid `require` target outside a fallback list stays kept, so its resolution failure still
  reddens. The subjective lane found the new guard swallowing exactly the case the file's own test
  pins as must-keep.
- Fallback-list validation stays, because skipping an invalid member and taking the next is Node's
  behaviour.
- `.json` is not added to the runtime-module set. Every package publishing `"./package.json"` would
  then report undeclared, which is a false defect shipped to every target.
- The runtime drive keeps its own checks. Declaration eligibility gates the compile probe, not the
  drive.

**Interface.** The emitted `tests/distribution.test.ts` and the guide passage describing it. Presence
ownership means a target keeps whatever ships, so a maintainer must be able to reconstruct the rule
from the file they hold. That is the obligation the prose carries, and it is why the emitted copy's
incoherences are release-blocking rather than cosmetic.

## What the lanes found beyond the source

Both lanes, independently:

- The enumeration is incomplete on its own terms — an unknown extension loads as CommonJS through
  Node's loader, and Node performs syntax detection on an ambiguous `.js` file.
- The guide describes rules the code does not implement.
- Counts in the campaign report, most of them the Orchestrator's.

Objective lane alone: the AST instrument is evadable by keeping every required call and changing the
values pushed onto the entry.

Subjective lane alone, and each is a distinct defect:

- **The new `isPackageTarget` guard turns a loud failure into a silent pass.** A package publishing an
  invalid `require` target beside a valid `import` target used to redden at the drive with
  `ERR_INVALID_PACKAGE_TARGET`; now the entry is dropped and nothing reports it.
- **`.json` gets two answers in one file.** `resolvesCommonJS` admits it; `isModule` refuses it. The
  incoherence is invisible until a package publishes a declared `.json` subpath.
- **The emitted copy's "either" points at nothing.** Repairing last round's graft removed the only
  claim about selecting, stranding the next sentence. Third consecutive round that sentence pair has
  been wrong, in the copy that ships to every target.
- **`RUNTIME_CONDITIONS.commonjs` is dead** — declared, commented, and read by nothing, so the emitted
  file presents a maintainer with two CommonJS condition sets, one live and one inert.
- **The call-site assertion sits under a test named for fallback traversal**, so a red reports the
  wrong subject.
- **A missing blank line renders the unit's own weak-claim paragraph as a heading.**

It also refuted the reason of record for choosing enumeration over observation, using the file itself:
`buildStage` already spawns children before classifying, and `driveRuntime` already distinguishes
error codes, so the conflation that ruling feared is one the file already handles. The conclusion may
still stand on the ground the Orchestrator's first probe found — `require(esm)` loads an ES module, so
a successful load discriminates nothing — but that ground is not what was written down.

## Both lanes returned UNRESOLVED honestly

The subjective lane could not execute and said so on E1 and E2 rather than deriving a verdict, naming
the exact fixture and command for each candidate omission. `.claude/rules/quality.md:92` is explicit
that a derivation reads exactly like a verdict while being a different thing. Its restraint is why its
executed-adjacent findings — traced through shipped code rather than guessed — carry weight.

## Carried to FIX-R

The ruling above, plus: the silent swallow, the `.json` double answer, the emitted copy's dangling
reference, the dead condition set, the behaviour-not-shape instrument, the guide passage, the test
name, the report's counts and markdown.
