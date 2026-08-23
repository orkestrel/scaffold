# FIX-R — implement the ruling that ends the selector seam

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, reached through `codex exec`, rooted at
`/home/user/scaffold`, sandbox `workspace-write`. Do the work yourself. Spawn nothing.

**Write limit, named before dispatch:** your sandbox refuses writes under `.agents/`. Nothing here
needs it. If a fix appears to, stop and report.

## This is not a sixth predicate

Five CommonJS selectors have shipped and every one was broken by a later round.
`.claude/rules/quality.md` § Rounds and verdicts sets three rounds at one seam as the budget and
switches strategy at it. That switch has fired. **You are implementing a ruling, not proposing an
attempt.** The ruling is fixed below; your work is to realise it and to keep its constraint.

## The source, measured

The probe asks whether a **typed** CommonJS consumer can take a subpath. TypeScript decides that from
the **declaration** the `types` condition resolves. Every selector so far classified the **runtime
target**. Mismatched fixtures under `node16`, reproduced by the Orchestrator:

```text
  package             types      runtime    .cts consumer under node16
  decl-cts-rt-mjs     .d.cts     .mjs       accepts
  decl-mts-rt-cjs     .d.mts     .cjs       TS1479
```

The runtime target does not enter TypeScript's decision. The two authorities agree in every ordinary
package, which is why a wrong subject survived four falsifications.

## R1 — the invariant

**Membership of the CommonJS compile probe is decided by the resolved declaration's format.** A
`.d.cts` declaration admits. A `.d.mts` declaration refuses. A `.d.ts` declaration takes its own
nearest enclosing `package.json` scope. The runtime target's format is a separate question the runtime
drive already answers by loading it.

## R2 — the constraint, which is the substance

Correctness must not be bought by removing evidence. The previous revision did exactly that, and the
audit caught it.

- **Restore the loud failure.** The `!isPackageTarget(target)` guard added to `resolvesCommonJS`
  turns an invalid `require` target beside a valid `import` target into a silent drop. It used to
  redden at the drive with `ERR_INVALID_PACKAGE_TARGET`. `tests/guides.test.ts` pins the file's own
  rule that a non-list invalid target is **kept** for its later resolution failure. Remove that guard.
- **Keep fallback-list validation.** Skipping an invalid member inside a list and taking the next is
  Node's behaviour and is separately pinned. Do not touch it.
- **Do not add `.json` to the runtime-module set.** Every package publishing
  `"./package.json": "./package.json"` would then report undeclared — a false defect in every target.
  Resolve the double answer in the other direction: `resolvesCommonJS` admits `.json` while `isModule`
  refuses it, one target class with two answers in one emitted file. Drop the `.json` admission.
- **The runtime drive keeps its own checks.** Declaration eligibility gates the compile probe, not the
  drive.

## R3 — the interface

The emitted `tests/distribution.test.ts` and the guide passage describing it. Presence ownership means
a target keeps whatever ships, so **a maintainer must be able to reconstruct the rule from the file
they hold.** Three defects block that:

- **The emitted copy's "either" points at nothing.** Repairing last round's graft removed the only
  claim about *selecting*, stranding the next sentence. This sentence pair has been wrong three rounds
  running, in the copy that ships to every target. Restore the antecedent without reintroducing the
  undefined "axis" vocabulary — that word has no referent in a consumer's own proof file.
- **`RUNTIME_CONDITIONS.commonjs` is dead.** Declared and commented, read by nothing: the only reads
  of `RUNTIME_CONDITIONS` are `.module` and `.browser`. The emitted file offers a maintainer two
  CommonJS condition sets, one live and one inert. Delete the member and fold its explanation into the
  live set's comment.
- **The guide states rules the code does not implement**, including a sentence describing a runtime
  set no drive reads, and the `.json` contradiction. Rewrite the passage against R1 and R2.

## R4 — the instrument must prove behaviour, not shape

The AST call census is evadable two ways the audit demonstrated: keep every required call and change
the values pushed onto the entry; or keep the call text byte-identical and corrupt its argument. A
shape assertion over a body pins the spellings someone thought of.

The test already lifts and executes the classifier. Lift `buildStage`'s classification the same way,
feed it a staged manifest, and assert the records it produces. Prove it with a firing control that
**changes a pushed value while leaving every call present** — the exact evasion the census admits.

Split the call-site assertion out of the test named for fallback traversal; a red there reports the
wrong subject.

## R5 — the report

`.orkestrel/campaign/fix-q-report.md` carries counts over growable sets and a temporal `now`, most of
them the Orchestrator's, and a missing blank line renders its weak-claim paragraph as a heading.
Delete each count rather than correcting it; name the members instead. Add the blank line.

## Owned files

- `src/core/templates.ts`
- `tests/src/core/templates.test.ts`
- `tests/guides.test.ts`
- `guides/scaffold.md`
- `.orkestrel/campaign/fix-q-report.md`
- `host.json` — regenerated, never hand-edited

## Off-limits

- `.agents/` in every form, `src/core/compilers.ts`, `src/bin/CLI.ts`, `ROADMAP.md`,
  `tests/distribution.test.ts`.

## Unknowns, named as unknowns

- Whether a `.d.ts` declaration's nearest-scope walk needs the declaration's own directory rather than
  the target's is not settled. Determine it and say how.
- The subjective lane named candidate omissions it could not execute: `.cts`/`.mts` targets, a
  leading-dot file name, a malformed nearest manifest throwing out of `buildStage` at import, and a
  symlinked target. Under R1 most become moot because the declaration decides — say which, and settle
  any that survive.

## Execution and probes

Probes only under `tmp/fix-r/`, never inside `tests/` except the two owned test files. Delete them
before returning. Do not run a tree-wide gate. Scope every run.

Your sandbox denies a grandchild process, a nested install, a loopback listener, and `.agents/` writes.
Seven times in this campaign a reported denial led to a host reading that found something. Report;
never substitute the reachable half.

## Acceptance criteria, in this order

**Regeneration first** — you edit a vendored file, and a gate reading `host.json` cannot pass until the
digest moves.

1. `npm run build && npm run build:inventory`, then `git diff --stat host.json` shows the digest moved.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over your owned TypeScript files exits 0.
3. `npx oxfmt --config .oxfmtrc.json --check` over your owned TypeScript files exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. The vitest project covering `tests/src/core/templates.test.ts` is green by explicit project name,
   including the emitted-corpus oxfmt fixed-point test.
7. R1 has a test over the mismatched fixtures above plus the shapes already pinned, with a firing
   control.
8. R2's restored loud failure has a test proving an invalid non-list `require` target still reaches a
   reported failure, with a firing control that re-adds the guard.
9. R4's instrument reds on a pushed-value mutation with every call present. Record that transcript.
10. Name each test for what it proves, never for this brief's labels.

Report any whole-suite or distribution-proof result as an OBSERVATION. The authoritative runs are the
Orchestrator's, including the indexeddb end-to-end proof.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — if
R1's invariant cannot be implemented without violating R2's constraint, or if a criterion needs a file
you do not own. Otherwise decide phrasing and placement yourself and carry on.

## Output

- R1: the implementation, and the fixture table including both mismatched shapes.
- R2: each constraint, and what you did about it.
- R3: each of the three interface defects.
- R4: the behaviour instrument and its firing-control transcript.
- R5: what changed.
- The gate results in order with their real output.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.
