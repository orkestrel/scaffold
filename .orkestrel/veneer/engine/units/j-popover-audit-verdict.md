# J-POPOVER audit — the reconciled verdict (the Orchestrator, 2026-09-24)

Lanes: `analyst` on GPT-6 Astra (objective; thread `01a0d50f-65dc-7b90-8e4c-531bddb8ad37`, `j-popover-audit-objective-verdict.md`), `reviewer` on Opus 5.5 (subjective; `j-popover-audit-subjective-verdict.md`), `checker` on Sonnet (`j-popover-audit-checker-verdict.md`), one claims file `j-popover-audit-claims.md`. Opus wrote the unit; the objective lane ran on Astra. The Orchestrator's gates (`j-popover-gates.log.txt`) read green: typecheck, lint, format, `test:src:browser` 811 of 811, guides 20, policy 109.

| Claim | Objective | Subjective | Checker | Ruling |
|---|---|---|---|---|
| 1 Profile seam | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Registries | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 Popover profile | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 Body slot | FAIL | CONFIRMED | CONFIRMED | CONFIRMED for the unit; the objective lane's finding is dropped on the record (below) |
| 5 Placement door | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED, with the referral F2 |
| 6 Tooltip door | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 Rebuild dispatch | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 B5 and B6 | FAIL | UNRESOLVED | CONFIRMED | FAIL: the Orchestrator's probe found the stop path unpinned (F1) |
| 9 Generic class | CONFIRMED | UNRESOLVED | CONFIRMED | CONFIRMED on the Orchestrator's retained type probe |
| 10 Bound sentence | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 11 TSDoc mirror | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 12 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 13 Instrument | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

## Settled by runs

- **Claim 8** (`j-popover-release-probe-orchestrator.log.txt`, the probe `popover-release-probe.py` retained beside it). Each mutation removes one path of `#build`'s single release site and runs `Tooltip.test.ts` alone. Deleting the release (R1) and skipping it on a throw (R3) each redden "moves nothing before a throwing content function stops the build, and returns the moved elements home before a throwing sanitizer rejects it". Skipping it when a slot write's door fails (R2) holds: 56 of 56 pass. No case pins the stop-path release. The checker's CONFIRMED rested on the writer's words and is superseded by the run.
- **Claim 9** (`j-popover-type-probe/`). `tsc` over `admitted.ts` exits 0 (`new Popover(h, { content, title })`, `new Tooltip(h, { title })`, a `PopoverOptions` variable passed to `Tooltip`). `tsc` over `refused.ts` exits 2 with TS2353 on `content` and TS2561 on a misspelt key. The `prove` MCP server failed to connect this session, so `tsc` ran directly; the first run's exit 0 came from the root `exclude` dropping the probe files, caught by `--listFilesOnly`.

## Dropped on the record

- **The objective lane's claim-4 FAIL** (a throwing enumerable `content` getter on an options object passed to `new Tooltip`). `resolveOptions` in `helpers.ts` copies every enumerable key with `for…in` (around line 248). `helpers.ts` is untouched by the unit, and the base passed the same options object to it, so the read predates the unit and holds for every engine. The claim's clause "reads no `content` option" was the Orchestrator's overstatement: the behaviour the case pins, that a tooltip gives no body slot to a `content` value, holds. The shared helper's enumeration (inherited enumerable keys copied, getters run) is carried to J-GUARDS in `plan.md`.
- **The subjective lane's second referral** (a subclass `extends Tooltip<TooltipOptions & { content: number }>` whose profile names a body slot). `Popover` is the one subclass, and the profile's tables are the published shape. Recorded as a bound, with no change.
- **The `owned` to `hold` rename.** The lane rules it optional; `owned` stays.

## Round 2 (successor brief `j-popover-brief-2.md`)

- **F1 (claim 8).** A case pins the stop-path release: a slot write whose door fails (a reaction that takes the change over while an element moves into the unfinished tip) returns every element it moved home. Also pin the second stop site, the release step's own door. The unit's instrument gains the release rows (R1 to R3 as the probe wrote them, plus the second stop site), each reddening its named case.
- **F2 (the subjective lane's first referral, adopted).** A throwing `owned` restores what the placement wrote before the error propagates, as the `showPopover` refusal path does. A Placement case pins it.
- **F3 (the subjective lane's optional tightening, adopted).** `TooltipProfile.attributes` and `.selectors` carry the optional `content` key in their declared types, and `TooltipProfile.popover` is typed from `PlacementInput['popover']`.

Round 2 adopts the lanes' prescriptions, so it closes on the instrument probe and the Orchestrator's replay (`.claude/rules/quality.md` § Rounds and verdicts); the landing chain follows.

RULING: round 2 on F1, F2, F3; then the landing
