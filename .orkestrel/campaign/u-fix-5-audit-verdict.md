# Audit verdict — u-fix-5-audit

Subject: `@orkestrel/scaffold@0.0.65` at `e158702`, the fix chain `0834f2a..e158702`. Brief:
`u-fix-5-audit-brief.md`. Lanes: `reviewer` on Opus 5 (native, subjective), `analyst` on GPT-5.6
Sol (`codex exec`, thread `01a09a02-a053-7200-a3c8-958d0c0aa95c`; the first exec was cap-killed
at 1500 s with the engine live and 747748 journal bytes and no report, and the Orchestrator
resumed the thread as its own tracked command, `tmp/codex/u-fix-5-audit-resume.jsonl`, which
delivered the report), and the mechanical checker on Cursor Grok 4.6 (session
`ed56113d-4f57-4f10-8259-da1555e083bf`, journal `tmp/cursor/u-fix-5-check.jsonl`, 510937 bytes).
All three opened their briefs blind. Reports retained verbatim under
`lanes/u-fix-5-audit-subjective-opus.md`, `lanes/u-fix-5-audit-objective-sol.md`, and
`lanes/u-fix-5-check-grok.md`. Bench liveness at dispatch: Codex `LIVE` on thread
`01a09a00-5890-7df1-a601-880ffe00a551`.

Dispatch deviation, third time: the analyst driver backgrounded its exec against the brief and the
contract; the Orchestrator's own waiter caught the cap kill, and the resume is the recovery the
transport contract names for an interrupted exec. The driver role file carries the correction as a
successor item.

## Reproduced before ruling

| finding | reproduction | result |
| --- | --- | --- |
| Sol S5, S10 and reviewer R-1, the interval population is a literal list | `npm view 'npm@>=10.9.0 <11.6.0' version` against every guard row in the three logs, parsed | the registry serves 10.9.0 through 10.9.9, 11.0.0, 11.1.0, 11.2.0, 11.3.0, 11.4.0, 11.4.1, 11.4.2, 11.5.0, 11.5.1, 11.5.2; every one is measured refusing (10.9.7 as the ambient row); none unmeasured — **settled**, `npm-registry-interval.log.txt` |
| reviewer F-3 and Grok, "Linux host" has no reading | `uname -srm`, `node --version`, `npm --version`, `/etc/os-release` | `Linux 6.18.44-fc-v24 x86_64`, Node 22.22.2, npm 10.9.7, Ubuntu 24.04.4 — **settled**, `host-platform.log.txt` |
| reviewer claim 6, one commit | `git show --name-only e158702` (Grok and Sol both read it) | code, `host.json`, unit report with its successor return, both briefs, integration report, gate evidence — **CONFIRMED** |
| reviewer and Sol claim 5, ROADMAP tokens | Grok § (4) over every scaffold row, plus `ROADMAP.md:431,457,458` | `guides/scaffold.md` reads, `package.json` to, `src/core/constants.ts.`, and the tokens Grok marks NO in rows the campaign wrote — **confirmed**; unpublished |
| Sol S4 and S9, "10.9.0 or later reads that record" is an unbounded universal | the readings cover every served release from 10.9.0 through 11.5.2, plus 11.6.0, 11.6.2, and 12.0.2 refusing under a control record (`npm-boundary-readings.log.txt`) | the sentence states npm's documented `devEngines` behaviour from its 10.9.0 release, which a reader checks against npm's release notes, and it is corroborated at every release measured; the reviewer and Grok carried it on that ground — **ruled carried**, with the bound recorded in the ROADMAP proof row by U-fix-6 |
| reviewer F-1, guide direction words beyond the deferred cell | `guides/scaffold.md:1166,1200,1234,1235` | "older release", "newer major", "below the newest release", "newer major" — **confirmed**, pre-existing shipped prose outside every campaign edit; carried as the widened deferral row |

## Reconciled rulings

| claim | subjective | objective | checker | reconciled |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | every replacement EXACT | **CONFIRMED** |
| 2 | CONFIRMED, R-1 referred | BROKEN (S4, S5, S9, S10) | CARRIED except "Linux" | **CONFIRMED**: S5 and S10 on the retained registry enumeration; S4 and S9 as npm's documented behaviour corroborated at every measured release; "Linux" on the host reading. Sol's population objection was right and is closed by measurement; its unbounded-universal objection reads a floor statement as a measurement and is dropped on the record. |
| 3 | CONFIRMED | CONFIRMED | EXACT | **CONFIRMED** |
| 4 | CONFIRMED | CONFIRMED | ABSENT as intended | **CONFIRMED** |
| 5 | BROKEN (`:458`, `:431`) | BROKEN (`:431`, `:457`, `:458`) | NO marks across the scaffold rows | **BROKEN**; unpublished. Carrier: U-fix-6, every NO in Grok's table plus the three lines both lanes named. The quoted cell text "at or above" is data and exempt. |
| 6 | NOT-EVIDENCED on the commit | CONFIRMED | `git show` read | **CONFIRMED** |
| 7 | CONFIRMED | CONFIRMED | diffstat read | **CONFIRMED** |
| 8 | CONFIRMED | CONFIRMED | — | **CONFIRMED** |
| 9 | CONFIRMED | BROKEN (with 2) | — | **CONFIRMED** with claim 2. |

Findings outside the claims: reviewer F-1 → U-fix-6, the widened deferral row; F-2 (the interval stated twice) → observation, no change: the wording is the previous round's prescription and the round's bound is exactness; F-3 → closed by `host-platform.log.txt`, and the U-fix-6 landing commit carries the host reading in its message so it survives the prune; F-4 (brief defects: the `Node <version> or later` criterion pair, the added row's own token, the missing `u-fix-5b-brief.md` in the evidence list) → recorded here. Sol and Grok reported none.

## Ruling on the shipped surface

Every shipped byte — `README.md`, `guides/scaffold.md`, `dist/src`, `dist/host` — is confirmed by
every lane that read it. What remains broken is in `ROADMAP.md`, which ships nowhere, and U-fix-6
carries it as a builder unit whose every replacement is prescribed. The upload proceeds from the
tip that lands U-fix-6, after the chain and a mechanical check over the rows, with no further
judgment round: the shipped surface is unchanged by that unit.

## Which engine was right, on what

Sol on the population proof, which measurement closed. The reviewer on the ROADMAP miss at `:458`
and the wider guide deferral. Grok on the token table and the host reading. Sol's S4 objection
was the one finding dropped, on the record.

VERDICT: FAIL 5; outside the claims: F-1, F-2, F-3, F-4
