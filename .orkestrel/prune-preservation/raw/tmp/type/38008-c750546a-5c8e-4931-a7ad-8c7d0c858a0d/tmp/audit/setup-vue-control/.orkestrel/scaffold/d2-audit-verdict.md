# Unit D2 — audit verdict

Round two, 2026-09-17. Subject: the whole change against `53d4a58e` — D1's work, D2's corrections,
and the Orchestrator's integration of D2's returned shared-file patch. D2 was written by Opus 5.

**Ruling: REJECT. A second fix round is owed.** Both lanes rejected independently. Neither asked for
the mechanism to change, and both confirmed the split, the skip, the helper seam, and the new
contracts. What blocks acceptance is an error-handling divergence that can take the vendored file
down at module load in a target, a case name that states the opposite of the invariant this campaign
is about, and gate evidence that does not cover the tree as it now stands.

The correction is cheap here and expensive later. `tests/config.test.ts` reaches every target through
`repair`, so each of these is one string or one wrapper now, against a bump, a publish, and a
re-propagation across every target after the release.

## Lanes that ran

| Lane       | Role and engine                                            | Verdict | Report                          |
| ---------- | ---------------------------------------------------------- | ------- | ------------------------------- |
| Subjective | `reviewer` — Opus 5, native subagent, clean context         | REJECT  | `d2-audit-subjective-report.md` |
| Objective  | `analyst` — GPT-5.6 Sol through the Codex bench, read-only  | REJECT  | `d2-audit-objective-report.md`  |

Both lanes read the same numbered claims at `d2-audit-claims.md`, in clean contexts, blind to each
other. Opus 5 wrote the work, so the objective lane went to Sol.

Bench provenance: journal `tmp/codex/d2-analyst.jsonl`, thread id
`01a0afd1-387b-7903-b575-609566c4fbc4`, terminal event `turn.completed`. Recorded here because the
journal is swept with `tmp/`.

No `checker` ran. Both lanes re-derived every number, and Sol computed the digests directly.

## What both lanes settled together

These were the release-blocking questions, and each is closed by two independent readings.

- **The vendored import closure is clean.** The vendored test imports node builtins, `vite`,
  `oxlint/plugins-dev`, `vitest`, the two vendored `configs/` leaves, `./setupPolicy.js`, and the
  target's own generated root configuration and tsconfig. It does not import `./setupServer.js`, so
  D2's helper move landed entirely in the non-vendored `tests/distribution.test.ts`. Direct proof: a
  generated app-only workspace holding only the vendored set ran the config project to exit 0.
- **The re-taken measurement is uncontaminated.** Both lanes walked the ancestor chain to `C:\` and
  found no `node_modules`, and Sol confirmed the workspace holds no extractor and the log body shows
  no extractor execution. `171 passed | 3 skipped (174)` against this checkout's
  `173 passed | 1 skipped (174)`.
- **The case-insensitive decision is right.** The test asks the host the same question
  `targetToEnvironments` asks it, so both answer identically. A case-sensitive and a case-insensitive
  host disagree about the product rather than about the test, which is a property of the settled
  mechanism and not attributable to this unit.
- **The sub-entity earns itself.** `TestGeneratedPin` groups one emitted-to-installed relationship
  each caller compares as a unit, and it disambiguates `version`, which flattened beside `path` and
  `manifest` would read as the workspace's own.
- **The coverage sentence D2 flagged is accurate. Retained.** D2 exceeded its brief to write it and
  said so. The Orchestrator rules it stays: it names what is unproven where the reader meets it, it
  sits in a comment the unit was already rewriting, and both lanes verified it.

## Findings carried to the fix round

| Finding | Lane | Severity | What is wrong |
| ------- | ---- | -------- | ------------- |
| The predicate throws where the mechanism it matches returns false | Objective, claim 1 BROKEN; subjective R-3 and R-1 | HIGH | `lstatSync(path, { throwIfNoEntry: false })` suppresses `ENOENT` alone and rethrows `EACCES` and `EPERM`. `isPhysicalDirectory` at `src/server/helpers.ts:412-414` wraps the same call in `attempt` and returns `false` for every error. The call sits at module scope, so in a target whose recognized entry cannot be inspected the throw is a collection error taking the whole vendored file down rather than failing one case |
| The case name's trailing clause contradicts the case's own invariant | Subjective F-3 | HIGH | `tests/config.test.ts:2178` ends `[inapplicable where the workspace publishes no source from src, which leaves no face project to read]`. That tells a reader a missing face project makes the case inapplicable. The body throws `The workspace declares no face project`, and shape D proves the throw fires. The vendored surface every target receives would state the opposite of the invariant |
| The gate evidence does not cover the final tree | Objective | HIGH | `d2-gates.log.txt` records a status without `tests/setupServer.test.ts`, which the Orchestrator integrated afterward. The recorded `test:setup` result predates the added proof |
| Child-process failures lost decisive diagnostics | Objective | MEDIUM | The throws replacing assertions omit the received `status` and the `spawnSync` error, so a failure can end with empty output and no explanation. The former assertions reported the status including `null` |
| A rewritten sentence is circular and its pronouns collide | Subjective F-1 | — | `tests/distribution.test.ts:437-439`. The first `it` points at the thing being defined, so the definition consumes itself |
| A rewritten clause is ungrammatical | Subjective F-2 | — | `tests/distribution.test.ts:553` reads `moves that set nothing`. The text it replaced was grammatical |
| The returned environment collection is mutable | Objective | LOW | `tests/setupServer.ts:417` exposes `NodeJS.ProcessEnv` rather than a readonly record, against `AGENTS.md`'s readonly-collection law |
| The retained instrument names launch copies | Objective | LOW | `d2-instruments/d2-probe-predicate.sh` copies and invokes `tmp/units/` siblings, so it stops reproducing after the sweep. Orchestrator retention duty rather than a unit's |

## Findings recorded, not carried

- **`manifestPublishes` parses as subject plus verb** (subjective F-4) when the intended reading is
  "publishes, per the manifest", and the module-scope `publishes` stays shadowable inside both cases
  that avoid it. The lane explicitly did not require it: each reading owns the bare word somewhere in
  the source, so the file has no collision-free option, and the module comment names the split
  honestly. Recorded against whoever next owns that file.
- **The compiler-refusal path moved to `configs/tsconfig.absent.json`** (subjective R-2). Whether
  `tsc` refuses it with the same message on both workspace shapes is evidenced for the app-only half
  by the post-fix run and derived for the other.
- **A cross-referencing `above` at `tests/distribution.test.ts:841`** (subjective F-6), on a line this
  diff does not touch.

## Dropped on the record

Each was attacked by a lane and did not survive.

- A missing `setupServer` import in the vendored file. Both lanes read the import block.
- A new module cycle or package edge from the helper move. Every added import is a node builtin.
- An unjustified `pin` sub-entity.
- Fixture-string uses of `here` as a rule violation. Both lanes ruled them data, which
  `.claude/rules/writing.md` § Substitutions exempts.
- A blanket target regression. Bounded to the inspection-error edge, which claim 1 carries.

## Deviations this round

- **The Orchestrator integrated a shared-file patch after the unit's gate chain ran**, then proved
  only `format:check`, `lint:check`, and the `setup` project rather than the full chain. Sol caught
  it. The authoritative run is owed on the final tree, by an independent `verifier`.

VERDICT: REJECT — the mechanism and the contracts stand; unit D3 carries the findings in the
preceding table, and a full gate chain on the final tree is owed before acceptance.
