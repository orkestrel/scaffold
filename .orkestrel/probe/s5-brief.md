# Unit S5 — the contract stops describing a package that does not exist

## Role and engine

`implementer` — Claude Opus 5, high reasoning effort. Eight defects, all of them documentation voice
and contract shape, which is this engine's assignment.

## Objective

Make every sentence in the package's public contract true of the code that ships, and rule on the one
field the contract requires and nothing reads.

## Context

Read before acting, in this order: `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `documentation.md`, `tests.md`, `quality.md`, `writing.md`; then this
brief. No skill is named for this unit.

Governing guide: `PROBE.md`.

Documentation defects reach every consumer who installs the package, and two of these are worse than
wrong prose: they are examples a consumer copies and a contract a consumer codes against.

`.claude/rules/documentation.md` is load-bearing here: "Falsify a prose claim the way you falsify a
code claim." A `// false` beside a call that returns `true` is a defect of the same kind as a wrong
return value.

## Defects

### A — the canonical `Claim` @example can never yield a receipt

`src/core/types.ts` lines 94-102. The example binds one `greeting` source and one `test`, then uses
both in `case` AND in `control`:

```text
 * const greeting: Source = { path: 'src/core/greeting.ts', text: 'export const GREETING = "hi"\n' }
 * const claim: Claim = {
 * 	case: { files: [greeting], test },
 * 	control: { files: [greeting], test, stage: 'type', reason: 'the control must not compile' },
 * }
```

The control declares `stage: 'type'` and `reason: 'the control must not compile'`, and the text it
names is `export const GREETING = "hi"`, which compiles. `computeReceipt` issues only when every case
check is clean AND the control failed at its declared stage, so this claim can never earn a receipt.

This is the flagship example on the package's central type, so it is the shape a first consumer copies.
They get a refusal with no indication that the example, rather than their code, is wrong.

The same file gets it right 20 lines earlier: the `Control` @example at lines 70-75 uses
`'export const GREETING: number = "hi"\n'`, which genuinely fails the type stage it names. Use that
text. This is a transcription defect, not a conceptual one.

### B — `CLAIM_SHAPE` documents a derivation that does not exist

`src/core/shapers.ts:68` says the tool "admits a call with `compileGuard(CLAIM_SHAPE)`".
`src/server/factories.ts:65` admits with `isClaim(input)`. `compileGuard` has no call site in `src/` at
all — every occurrence there is inside a doc comment.

The anti-drift guarantee the remark exists for is now real, but by a different mechanism than the
remark describes: `tests/src/core/validators.test.ts` asserts `isClaim` agrees with
`compileGuard(CLAIM_SHAPE)` over a named hostile population. Rewrite the remark to say that — the tool
publishes `compileSchema(CLAIM_SHAPE)` and admits with `isClaim`, which a test holds to
`compileGuard(CLAIM_SHAPE)`'s exact behavior. Keep the guarantee; drop the call path that does not
exist.

### C — `Control.reason` is required, validated at three layers, and read by nothing

`grep -rn 'reason' src/` returns writes and declarations only, no reads. It is declared in
`types.ts:82`, shaped in `shapers.ts:58`, guarded in `validators.ts:89`, and written by the package's
own arming controls at `Probe.ts:142` and `:152`. Nothing ever reads it.

**This is a ruling, not an edit, and it is the unit's real decision.** It is the same defect
`Claim.project` had before it was routed, and it takes the same two-way choice: route it or remove it.

Rule it on the repository's own laws. The minimal-public-API gate says do not carry a capability with
no consumer. Against that: a control's reason is the claimant stating what they believe falsifies their
claim, and a probe that records why a control was expected to fail has an audit value a probe that
discards it does not. If you rule to route it, route it somewhere a consumer can actually read — the
verdict is the obvious candidate — and that makes it a `Verdict` change, so say so. If you rule to
remove it, remove it from all three layers and from every example.

State the ruling and the law you ruled it on. Do not leave it as it is.

### D through H — five sentences that describe behavior the code does not have

Each is a prose repair. Verify each against the code before rewriting it; do not take this brief's
summary as the finding.

- **`ProbeInterface` and `ProbeOptions` describe an mtime-keyed revalidation** of every workspace file.
  The sweep hashes contents and covers only module extensions.
- **`inferTestProject`'s `@returns`** says `undefined` selects the root project. The only consumer
  throws on `undefined`, and no root project exists.
- **`StageInterface.destroy`** states a teardown guarantee the coordinator's own code refuses to trust.
- **`Verdict.id`** is documented as the revision identity the verdict was produced for. It is an
  independent UUID no stage ever sees.
- **The `expire` event doc** says the runtime worker was recycled. The event fires before recycling
  starts, and recycling is conditional.

There is also a sixth, lower: **the `Verdict` @example reports an `elapsed` the code cannot produce
from its own per-stage numbers.** Recompute it from the stage numbers in the same example.

## Also yours — the admission check unit S4 deliberately deferred

A workspace-escaping `Source.path` is admitted by both `isSource` and `SOURCE_SHAPE`, which constrain
`path` only to a non-empty string. That lets a malformed claim reach a stage and fail part-way through
it.

Unit S4 repairs the stage so it cleans up whatever it is handed. You add the other half: refuse the
path at admission, so the bad input never arrives. Both must hold on their own — do not weaken S4's
work by assuming admission covers it, and do not skip this by assuming S4 covers it.

A path is a wire-level contract concern, so the check belongs with the guard and the shape, not in a
stage.

## Scope

- **Owned**: `src/core/types.ts`, `src/core/shapers.ts`, `src/core/validators.ts`,
  `src/server/types.ts`, `src/server/helpers.ts`, and `tests/src/core/**` for the tests these changes
  owe.
- **Conditionally owned**: if your ruling on defect C routes `reason` into the verdict, you also own
  `src/core/helpers.ts` for `computeReceipt`/`formatVerdict` and `src/server/Probe.ts` ONLY for the two
  arming-control literals at lines 142 and 152. Say in your report that you took them. If the ruling
  needs more of `Probe.ts` than those two literals, stop and report — that is a unit boundary, not a
  detail.
- **Off-limits**: `src/server/stages/**`, `src/server/factories.ts`, `src/bin/main.ts`, `guides/**`,
  `PROBE.md`, `package.json`, `vite.config.ts`, `configs/**`, and every dotfile.
- **Tools**: read, write, and `Bash` for validation only.
- **Permissions**: do not commit, push, tag, publish, install a dependency, or run a destructive
  command. Do not add an npm package. Do not read, print, or copy a secret.

## Criteria

1. The `Claim` @example, executed, yields a receipt. Prove it by running it, not by reading it.
2. Every remaining @example in the owned files, executed, returns what its comment claims. Where a
   fence asserts a value, the assertion holds.
3. A workspace-escaping `Source.path` is refused by `isSource` and by `SOURCE_SHAPE`, and a contained
   relative path is still admitted. Both directions, or the check is untested in the direction that
   matters.
4. `isClaim` still agrees with `compileGuard(CLAIM_SHAPE)` over the hostile population
   `tests/src/core/validators.test.ts` already covers. Your admission change moves both; keep them
   agreeing.
5. Each of the six prose repairs describes what the code does. For each, name the code you read.
6. Defect C is ruled and implemented in one direction, with the law named.

## Execution

Perform this assignment directly. Spawn no subagent.

## Host facts your commands run under

- Working directory `/workspace/probe`. Nested process spawns are permitted.
- The whole-workspace `npm test` is safe and takes roughly three minutes.
- `tests/guides.test.ts` executes flagship guide fences. It does NOT reach TSDoc @example blocks, which
  is why defect A survived to ship. If you find a documented behavior with no gate, say so in your
  report rather than assuming parity covers it.
- The `probe` Vitest project reads `tmp/probe/`. Put any throwaway instrument in its own scratch
  directory.
- Units before you edited `tests/src/core/**`. Read those files as they are now.

## Unknowns

Whether defect A's repair belongs only in TSDoc or also in `guides/`. The Orchestrator has not checked
whether `guides/` makes the same claim. Check, and repair both if it does. If `guides/` is not yet
written for this surface, say so — a later unit writes it and needs to know.

## Deviation contract

Stop and report when a fix needs an off-limits file, when defect C's ruling needs more of `Probe.ts`
than the two literals, or when a gate reddens for a reason your change does not explain. Report
expected, found, the exact command and its output, whether the work is done, and at most one short
hypothesis.

Where the conflict is ancillary — a sentence's placement, which of two true phrasings to use — decide it,
record the decision, and carry on.

## Output

Return exactly: **Files written**, **Validation**, **Acceptance evidence**, **Deviation**, **Decisions**.

Under **Decisions**, lead with your ruling on `Control.reason` and the law you ruled it on. No process
diary.
