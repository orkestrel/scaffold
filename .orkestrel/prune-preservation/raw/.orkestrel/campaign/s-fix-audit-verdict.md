# Scaffold fix round S4 and S5 — audit verdict (Orchestrator, 2026-09-17)

Subject tip `24285b95`; claims `s-fix-audit-claims.md`; lane reports `s-fix-audit-objective-report.md`
(`reviewer`, Opus 5, 726 s) and `s-fix-audit-subjective-report.md` (`analyst`, `gpt-6-astra`,
thread `01a0b13f-63e0-75a0-b47c-2a0202c06588`, 680 s). Reproductions under
`s-fix-audit-reproduction/` (`f2-probe.sh`, its outputs) and `s-fix-c7-mutations-summary.txt`.

## Lanes that ran

| Lane       | Role       | Engine        | Swap                                        | Terminal line                                                              |
| ---------- | ---------- | ------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| Objective  | `reviewer` | Opus 5        | Swapped: Sol wrote S4, Opus wrote S5        | `VERDICT: FAIL 2, 3, 7, 14, 15; outside the claims: F-A, F-B, F-C`         |
| Subjective | `analyst`  | `gpt-6-astra` | Swapped, the same reason                    | `VERDICT: FAIL 3, 4, 7, 8, 13, 14, 15, 17; outside the claims: none`       |

No `checker` ran this round; the successor round closes on mutation probes and a `checker`.

## Findings carried

| Finding | Source | Orchestrator reproduction | Carrier |
| ------- | ------ | ------------------------- | ------- |
| The chain arm reads `test`'s direct invocations only, so a chain reaching `test:journey` through an intermediate script draws the false advisory and its remedy runs the axis twice | objective 3(a), subjective 3 (executed reader; CLI vector named), subjective 8 and 17 | `f2-audit-indirect.json`, `f2-audit-grouped.json`: the advisory fires for `test:checks` and for `test:gui` | S4-3 ruling 2 |
| The configuration arm admits every `test:*` script, so a Playwright `--config` draws a "Vitest configuration" advisory | objective 3(b), objective 7 | `f2-audit-e2e.json`: the advisory names `test:e2e --config playwright.config.ts` | S4-3 ruling 3 |
| `scriptToInvocations` does not read Vitest's `-c` shorthand, while the contract says `--config` values are listed | objective 2 | By reading `src/bin/helpers.ts:858`, `:872` and Vitest's `cac` declaration | S4-3 ruling 1 |
| The absent-configuration advisory's remedy ("remove the script that names it") leaves `npm run test:journey` in the chain | subjective 8 | `f2-audit-deleted.json` wording; the chain reading after deletion in `c23-f1-probe.log.txt` | S4-3 ruling 4 |
| The guide's classifier-bound sentence and its chain sentence are false of the landed arms | objective 7, subjective 7 | By reading `guides/scaffold.md:652-654`, `:666-668` against the reproductions | S4-3 ruling 5 |
| `#projectQuestion` reports one fact at a time; with an absent project and an absent configuration the configuration fact waits for a re-run | subjective 4 (BROKEN), objective 4 (named precedence) | `f2-audit-extra.json` (project fact alone), `f2-audit-extra-config.json` (configuration fact when the project token is removed) | S4-3 ruling 5: a documented limit, stated in the guide beside the one-question sentence |
| `import.meta.resolve` is outside the specifier reading and unnamed | objective 6 residual | By reading | S4-3 ruling 6 |
| The skill orders `scaffold repair` before the chain invocation for `setup:browser`; `repair` refuses that state | subjective 13, 17 | `f2-repair-setup.json`: exit 1, "The configs group is blocked because the manifest … does not reach a Vitest project the planned configuration registers: setup:browser. No chain from test invokes it …"; `f2-repair-setup-2.json`: exit 0 after the invocation is added | S5-2 item 1 |
| The cp1252 paragraph opens with an unmeasured universal ("a text-encoding shell write replaces a code point above `0x7F`") that cp1252's own repertoire (U+00D7, U+2014) refutes | objective 14, subjective 14 | `c20-write-paths-summary.txt` measured no text-encoding write; cp1252 carries `0xD7` and `0x97` | S5-2 item 2 |
| Restated laws and explanatory clauses survive: `SKILL.md:312-313`, `:318`; `layer.md:70-71`; `styles.md:111-113`; `captures.md:86-87` | objective 15, subjective 15 | By reading | S5-2 item 3 |
| `layer.md:326` instructs a cleanup route reset the ban at `:276` forbids | objective F-A | By reading | S5-2 item 4 |
| `ROADMAP.md:39` names only the emitted path, which this checkout does not hold | objective F-B | `configs/browsers.ts` absent from the checkout | S5-2 item 5 |
| The setup-module rule has two homes (`SKILL.md:180-190`, `layer.md:66-69`) that already differ | objective F-C | By reading | S5-2 item 6 |

## Confirmed on evidence, no carrier

- Claims 1, 5, 6 (the named forms), 9, 10, 11, 12, 16 held in both lanes with the attacks recorded.
- Claim 13's `ungated` question fires for `setup:browser` (objective, by reading; the reproduction
  shows the blocking form during `repair`), so the skill's sentence about `audit` holds; the order
  is what breaks (carried).
- Claim 17: the first misleading sentence is `SKILL.md:112`, which becomes true when S4-3 closes
  the chain arm; no edit of its own.

## Dropped on the record

None.

## Where the lanes disagreed, and the ruling

- **Claim 4.** The subjective lane broke it on the lost fact; the objective lane confirmed the
  single-question contract the guide states. Ruling: the contract stands (one question per run,
  the earliest fact first), and the guide states that a reader settles it and re-runs. A message
  carrying every fact is a design the question shape does not have; it is recorded for the next
  matrix, not built here.
- **Claim 13.** The objective lane confirmed the skill's sentences by reading `#projectQuestion`;
  the subjective lane broke the order against the guide. The reproduction settles it: `repair`
  refuses the state the skill's order produces. The subjective lane's ruling stands.
- **Claim 14.** Both broke it; the objective lane supplied the counter-input. Ruling: the paragraph
  states the hazard with its bound and no cause.

## Routing of the fix

Two writers, serial. S4-3 (`sol`, `gpt-6-astra`) adopts the objective lane's prescriptions
verbatim for rulings 1–3 and the subjective lane's for ruling 4, and states the documented limit
for ruling 5; S5-2 (`opus`) adopts the prescribed sentences. Each prescription is adopted as
written, so the round closes on the Orchestrator's reproduction (`f2-probe.sh` re-run showing the
false advisories gone and the refusal order taught), the S4-3 controls' red-and-green readings, and
one `checker` over the skill's mechanical criteria, in place of a third adversarial round. This is
the second fix round at these seams; a third opens the seam as a design question under
`.claude/rules/quality.md` § Rounds and verdicts.
