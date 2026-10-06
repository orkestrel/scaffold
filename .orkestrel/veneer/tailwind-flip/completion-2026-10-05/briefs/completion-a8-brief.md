# Unit completion-a8: one falsify round over the token round as landed

Two read-only lanes, dispatched blind to each other on one claims file: `/home/user/veneer/tmp/units/tokens-falsify-claims.md`. Each lane performs the assignment itself and spawns nothing. Lanes edit no source; a lane writes only under `/home/user/veneer/tmp/units/tokens-falsify/<lane>/`. Every Chromium reading a lane needs beyond the evidence handed over is requested in the verdict as `UNRESOLVED` with the exact command, never run by the lane.

## Subject

Veneer `main` at `3f8a870` (checkout `/home/user/veneer`, built `dist/`), the whole chain, not the last commit:

| Round | Commit | What it claimed to close |
| --- | --- | --- |
| T1 (Astra, three runs) | `6874b79` | the `$palette` and `$scale` switches, `swatch` and `measure`, the 571-site edit, the writer and its records (`palette.json`, `tokens.json`) |
| T2 (Astra, one run) | `4333d76` | the map on, the derivation through `substituteTokens`, the relation, infix, RFS cap, and contrast cases |
| T3 (Astra, six passes; one five-lens review, 19 findings, 16 repaired, 3 handed to T4) | `44b3610` | the showcase readings, partition, preservation, and journey cases under the token map |
| T4 (Opus; two review rounds, 15 and 5 findings, all repaired) | `4d21de7` | the guide's § Tokens prose, the consumer-theme and gamut cases, the ROADMAP figures |
| A5 (Astra; one Opus review) | `3f8a870` | the `contrastColor` twin and the palette case's policy computation, ramp's scale controls, the scratch paths, the one-row palette title |

## What the round decides

Whether the token round's audit step closes under the large size gate's one falsify round, so that stage B can open at the user's word; a `BROKEN` claim opens fix unit F first.

## Already established (the Orchestrator verified each item itself; do not re-derive or re-report it)

- The landing gates at `4d21de7` (`tailwind-flip/units/tokens-landing/gates-4d21de7.txt`): format, lint, check, build, setup 156, src:bootstrap 14, src:tailwindcss 10, guides 19, policy 119, conformance 128, app:browser 239, setup:browser 156, integration 58, build:showcase; `src:browser` 781 passed with the six § Host-bound set titles failing; `test:journey` 88 passed, 6 skipped, 2 host-bound titles failing.
- The completion landings since: A3 `6e37c79`, A4 `19d1027`, A6 `b2fb4ce`, A2 `2f2eea1`, the roadmap `19fdc5b`, A5 `3f8a870`, each with its gates green (`lanes.md` § Log, 2026-10-05).
- `./bootstrap` byte-identical at SHA-256 `7932f7a5…`, the tuned sheet `9a20b966…`, the showcase `1fc7b60e…` (the token landing entry).

## Review evidence

The tree at the subject commit is the evidence; `git -C /home/user/veneer status --porcelain` is empty at dispatch (the Orchestrator states it in each lane's dispatch message). The records: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/` (the verdict, `design/`, `rulings.md`) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/tokens-t1/`, `tokens-t2/`, `tokens-t3/`, `tokens-t4/` (reports and review files). The evidence the Orchestrator ran ahead is in the claims file § Evidence the Orchestrator ran ahead, with run folders under `/home/user/veneer/tmp/units/journey-cost/runs/a8-*/`.

## Numbered falsifiable claims

`/home/user/veneer/tmp/units/tokens-falsify-claims.md`, 47 claims in five groups, with the lane assignment and the record contradictions found while drafting them.

## Unknowns

- Whether Chromium's paint of a clipped hue equals the writer's sRGB clip (claim 21) rests on a probe outside the repository; the Orchestrator's ahead-run pixel reading is the only in-round evidence. Report whether it settles the claim.
- Whether the T3 and T4 repairs hold under mutation: the T3 mutation set ran only in T3's scratch, and T4's second round left no mutation record. The ahead-run mutation table in the claims file is the evidence; name any repair the table does not reach.
- The writer's determinism (T1) cannot be shown from the repository alone; rule it `UNRESOLVED` with what would settle it unless the records give you more.

## The threshold

A finding is worth more than a clean pass. Never manufacture one: a false finding costs a fix unit and the credibility of the true findings beside it.

## Role and lane

- Lane A: role `reviewer`, engine Opus, objective lane; primary on claims 1 to 34; secondary on 35 to 47. Its own engine wrote T4 (the half it audits as secondary).
- Lane B: role `analyst`, engine GPT-6 Astra (read-only `codex exec`), objective lane; primary on claims 35 to 47; secondary on 1 to 34. Its own engine wrote T1 to T3 (the half it audits as secondary).

## Output

Each lane writes `/home/user/veneer/tmp/units/tokens-falsify/<lane>/verdict.md` in exactly the shape of `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape: numbered verdicts in claim order, one value each (`CONFIRMED` with the attack, `BROKEN` with the failing input and the smallest correct fix, `UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the missing capture); findings outside the claims to the `BROKEN` standard, then `ADVISORY` cost findings; attacked and held; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. File:line for every claim. No process diary.
