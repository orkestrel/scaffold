# Unit S2 — audit verdict (round 1)

Subject: unit S2 rounds 2 and 3 (the skill API-existence sweep and the ROADMAP 30 deletion), tree
checkpointed at `beb88af9`, claims in `s2-audit-claims.md`. Ruled 2026-09-17.

**Ruling: FAIL — fix round S2-4 dispatched.** Both lanes rejected; every finding below is
substantiated, and the Orchestrator reproduced each sharp one before ruling.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `reviewer` — Opus 5, native, clean context | FAIL 4, 5, 10; outside: F1 | `s2-audit-objective-report.md` |
| Subjective | `analyst` — `gpt-6-astra` on the Codex bench, read-only, clean context | FAIL 1, 2, 4, 6, 9; outside: F1 | `s2-audit-subjective-report.md` |

**Lane swap, recorded.** The bench engine wrote S2, so the objective lane ran on Opus 5 and the
subjective lane on the bench, per `.agents/orchestration.md` § Engine assignment. No checker ran:
the acceptance criteria were behavioural, and both lanes read the diff and the installed
declarations directly. Neither lane holds a write tool, so each executed vector it named was run
by the Orchestrator: `s2-audit-vectors.test.ts.txt` (the probe, deleted from `tmp/probe/` before
the fix dispatch) and `s2-audit-reproduction.log.txt` (its output).

## Findings carried to S2-4

| Finding | Source | Reproduction | Carrier |
| ------- | ------ | ------------ | ------- |
| A fence carrying a valid `@orkestrel/*` import beside a parse error is silently accepted: Oxc reports the error and an empty body, and `inspectSkillImports` returns `[]` | subjective claim 1 (BROKEN); objective "attacked and held", named as unsettled | Reproduced: `oxc errors: 1 body statements: 0`, `claim 1 violations: []` | S2-4 item 1 |
| The workspace's own package resolves through `node_modules` alone, so a fence importing `@orkestrel/scaffold` in the scaffold checkout reports `has no installed declaration entry` | objective claim 4 (BROKEN); subjective F1 | Reproduced: `F1 names: undefined`, the violation text as quoted | S2-4 item 2 |
| A named re-export through a cycle reads as no inventory | subjective claim 2 (UNRESOLVED, vector supplied) | Reproduced: `claim 2 names: undefined` where `['ALIAS', 'VALUE']` is right | S2-4 item 3 |
| One violation message covers every `undefined` cause — absent package, unsupported exports key, refused form, parse error — and the guide's refusal list omits the unresolvable relative target, the re-exported name the target lacks, and the syntax error | objective claim 4 (second defect); subjective claim 6 | By reading `tests/setupPolicy.ts:1160-1168` and `guides/scaffold.md:1093-1103` | S2-4 item 4 |
| The acceptance control (`violations: []`) passes when the sweep does not run; its recorded red rests on the writer's own mutation | objective claim 5 (BROKEN) | By reading `tests/policy.test.ts:527-533` | S2-4 item 5 |
| `SKILL_DECLARATION_REFUSALS` omits `export { X as default }` and `export declare namespace`, whose branches no fixture reaches; `FunctionDeclaration` sits in the read union with no fixture; the constant's TSDoc claims completeness | objective claim 10 (BROKEN) | By reading `tests/setupPolicy.ts:1010-1092` | S2-4 item 6 |
| `tests/setupPolicy.test.ts:615-616`: U+96EA (`雪`) replaced by `?` in a vendored fixture whose subject is the code point — a cp1252 round-trip on the Windows bench, outside the unit's scope and unreported | objective F1 | Reproduced by code-point dump; the only non-ASCII line the diff removed, so the damage is bounded to that pair | S2-4 item 7; the process rule lands in `.agents/transports/codex.md` through unit S3 |
| The obligation "put every taught symbol in an import fence" is stated in the rule file, the guide passage, and the reader's TSDoc | subjective claim 9 (BROKEN); objective claim 9 CONFIRMED with the same drift risk recorded | By reading the three sites | S2-4 item 8: the rule file owns the obligation; the guide and TSDoc describe the mechanism's coverage only |

## Confirmed on evidence, no carrier

- Wildcard exports-map keys are refused rather than guessed (subjective claim 4, reproduced:
  `claim 4 names: undefined`); no base-set package declares one. Item 4's distinct messages name
  the refusal.
- The local fence-import reader is not a superfluous wrapper over the guide package's
  `extractFenceImports`: the Orchestrator's probe (`probe-fence-imports.mjs`, output in this file's
  commit message) shows the installed helper drops `waitForCondition` when a comment precedes it
  inside the braces and keeps `WaitOptions`. The local Oxc reading stands. The defect in
  `@orkestrel/guide` is forward work for that package; unit S3 records it in `ROADMAP.md`.
- Claims 1 (population), 2 (declaration forms present in the installed entries), 3 (no runtime
  import), 7 (vendored import law), 8 (ROADMAP 30 loses nothing), 11 (structural coherence) held
  in the objective lane with the attacks recorded there.

## Dropped on the record

None. Every finding either lane returned is carried or confirmed above.

## Where the lanes disagreed, and the ruling

- **Claim 9.** The objective lane confirmed the prose as a directive and recorded the triple
  statement as a drift risk; the subjective lane broke the claim on the one-home law. Both are
  right about different objects: the sentence is a directive, and it has three homes. The ruling
  takes the subjective lane's remedy because the one-home law is what stops the copies drifting.
- **Claim 4.** The subjective lane left the wildcard vector unresolved; the objective lane ruled
  it a documented limit. Reproduction settled it as a limit that refuses rather than passes.

## Routing of the fix

The fix goes to `opus` (Opus 5, native) rather than back to the bench: item 7's damage was done
by the bench's own file round-trip, and the fix touches that line. The fix adopts each lane's
prescription verbatim, so it closes with a mutation probe per prescription and the Orchestrator's
reproduction probe turning green (`.claude/rules/quality.md` § Rounds and verdicts); a departure
from a prescription gets a cross-engine round on `gpt-6-astra`.

VERDICT: FAIL 1, 2, 4, 5, 6, 9, 10 (union of the lanes); outside the claims: F1 (both lanes, two findings)
