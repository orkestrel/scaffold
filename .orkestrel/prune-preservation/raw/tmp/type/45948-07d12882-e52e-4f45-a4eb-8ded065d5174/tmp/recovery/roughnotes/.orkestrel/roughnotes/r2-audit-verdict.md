# Unit R2 — audit verdict

Round two of the hardened-merge port, 2026-09-16. Subject: unit R2, which closed the defects round
one returned against the prose and instruments unit R1 wrote around the ported merge.

**Ruling: REJECT, with fix round R3 dispatched.** The objective lane rejected; the subjective lane
accepted. They converge on the same two defects, and the objective lane settled the first by
construction.

Retained late, with `r1-audit-verdict.md`. Recorded as the debrief's O1.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `analyst` — GPT-5.6 Sol, Codex bench, `gpt-6-astra`, read-only | REJECT | `r2-audit-objective-report.md` |
| Subjective | `reviewer` — Opus 5, native subagent, clean context | ACCEPT | `r2-audit-subjective-report.md` |
| Gates | `verifier` — Sonnet | GREEN | `r2-verify-report.md` |

## Where the lanes disagreed, and the ruling

**Claim 1 — whether the `@returns` line determines the result.** The subjective lane confirmed it
and recorded one bit as implicit: neither `@returns` nor `@remarks` says which matching base
position takes the override entry, so the prediction relies on the reader allocating in reading
order. The objective lane refuted it, and did so by construction: it built a reverse-traversal
allocator that satisfies every clause of the sentence and returns `[original, replacement]` rather
than `[replacement, repeated]`.

**Ruling: the objective lane wins.** A sentence a reader must guess an allocation order to apply
does not determine the result, which is the criterion the line was written for. Carried as R3 item 1,
with the acceptance criterion restated adversarially: name an implementation that satisfies every
clause and returns something else. Unit R3 closed it and retained the enumeration that proves the
delivered sentence admits one result where its predecessor admitted three.

## Findings carried to R3

| Finding | Source | Carrier |
| ------- | ------ | ------- |
| The `@returns` line does not determine the result | objective claim 1, refuted by construction; subjective recorded the same gap as implicit | R3 item 1 |
| The three setup exports have no proof of their own | objective, with two surviving mutations demonstrated; subjective referrals | R3 item 2 |
| A legitimate override carrying `mode` without `command` is unproven | subjective referral | R3 item 3 |
| The exported helpers lack complete documentation | objective P3 | R3 item 4 |
| Four prose sites violate the writing rules | subjective F1, F3, F5, F6 | R3 item 5 |
| The comparison instrument's control uses the wrong operands | subjective F4 | R3 item 6 |

## Recorded, not carried

- **`@returns` and `@remarks` carry one event in two vocabularies.** The subjective lane priced a
  fourth full rewrite of that line as the wrong move and proposed the reconciliation ride upstream.
- **The pre-existing local helpers.** `readField`, `readPluginNames`, `countPlugin`, and
  `readOutputDirectory` stay local. `createPluginOverride` can never move, because it calls `vue()`
  and the setup module is host-independent, so the file keeps module-scope helpers whatever else
  migrates. The end state is named in that helper's own `@remarks`.

## The scope conflict this round exposed

The previous brief placed `vite.config.ts`'s factory list off limits, and the setup exports cannot
carry a dedicated proof without registering a `setup` project there. The subjective lane named the
structure; the objective lane named it a scope conflict to resolve rather than evidence the work was
complete. **The restriction was lifted for R3**, which registered the project and landed the proofs.

## Deviations this round

- **The brief named two `above` sites; the file carried five.** Unit R3 replaced the two whose
  wording the brief supplied and reported the rest rather than editing confirmed text without
  instruction. The Orchestrator closed the remainder directly. Orchestrator enumeration error.

VERDICT: REJECT — fix round R3 dispatched.
