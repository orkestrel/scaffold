# U3-policy audit round 9 — verdict

Round of 2026-09-20 on the round-10 tree (`units/u3-policy-brief-10.md`,
`units/u3-policy-report-10.md`; cumulative diff `units/u3-policy-diff-10.patch.txt`). Claims:
`u3-policy-audit-claims-4.md`. Lanes, on the same claims file, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| subjective | `analyst` | Astra through `codex exec` read-only, thread `01a0becb-882b-73c0-960e-7ce3c5317125` | `units/u3-policy-audit-4-analyst.sh`, `units/u3-policy-audit-4-analyst-report.md` |
| objective | `reviewer` | native Opus 5, workflow `wf_833c4db7-1d3` | `units/u3-policy-audit-4-reviewer-brief.md`, `units/u3-policy-audit-4-reviewer-report.md` |
| gates | `verifier` | native Sonnet, the same workflow | `units/u3-policy-gate-brief.md`, `units/u3-policy-gate-report-3.md` |

The lanes swap the default assignment because native Sonnet wrote the unit and the Orchestrator
shares its engine with the reviewer; the analyst's journal proves the bench was reached. No checker
ran: the round's mechanical criteria (file existence, gate exits) are the verifier's.

## Reconciliation

| Claim | Analyst | Reviewer | Ruling |
| --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | confirmed |
| 2 | REFUTED (`Both name classes`, `both fragment classes` at `tests/setupPolicy.ts:386-388`) | CONFIRMED (each names its members) | the members sit in an earlier sentence, not the tallying one; carried as a ride-along, not forcing |
| 3 | REFUTED | REFUTED in part | refuted: the leading-`/` half of the row-boundary case is shadowed by the directory gate, and the `(?!\/)` and `..` guards have no direct control; the comment claims a discrimination the case lacks |
| 4 | CONFIRMED | CONFIRMED | confirmed |
| 5 | CONFIRMED | CONFIRMED | confirmed |
| 6 | CONFIRMED | CONFIRMED | confirmed |
| 7 | REFUTED | REFUTED in part | refuted: the `@returns` at `tests/setupPolicy.ts:2046-2047` still says "Each row's guide name" |
| 8 | REFUTED | REFUTED in part | refuted: the closed-fence control (`ignores a directory-index row written inside a fence`) creates no `src/styles`, so removing fence blanking leaves it green |
| 9 | REFUTED | REFUTED in part | refuted: the guide's recovery sentence never states the row's conditions, and the remark at `tests/setupPolicy.ts:2028-2031` asserts facts about two named checkouts with `today` in a vendored file |
| 10 | UNDECIDABLE | UNDECIDABLE | confirmed by the Orchestrator from `units/u3-policy-gate-report-3.md`: every step exit 0, `npm test` whole chain green including `test:config`, `host.json` stable across the chain |

Claim 10 was undecidable for both lanes because the claims file named the verifier's report at a
path that did not exist until the verifier returned. That is a dispatch defect of the
Orchestrator's, the same shape round 8 met, and it repeats nothing further: from the next round a
gate claim is ruled by the Orchestrator from the retained report and is not put to the lanes.

## Findings carried

Every finding names its carrier in `units/u3-policy-brief-11.md`.

| Finding | Source | Measured | Carrier |
| --- | --- | --- | --- |
| dead closed-fence control | analyst claim 8, reviewer 11 | fixture at `tests/setupPolicy.ts:3566-3587` has no `directories` | brief 11 item 1 |
| guards without a direct control; comment overclaims | analyst claim 3, reviewer 13 | `tests/policy.test.ts:167-172` asserts one valid row and `'not a row'`; `readPolicyIndex` refuses `/outside` through the resolver either way | brief 11 item 2 |
| `@returns` under-describes | analyst claim 7, reviewer 14 | `tests/setupPolicy.ts:2046-2047` | brief 11 item 3 |
| guide recovery states no condition | analyst claim 9, reviewer 12 | `guides/scaffold.md:1160-1161` | brief 11 item 4 |
| checkout-specific remark with `today` | analyst claim 9, reviewer 16 | `tests/setupPolicy.ts:2028-2031` | brief 11 item 5 |
| directory gate refuses `./src/core`, `src/core/`, `src/./core` | analyst 11 | Orchestrator's probe `units/spelling-probe.mjs`: row admits each, resolver refuses each; `src//core` and `src\core` resolve | brief 11 item 6 |
| `both` tallies the name and fragment classes | analyst claim 2 | `tests/setupPolicy.ts:386-388` | brief 11 item 7 |
| `row.path ?? ''` fails open | reviewer 15 | unreachable; the default direction is wrong | brief 11 item 8 |
| "a directory-index row of the map's directory index" | reviewer referral (b) | `guides/scaffold.md:1152-1153` | brief 11 item 4 |

## Withdrawal

Brief 11 was never written. While this verdict was being drafted the user asked where
`guides/tokens.md` came from and ruled that a package documents itself in one guide,
`guides/<package>.md`, never split into smaller guides. That file came from the Veneer plan's U3
unit, copied from the Elements guide layout; the vendored policy refused it as a stray guide (the
U3 writer's D1), and this unit existed to widen the policy so the file could stand. That inverts
`.claude/rules/documentation.md` ("a parity failure identifies drift; never suppress or weaken the
test"). The unit is withdrawn: `tests/setupPolicy.ts`, `tests/policy.test.ts`, and
`guides/scaffold.md` are restored to HEAD, the cumulative diff is retained as
`units/u3-policy-diff-10.patch`, and `units/u3-policy-withdrawal.md` records the reading. The
reviewer's referral (a) — nine rounds on one seam — was the signal that the seam was the plan,
not the code. U3's successor brief folds the token reference into `guides/veneer.md` and deletes
`guides/tokens.md`; the vendored release carries the styles rule clause alone.

Verdict: fix round on the claims (3, 7, 8, 9) — moot; the unit is withdrawn.
