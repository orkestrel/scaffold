# Audit verdict — D7.n pilot A.3, over A.1 `d7n-abort-prep` and A.2 `d7n-abort-converge`

## Round 1 (2026-09-07, Workflow `wf_17dd5b0f-4b3`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet); the A.4 `verifier` (Sonnet) ran in the same Workflow. Brief: `d7n-abort-audit-brief.md`. Returns: `d7n-abort-audit-subjective.md` (`VERDICT: FAIL 12`), `d7n-abort-audit-objective.md` (`VERDICT: FAIL 12`), `d7n-abort-audit-checker.md` (`VERDICT: FAIL 1, 6, 12`), `d7n-abort-verify-report.md` (`GATES: GREEN` over the whole chain with the head start installed).

### Rulings per claim

- **Claim 1 — PASS on the commit; the retained diff was incomplete.** The checker read `d7n-abort-prep.diff.txt`, captured before the Orchestrator's lockfile-only install, so it carries no `package-lock.json` hunk; the commit `7d8b1dd` carries the root version and the dropped `vite-plugin-dts` subtree (`instruments/d7/a1/lockfile.log.txt`). The objective lane's referral is answered by that log; the diff file is annotated.
- **Claim 6 — PASS on the substance; the claim's wording was loose.** Pairing reads headings, and `### Create and abort` is the one heading of that text; the § Tests prose the unit added mentions the title, which the checker counted. The uniqueness check is heading-scoped from here (`grep -n '^#\+ <title>'`), and the report's check line is annotated.
- **Claims 2 to 5, 7 to 11 — PASS** on every lane that ruled them; the verifier's independent run confirms claim 11's readings.
- **Claim 12 — FAIL, corrected.** Stale citations in the converge report (`:42` for `### Classes` at `:44`, `:85` for the heading at `:87`, `guide.md:24` for the sentence at `:28`) and counts in both reports; the retained reports are annotated.
- **Claim 13 — PASS.** Both lanes read the three brief-fact corrections as real and none as blocking the guide's release: the `--to guide` prediction predated the Types column, the brief's line number named the parent-link block, and the seed compares the pitch outside `findDrift`'s rows by design.

### The pilot's ruling on the guide's release

No reader or seed defect. `@orkestrel/guide@0.0.18` at `c25c689` is ready to release on the owner's go-ahead, with one documentation row added first (G1): the check catalog names the README pitch check with its own identifier, so no consumer reads `findDrift` coverage as covering the pitch (objective E).

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| The opening paragraph restates the tagline's clause | subjective F1 | A.2-fix item 1 |
| The README's opening paragraph restates the tagline's triple | subjective F2 | A.2-fix item 2 |
| `createAbort`, `Abort`, and `AbortInterface` carry one sentence | subjective F3 | A.2-fix item 3 |
| The `Shape` column carries two idioms; the convention unstated | subjective F4 | A.2-fix item 4 |
| The drop-in recomputes the name mapping at three sites | subjective F5 | A.2-fix item 5 |
| `isTitle` renames a primitive | subjective F6 | A.2-fix item 6: scaffold's inline form, no predicate |
| Descriptions restate their own `@remarks` | subjective F7 | A.2-fix item 7 |
| `above` in the Types preamble | objective A; the unit's own finding | A.2-fix item 8 |
| The uniqueness check heading-scoped | objective B | the fleet template |
| The titling step's position unrecorded | objective C | the fleet template: title, then `--to guide`, each with its run |
| The lint control planted without a brief | objective D | the fleet template: the Orchestrator takes the control reading |
| The pitch check has no catalog identifier | objective E | G1 in the guide checkout, before the release |
| The stale mirror cannot explain the gate | subjective F8 | ruling 5's phase-B sequencing: the mirror re-stage precedes the packages that advertise the gate |
| The SQ, MQ, EQ instruction in § Tests | subjective F9 | struck from the fleet template |
| The lockfile hunk and the report counts | checker 1, 12 | annotated |

VERDICT: FAIL 12
