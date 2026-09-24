# J-TOOLTIP audit round 3 — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the round-3 fix over `unit/tooltip` in `tmp/worktrees/tooltip` (base `e8251cf`), per `j-tooltip-brief-3.md`, `j-tooltip-report-3.md`, and the claims in `j-tooltip-audit-claims-3.md`.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec`, read-only; thread `01a0d3b5-7b0b-7d00-88e7-8ea9cb4d5ed3`, 61 commands, 554 s) | `j-tooltip-audit-3-objective-verdict.md` | `VERDICT: FAIL 1, 6, 7, 8; outside the claims: O1` |
| Checker | `checker`, Sonnet (native, read-only) | `j-tooltip-audit-3-checker-verdict.md` | no failed claims; the Orchestrator replay clause UNRESOLVED |
| Subjective | `reviewer` | not run | The round-3 brief named the analyst and the checker and no subjective lane: round 3 changed no API shape and no guide voice beyond the sentences the round-2 subjective verdict specified (F1, F3, F4, F5), and the checker held their letter. The landing round's reviewer reads the tooltip's shape whole. |

Every citation the objective lane placed in `Tooltip.ts`, `Placement.ts`, `Tooltip.test.ts`, `NativeSanitizer.test.ts`, `j-tooltip-mutations-3.py`, and `j-tooltip-mutations-3.log.txt` was spot-checked by line and resolves. The lane executed nothing and says so; its findings are source derivations, so each behavioural one is carried as a claim round 4 proves red-first rather than as a settled fact.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 The build's doors and the hide's container read | **FAIL.** The build's final `#release` runs a returned element's connection reaction before `#build` returns, and `show` publishes and links the new tip before reading the lifetime again; `#discard` runs `Placement.destroy()` whose `hidePopover()` dispatches a closing `beforetoggle` that can relocate the tip, and the removal that follows reads no container; the promotion adds `shown` before the container mismatch an opening `beforetoggle` relocation causes is read. Three rounds have now found this class through a new door each, so the door seam has consumed its budget (`.claude/rules/quality.md` § Rounds and verdicts). | J-TOOLTIP-DOORS, the design ruling (`j-tooltip-doors-brief.md`), then round 4 |
| 2 The origin record before the move and slot occupancy | CONFIRMED. Bound: the `JOINED` recording row binds record omission, not publication timing. | Round 4 adds the timing control the lane describes (capture the origin before the move, publish after, assert restoration after the nested `destroy()` returns) as an instrument row. |
| 3 `fill` after destruction and the re-promotion bound | CONFIRMED. | — |
| 4 The descendants | CONFIRMED. Bound: the repeated-invalid-input case does not prove memoization (`#failed.add`). | Round 4 adds the row deleting `#failed.add` and the assertion it reddens. |
| 5 The arrow's reference point | CONFIRMED. | — |
| 6 The sanitizer proofs and the parser | **FAIL** on the instrument, not the sanitizer: the "the allowlist admits a global href" row keeps `href` in the `a` element's local list while adding it globally, so the platform refuses the configuration (`TypeError: Invalid Sanitizer configuration.`) before the per-element assertion runs; the row measures configuration rejection. The parser repairs hold. | Round 4: move `href` from the local allowance to the global allowance in that row and record the failure at the output assertion. |
| 7 The vocabulary case, the shape, and the wording | **FAIL.** The vocabulary case's modal ancestor carries `x-modal` and `modal`, so replacing `this.#classes.modal` with `TOOLTIP_CLASSES.modal` selects the same ancestor and the case passes; the claim's "an invalid value under every default attribute name" is contradicted by the fixture's valid strings (`data-bs-title="Wrong"`, the alternate template, `data-bs-custom-class="wrong"`, the `.tip` selector). The renames, the boolean, the readonly origin fields, and the wording hold. | Round 4: give the effective modal ancestor `x-modal` only, add a default-`modal` decoy whose hide event the case distinguishes, and describe the string values as conflicting values. |
| 8 The guide's doors and E13 bound, the instrument's binding, gates, and scope | **FAIL** on the guide's door promise: "after each" and "from the insertion on" are false at the intervals claim 1 names; the E13 bound is stated correctly; the instrument's rows bind the assertions the lane identifies; the gates read green; the scope holds. The Orchestrator replay clause is unresolved for round 3 and is settled at round 4 (see Deviations). | J-TOOLTIP-DOORS for what the guide must say; round 4 writes it. |

## Outside the claims

- **O1 (carried).** `TooltipEventMap.hide`'s TSDoc and the guide's event table promise that preventing `hide` refuses the hide; the E17 re-promotion bound makes the same tip's second platform close conceal despite prevention. Round 4 amends the declaration and the table with the same-tip re-promotion exception and keeps the public `hide()` veto.

## Deviations

- The Orchestrator's round-3 mutation replay (`replay-tooltip-3a.sh` to `-3d.sh`) did not run: the round fails and round 4 changes the instrument, so the replay runs once over round 4's instrument, covering the rows carried unchanged. The checker's UNRESOLVED clause on that replay is therefore carried, not closed.
- No subjective lane in round 3, with the reason in the Lanes table.

## Strategy switch

The door class has recurred in rounds 1, 2, and 3, each fix closing the door the previous lane named and the next lane finding a further one (callbacks, then slot moves and the hide wait, then the final release, the placement teardown, and the promotion). Under `.claude/rules/quality.md` § Rounds and verdicts a fourth local repair is refused. The next unit is a ruling on the mechanism, taken with a design round's adversarial pass: `j-tooltip-doors-brief.md`, `planner` on the subjective lane and `analyst` on the objective lane, blind and in parallel, returning the invariant the code will obey, the constraint bounding it against over-correction, and the interface where a consumer meets the obligation. Round 4 implements the reconciled ruling together with the instrument and fixture repairs above and O1.

VERDICT: FAIL 1, 6, 7, 8; outside the claims: O1; round 4 follows the J-TOOLTIP-DOORS ruling
