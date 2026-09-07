# Audit verdict — slice 1 (codec, msg, sse), over each package's P.1 and P.2

## Round 1 (2026-09-07, Workflow `wf_c29e42d1-47f`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` ×3 (Sonnet, one per package). Brief: `d7n-slice1-audit-brief.md`. Returns: `d7n-slice1-audit-{subjective,objective,checker-codec,checker-msg,checker-sse}.md`. Every lane returned a verdict; no lane is recorded not run.

### Rulings per claim

- **Claims 12, 25, 38 — FAIL, annotated.** Counts in prose in every converge report and in codec's prep report; two stale citations (msg `357:` for `guides/msg.md:358`; sse `88:` for `guides/sse.md:86`). The retained reports carry the Orchestrator's annotation; the tree is authoritative.
- **Claim 22 (msg) — FAIL on the letter, accepted on Ruling 11.** The `@throws` clause added to `MSGInterface.burn` is true and sits inside the doc block; the scope sentence was narrower than the work class, and the template now owns the doc block whole.
- **Claim 35 (sse) — FAIL.** `guides/sse.md` carries no `## Tests` section. Carried to sse's fix round; the template requires the section.
- **Claims 11, 24, 37 — CANNOT RULE by the objective lane**, referred to the per-package `verifier` (P.4), which runs after each fix round.
- **Every other claim — PASS** on every lane that ruled it.

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| `@example Factories` reads as a section label | subjective F1 | Ruling 9; msg and sse fix rounds add the descriptive heading over the demonstrating fence and retitle |
| `guides/sse.md` has no `## Tests` | subjective F2, objective claim 35 | sse fix round |
| A cross-file `{@link import('./errors.js').SSEError}` compares as its whole target, so the description lost its link | subjective F3 | guide unit U4 `d7-guide-links` (the compared form drops the module prefix), then sse's fix round restores the links |
| sse's `chunkings` rewrite borrowed `partition`'s noun | subjective F4, objective F3 | sse fix round; the template bars borrowing a sibling's name |
| sse binds `examples` inside the `it`; the drop-in forked | subjective F5, objective F1 | sse fix round hoists it to the pilot's shape; the P.1 template and the checker claim read the shared drop-in byte for byte |
| msg's class method blocks say less than the interface's | subjective F6 | for the owner (the implementing-class blocks question already raised) |
| codec's guide keeps `two laws` counts | subjective F7 | codec fix round |
| Three key-column header conventions | subjective F8 | Ruling 10: deliberately free |
| codec's README lacks the pilot's skeleton (`# @orkestrel/codec`, Install, Requirements) | subjective F9 | codec fix round |
| The pin's canon (pilot's form against "scaffold's inline form") | objective F2 | Ruling 11; template and audit wording corrected; no package changes |
| msg `MSGSourceInterface` `Shape` row written with call signatures | objective F4 | msg fix round: bare members, as sse's `SSEParserInterface` |
| sse `does NOT clear` all caps | objective F5 | sse fix round |

Round 1 closes as `VERDICT: FAIL 12 22 25 35 38` reconciled: the report faults are annotated, claim 22 is ruled in scope, claim 35 and the findings carry into the fix rounds `d7n-codec-converge-fix`, `d7n-msg-converge-fix`, and `d7n-sse-converge-fix` (after U4), each closed by `checker` and the package's `verifier`.
