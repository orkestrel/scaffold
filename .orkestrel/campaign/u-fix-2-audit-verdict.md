# Audit verdict — u-fix-2-audit

Subject: `@orkestrel/scaffold@0.0.65` at `9a250bb`, the fix chain `9e21cd7..9a250bb`. Brief:
`u-fix-2-audit-brief.md`. Lanes: `reviewer` on Opus 5 (native, subjective) and `analyst` on GPT-5.6
Sol (`codex exec`, thread `01a09998-4449-7483-b39d-82210d436bf8`, journal
`tmp/codex/u-fix-2-audit.jsonl`, 1848844 bytes, objective). Both opened one identical brief file,
blind, in parallel. Lane reports retained verbatim under `lanes/u-fix-2-audit-subjective-opus.md`
and `lanes/u-fix-2-audit-objective-sol.md`.

Dispatch deviation: the analyst driver backgrounded its exec and returned before the terminal event,
against `.agents/orchestration.md` § Launching ("Never detach one from inside a dispatched agent").
The Orchestrator armed its own waiter on the journal, confirmed the thread id and the byte count,
and took the report from `u-fix-2-audit-last.md`; the driver's later return carried the same
content. The bench ran; the lane counts.

## Reproduced before ruling

| finding | reproduction | result |
| --- | --- | --- |
| Sol claim 2, an npm that ignores the record | `evidence/linux-gate/devengines-floor.sh`: npm `10.5.0`, `10.8.3`, `10.9.0`, `10.9.3` each in its own prefix, against the emitted guard manifest and the plain one, network available | `10.5.0` and `10.8.3` ignore the record and crash at `#loadPeerSet`; `10.9.0` and `10.9.3` refuse with `EBADDEVENGINES` — **confirmed and widened**: Sol's sandbox saw `ENOTCACHED` because it has no network; on the host the ignoring npm meets the crash. `devengines-floor.log.txt` |
| which npm a supported Node bundles | `https://nodejs.org/dist/index.json` | `v22.12.0` → npm `10.9.0`; `v22.18.0` → `10.9.3`; `v22.22.2` → `10.9.7`; `v24.0.0` → `11.3.0`; `v24.4.0` → `11.4.2`; latest v22 `10.9.8`, latest v24 `11.19.0` — every bundled npm on a supported Node reads the record; only a downgraded npm does not |
| reviewer claim 11, `dist/src` across the chain | `evidence/linux-gate/dist-chain-compare.sh 9e21cd7` | `dist/src` differs only by the reworded doc block in `core/index.js`, `index.cjs`, `index.d.ts`, `index.d.cts`; `dist/bin` identical — **settled** |
| Sol claim 3, noun after each token | `README.md:61`, `guides/scaffold.md:1457`, `ROADMAP.md:297,369` | `11.6.0` followed by "in" and "or", `SetupPanel` by "parks", `OllamaProvider.test.ts` by "while" — **confirmed on the letter** |
| reviewer R4-carry, Sol claim 8 | `sed -n 426,430p ROADMAP.md` | the clause names the silent drop, not the `setsid`/`timeout` question — **confirmed** |
| reviewer report-adjacency | `guides/scaffold.md:1403` vs `:1448-1451` | the `package.json` bullet is the list's first, the paragraph follows its last — **confirmed**; the unit report stays as returned and this verdict carries the correction |
| Sol F-1, report after code | `git show --stat 9a250bb 0e02013` | the integration report landed in `0e02013`, after the code in `9a250bb` — **confirmed**: the Stop hook demanded a commit while the chain was still running, so the record was split |

## Reconciled rulings

| claim | subjective | objective | reconciled |
| --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 2 | CONFIRMED, bounded | BROKEN | **BROKEN** — Sol right, and the host reproduction is worse than Sol's reading: an npm older than `10.9.0` ignores the record and crashes. The prose states a universal the readings do not carry. Carrier: U-fix-3 items A and B. |
| 3 | CONFIRMED | BROKEN | **BROKEN** on the letter of `.claude/rules/writing.md` § Code tokens. The reviewer's defense rests on the U-fix-2 brief prescribing those forms, which is a brief defect, not a licence. Resolution: write a version as a prose numeral without backticks, as `README.md:12` already does for Node, and reserve backticks for a declared value (`>=11.6.0`, `error`, `EBADDEVENGINES`); follow `SetupPanel` and `OllamaProvider.test.ts` with their nouns. Carrier: U-fix-3 items A, B, C. |
| 4 | CONFIRMED | BROKEN | **BROKEN** with claim 2. Carrier: item B. |
| 5 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 6 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 7 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 8 | CONFIRMED on the list, R-4 not carried | BROKEN | **BROKEN** on R-4. Carrier: item C. |
| 9 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 10 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 11 | NOT-EVIDENCED on the second conjunct | UNRESOLVED | **CONFIRMED** on the Orchestrator's build comparison. `.agents/orchestration.md` § What a bump obliges defines material content with sourcemaps excluded, so Sol's sourcemap objection is dropped on the record with that citation. The reviewer's bound stands: the comment survives into the emitted JavaScript, not only the declarations, and obliges nothing. |
| 12 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 13 | CONFIRMED | BROKEN | **BROKEN** with claim 2: the documents agree with each other and disagree with what a downgraded npm meets. Carrier: items A and B. |

Findings outside the claims, each with one carrier: reviewer R4-carry → item C (with claim 8);
reviewer README-voice → item B; reviewer report-adjacency → this verdict (the unit report is
immutable; the true rationale is that the section trails its list with elaboration paragraphs);
Sol F-1 → this verdict, and U-fix-3 commits its integration report in the same commit as its code.

## Which engine was right, on what

Sol on the universal, the letter of the token rule, R-4, and the record order — every one a
constraint. The reviewer on the dist bound, the README voice, the case identity re-derived from
the log, and the skip identity re-derived from the gates — the shape and the instruments. Sol's
claim 11 objection was against the contract's own definition and is the one finding dropped.

## Bounds

Not broken: the paragraph's placement; the comment; the ROADMAP counts, citation, and possessives;
the TSDoc summary and parity; `host.json`; the gate run; the provisioning skip; `dist/bin`. The
generated workspace's behaviour is unchanged and correct: every npm a supported Node bundles reads
the record and refuses beneath the floor. What is broken is prose that claims that of every npm.
`README.md` and `guides/scaffold.md` ship, so the upload waits for U-fix-3.

VERDICT: FAIL 2, 3, 4, 8, 13; outside the claims: R4-carry, README-voice, report-adjacency, Sol-F1
