# Unit S3 — audit verdict

Round three, 2026-09-16. Subject: the whole uncommitted change in the `scaffold` checkout, with the
round-three items as the focus.

**Ruling: REJECT, with a final unit S4 dispatched.** Both lanes found the change materially sound
and the remaining items small. The subjective lane wrote, of the change as a whole: "I would accept
it." What S4 carries is one factual slip in a test comment, one predicate whose runtime check is
weaker than the type it narrows to, and three instrument-rigor items.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `analyst` — GPT-5.6 Sol, Codex bench, `gpt-6-astra`, read-only | REJECT | `s3-audit-objective-report.md` |
| Subjective | `reviewer` — Opus 5, native subagent, clean context | REJECT | `s3-audit-subjective-report.md` |
| Gates | `verifier` — Sonnet, native subagent | GREEN | `s3-verify-report.md` |

Unit S3 was written by Opus 5, so the objective lane returned to Sol — the engine that did not write
the work. Both lanes ran on the same claim list, blind to each other.

Objective lane provenance: journal `tmp/codex/s3-audit-objective.jsonl`, session
`01a0acd9-…` as recorded at launch.

## What the Orchestrator settled by running it

The objective lane ruled claims 8, 9, and 13 UNSETTLED because its sandbox is read-only and every
retained instrument mutates. The Orchestrator ran all four on the host after both lanes exited, one
at a time, checking the tree between each. Log: `s3-instrument-run.log.txt`; runner retained as
`s3-instruments/s3-settle.sh`.

- `s3-relocation-control.mjs` — baseline and control captures both 3873405 bytes, the comparison
  against the control fails, the restored tree captures the baseline bytes, and the real comparison
  passes. The byte figure differs from the 3872317 in S3's report because the tree moved between the
  two runs; equality **within** each run is the property, and it holds.
- `s3-red-3-identity.mjs` — rival reading: mapped names pass, identity fails. Real selection: both
  pass.
- `s3-red-1-selection.mjs` — mutated `exit 1 — 1 failed | 419 skipped (420)`; restored
  `exit 0 — 1 passed | 419 skipped (420)`.
- `s3-red-2-pinning.mjs` — the same counts.

The tree returned to the same eight modified files after every script.

The printed counts also answer half of the objective lane's red-runner finding: `1 failed | 419
skipped` proves the named case ran and failed, where a startup or collection failure would report no
tests. The finding still stands against the script's own **assertion**, which reads exit status
only.

Claims 8 and 9 are therefore CONFIRMED. Claim 13's provenance half stays immaterial: the
byte-identity case compares whole file content against the generator on every run, so nothing can
drift without it failing, and how the bytes arrived carries no consequence under that gate.

## Where the lanes disagreed, and the ruling

**`isNamedPlugin`'s soundness — claim 10.** The objective lane refuted it: the predicate narrows to
`{ name: string }` but tests only `'name' in plugin`, so `{ name: 7 }` passes. The subjective lane
confirmed it: over the declared `PluginOption` union the only object variants carrying `name` type
it `string`, so the narrowing is sound over the declared domain, and an off-type value arriving
through an untyped path stays inert because the narrowed value is only compared with `===` and
pushed.

Both readings are correct about different things. The narrowing is sound against the declared type;
the runtime check is weaker than the type it asserts. `AGENTS.md` bars type assertions and requires
narrowing with guards, and a predicate that claims more than it checks is an assertion in a guard's
shape. **Ruling: add the string check.** It is one conjunct, it makes the guard honest, and it ends
the disagreement rather than recording it. Carried as S4 item 2.

**Whether `isNamedPlugin` should be exported.** The objective lane called the unexported helper a
contract violation against the prohibition on hidden module helpers. The subjective lane ruled it
must stay unexported: the predicate has no meaning apart from the one algorithm, the minimal-API
creation gate names no consumer, and a root configuration is outside the centralized-kind table and
already declares unexported module state.

**Ruling: it stays unexported.** The precedent that started this campaign — `applicationBrowser`,
deleted for being a hidden module helper in this same generated file — does not reach it.
`applicationBrowser` carried the entire browser configuration, a reusable capability with a dead
branch; `isNamedPlugin` is a local predicate with no independent meaning. Recorded rather than
carried.

## Findings carried to S4

| Finding | Source | Carrier |
| ------- | ------ | ------- |
| The hazard census misdescribes the repeated-name case's input | both lanes, agreeing | S4 item 1 |
| The predicate's runtime check is weaker than the type it narrows to | objective claim 10 | S4 item 2 |
| The red runners accept any nonzero or null exit as the named red | objective | S4 item 3 |
| Mutations are written before the restoring `try` opens, and the report's clean-tree claim is unconditional | objective | S4 item 4 |
| The relocation control prints equal byte lengths but never asserts them | subjective R4 | S4 item 5 |

## Findings recorded, not carried

- **The emitted `appShowcase` carries no comment on the boundary replacement** (subjective R1). The
  explanation sits in the template-level comment, which never ships, so the workspace developer who
  adds a plugin to a showcase reads only the general merge rule. One-home argues against restating
  the rule per factory. Recorded for whoever next owns the showcase template.
- **The local refusal case duplicates a stronger vendored proof** (subjective R2). The vendored
  `tests/config.test.ts` drives the same export with the same sentinel and carries a planted-factory
  control. Keeping the local copy keeps the merge rule set readable in one place. Belongs with the
  vendored-set placement question already recorded in round one.
- **The emitted merge text has three hand-maintained homes** (subjective R3): the template, the
  generated file, and the pinned literal in the test. Each is gated, so the invariant holds; the
  next brief that edits the merge must grant the test file.
- **Claim 12's span** — no execution compares the three-unit change against the pre-change baseline
  for keys other than `plugins`. Settled by construction instead: before the change a wrapper ran
  `mergeConfig(factory(), override)`; after it, the factory runs `mergeConfig(project, override)` on
  the same object literal it used to return. It is the same call with the same operands, and only
  `plugins` is replaced afterwards. Both lanes reached that reading by inspection.
- **`const replacement = candidates[index]` relies on `candidates[-1]` being `undefined`**
  (subjective). Every alternative under `noUncheckedIndexedAccess` is longer and no clearer.
  Recorded as the one place a reader pauses.
- **The search is quadratic in the worst case** (objective). No emitted base exceeds three plugins.

## Deviations this round

- **The round-two lane reports were retained after S3 was dispatched, not before.** S3's authority
  list named two files that did not yet exist. It proceeded on the brief's restatement and went to
  the code where the two disagreed, which is how it settled the `UserConfig` reading independently.
  Orchestrator retention error against `.agents/orchestration.md` § Dispatch anatomy, which requires
  the report retained as the unit returns.
- **A test comment named a `tmp/` script as the source of its red.** S3 caught it: acceptance sweeps
  `tmp/`, so the committed test would have carried a dangling path. The comment describes the
  mutation instead.

VERDICT: REJECT — final unit S4 dispatched.
