# Audit verdict — u-fix-4-audit

Subject: `@orkestrel/scaffold@0.0.65` at `5e72554`, the fix chain `8de1c3a..5e72554`. Brief:
`u-fix-4-audit-brief.md`. Lanes: `reviewer` on Opus 5 (native, subjective), `analyst` on GPT-5.6
Sol (`codex exec`, thread `01a099e5-05b2-7823-aeab-45ef4b47ce93`, journal
`tmp/codex/u-fix-4-audit.jsonl`, 823274 bytes, objective), and the mechanical checker job on
Cursor Grok 4.6 (`agent`, session `5a9f7cfb-9cf7-4a8b-82a3-839864ace7e7`, journal
`tmp/cursor/u-fix-4-check.jsonl`, 592923 bytes; first step of the ladder, Grok live). All three
opened their briefs blind, in parallel. Reports retained verbatim under
`lanes/u-fix-4-audit-subjective-opus.md`, `lanes/u-fix-4-audit-objective-sol.md`, and
`lanes/u-fix-4-check-grok.md`. Bench liveness at dispatch: Codex `LIVE` on thread
`01a099e4-49db-7990-8d07-0fd216872459`.

Dispatch deviation, repeated: the analyst driver backgrounded its exec and returned before the
terminal event, against `.agents/orchestration.md` § Launching, for the second time this campaign
despite the brief forbidding it; the Orchestrator armed its own waiter on the journal and took the
report from the last-message file. The driver role file carries the correction as a successor
item: it is a process defect in the bridge, not in the lane, and the lane counts.

## Reproduced before ruling

| finding | reproduction | result |
| --- | --- | --- |
| reviewer claim 1 (8b) and Sol claim 1 (8b), the "only where a developer installed" clause | read `guides/scaffold.md:1460-1461` against `node-index-floor.log.txt` | the source's population is releases at or after 22.18.0; the sentence quantifies over every generated workspace and names an actor the index does not — **confirmed BROKEN**. Carrier: U-fix-5 item A.1, bounded to Node 22.18.0 or later and with no actor. |
| Sol claim 1 (4, 5), the refusal interval rests on its ends | `evidence/linux-gate/devengines-interval.sh`: every release the registry serves from 10.9.1 through 11.5.2 against the emitted record | every one `refused=yes crash=no` — **evaporates as a text finding**: sentences 4 and 5 are now carried at every release; the source set is amended, `devengines-interval.log.txt` |
| Sol and reviewer claim 1 (9), "the first release that installs" | registry read: 11.5.1 and 11.5.2 exist and were unmeasured; `devengines-interval.sh` runs them on the plain manifest | both crash — every release from 10.9.0 up to 11.6.0 is measured to refuse or crash, so the boundary is carried, and the sentence is rewritten to state exactly that reading. Carrier: item A.2. |
| Sol claim 1 (10), "or a later release" | `remedy-control.log.txt` | the exact command was run; the alternative was not — **confirmed**; the clause is dropped. Carrier: items A.3 and B. |
| Grok (3), the doc block's "An npm that does not read the record fails inside dependency resolution" | `devengines-floor.log.txt` | measured of 10.5.0 and 10.8.3 only; the sentence is release-free and so universal — **confirmed** on the letter, though both lanes passed it. Carrier: item D, the sentence is dropped from the doc block. |
| Sol claim 5, ROADMAP tokens | `sed -n 372,390p;440,452p ROADMAP.md` | `vitest`, the `npm-boundary-readings.log.txt` path, `devEngines.packageManager`, `>=11.6.0`, `onFail`, `engines.npm`, `engine-strict`, "from 10.9.0 on", "beneath the floor", and file and constant tokens in the successor row sit without their nouns or with the wrong direction word — **confirmed**; unpublished. Carrier: item C. |
| reviewer claim 8, one commit | `git show --name-only 5e72554` (Grok and Sol both read it) | code, `host.json`, both reports, and the gate evidence together — **CONFIRMED** |
| reviewer F-2, the brief mis-describes `npm-boundary-readings.log.txt` | read the log | its 11.0.0 through 11.5.0 rows are plain-manifest crashes; guard refusals there are 10.9.7 and 11.5.0 — **brief defect, confirmed**; superseded by the interval matrix |

## Reconciled rulings

| claim | subjective | objective | checker | reconciled |
| --- | --- | --- | --- | --- |
| 1 | BROKEN (8b; 9 unresolved) | BROKEN (4, 5, 8b, 9, 10) | 8b, 10 wider; 2, 10, 11 wider on literal line matching | **BROKEN** on 8b, 9, and 10. Sentences 4 and 5 are carried by the interval matrix. Grok's marks on 2 ("carries the blueprint's `engines` value", carried by `compilers.ts:581`), 10 (the command name), and 11 ("Linux host", the log's `uname` reading) are literal-line misses, dropped on the record. Carrier: item A. |
| 2 | CONFIRMED | CONFIRMED | every sentence mapped | **CONFIRMED** |
| 3 | CONFIRMED | BROKEN (5, 10) | 5 and 10 wider | **BROKEN** on "or a later release" only; the interval sentence is carried. Carrier: item B. |
| 4 | CONFIRMED | CONFIRMED | 7 wider | **BROKEN** on the letter the brief set — a release-free universal — which the checker read and both lanes passed. Carrier: item D. |
| 5 | CONFIRMED | BROKEN | tokens in the three shipped regions all nouned | **BROKEN** on the ROADMAP rows; the shipped regions hold. Carrier: item C. |
| 6 | CONFIRMED | CONFIRMED | — | **CONFIRMED** |
| 7 | CONFIRMED | CONFIRMED | greps 1, 1, 0 | **CONFIRMED** |
| 8 | NOT-EVIDENCED on the commit | CONFIRMED | `git show` read | **CONFIRMED** |
| 9 | CONFIRMED | CONFIRMED | diffstat read | **CONFIRMED** |
| 10 | CONFIRMED | CONFIRMED | — | **CONFIRMED** |
| 11 | BROKEN | BROKEN | — | **BROKEN** with claims 1, 3, and 4. Carrier: items A, B, D. |

Findings outside the claims: reviewer F-1 (`such an npm` referent) → closed by item A.1's wording;
F-2 → brief defect, recorded here; F-3 (`above` in the `matchesEngines` summary cell, pre-existing,
tied to source by parity) → a ROADMAP row, item C. Sol reported none.

## Amended sentence set

`u-fix-4-brief.md` § Sentences stands with these source amendments: entries 4, 5, and 9 add
`devengines-interval.log.txt` (every release from 10.9.1 through 11.5.2 refuses under the record;
11.5.1 and 11.5.2 crash without it); entry 8's consequence is bounded to Node 22.18.0 or later and
names no actor; entry 9 reads "every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0
installs it"; entry 10 drops "or a later release"; the doc block carries entries 3, 4, and 5's
refusal and nothing of entry 7. U-fix-5 lands exactly that.

## Which engine was right, on what

Sol on the ranges, the actor, the boundary, the remedy alternative, and the ROADMAP tokens. The
reviewer on the population bound and the referent. Grok on the doc block's universal, which both
judgment lanes passed. The round's disagreements were all settled by running the release matrix
rather than by argument.

## Bounds

Not broken: the placement; the closed set's coverage; every token in the shipped regions; the pin;
`host.json`; the one-commit landing; `dist/bin`; the gate run; and, after the interval matrix, the
refusal interval and the first-release boundary as facts. What is broken is wording: one
population bound, one actor, one boundary phrase, one untested alternative, one release-free
universal, and unpublished tokens. `README.md`, `guides/scaffold.md`, and `dist/src` ship, so the
upload waits for U-fix-5, whose every replacement is prescribed.

VERDICT: FAIL 1, 3, 4, 5, 11; outside the claims: F-1, F-2, F-3
