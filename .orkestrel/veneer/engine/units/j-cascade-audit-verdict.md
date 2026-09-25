# J-CASCADE round 1 — reconciled verdict (2026-09-25)

**Subject.** Veneer `4765f6f` and `a963585` on `unit/cascade`, over `6dd5034`. The claims are in `units/j-cascade-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, which ran (thread `01a0d638-c72d-7610-8c17-c23a04951f26`, `units/j-cascade-audit-objective-verdict.md`).
- **Checker:** `checker` on Sonnet, which ran (`units/j-cascade-audit-checker-verdict.md`) and passed claims 1 and 8.
- **Subjective (not run):** the unit changes test files and three guide sentences, and no source, name, or shape. The checker matched the case titles and the objective lane ruled on the sentences' truth.

**The Orchestrator's readings.**
- The scoped gates at `a963585`: `tools/w2-gates-scoped-cascade-1.log`, with `test:src:browser` 935 passed.
- The mutation replay: `units/j-cascade-mutations-orchestrator.log.txt`. There are 19 rows, all 17 kills fail through an assertion, the refusal row is refused, and the control holds.
- The Chromium 153 probe of where the factor lives, in the writer's report.

## Per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1. The stand-ins are gone | Dropped, a wording error | The objective lane's exception is `Alert.test.ts`'s custom-vocabulary case, which renames the fade token to `is-fading` and must load its own rule, because the shipped sheet keys on `.fade`. The claim's "every case" was the Orchestrator's overreach. The checker found no stand-in or false comment |
| 2. The Toast reworks keep what each case proved | CONFIRMED | Objective lane, per case, before and after |
| 3. The completed events follow the motion factor | FAIL | No case bounds the arrival, so a fixed 1000ms wait passes all five. Carried to round 2, R1 |
| 4. Popover's default animated path holds | CONFIRMED | Objective lane |
| 5. A trusted touch drag swipes the carousel | CONFIRMED | Objective lane |
| 6. The proofs bind | CONFIRMED on the recorded rows | The lane found the instrument's classification is a denylist. Carried to round 2, R2, and made the standing rule in `plan.md` § Landing procedure |
| 7. The guide sentences are true | CONFIRMED | Objective lane, traced through `_toast.scss` and the Toast show path |
| 8. Scope and greenfield | CONFIRMED | Objective lane and checker |

## Ruling

Round 2 (`units/j-cascade-brief-2.md`) bounds each motion-factor case's arrival and counts a kill only on an assertion.

VERDICT: FAIL 3 (claim 1 dropped as the Orchestrator's wording error)
