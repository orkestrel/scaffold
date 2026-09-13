# Audit verdict — u-fix-3-audit

Subject: `@orkestrel/scaffold@0.0.65` at `5e29646`, the fix chain `981aa66..5e29646`. Brief:
`u-fix-3-audit-brief.md`. Lanes: `reviewer` on Opus 5 (native, subjective) and `analyst` on GPT-5.6
Sol (`codex exec`, thread `01a099be-f05d-72d2-9ec3-16576de32a9b`, journal
`tmp/codex/u-fix-3-audit.jsonl`, 1528225 bytes, objective; the driver ran the exec in the
foreground this round). Both opened one identical brief file, blind, in parallel. Lane reports
retained verbatim under `lanes/u-fix-3-audit-subjective-opus.md` and
`lanes/u-fix-3-audit-objective-sol.md`. Bench liveness at dispatch: `LIVE` on thread
`01a099be-b618-72d3-974c-58565dc39afc`.

## Reproduced before ruling

| finding | reproduction | result |
| --- | --- | --- |
| reviewer claim 1, the nested `npm run` refusal is unmeasured | read `evidence/linux-gate/path-prepend.sh` and `path-prepend.log.txt` | the instrument runs `npm run outer` in a `devEngines`-guarded workspace under ambient npm 10.9.7 and reads `EBADDEVENGINES`, exit 1 — **the finding evaporates**: the clause was measured, for npm 10.9.7; what survives is that the paragraph names no source for it |
| Sol claims 1, 4, 10, "an npm older than 10.9.0 fails inside dependency resolution" generalizes | `devengines-floor.log.txt` | measured releases earlier than 10.9.0: 10.5.0 and 10.8.3, nothing older — **confirmed**: the sentence claims every earlier release |
| reviewer claim 7, one commit | `git show --name-only 5e29646` | the code, `host.json`, `u-fix-3-report.md`, `u-fix-3-integrate-report.md`, and the gate evidence in one commit — **settled CONFIRMED**; Sol's BROKEN reads the brief's word "pair", and the integration brief did land earlier in `981aa66` — a brief wording defect, the criterion the integration brief states is met |
| reviewer claim 8, `dist` across the chain | `dist-chain-compare.sh 981aa66` | `dist/src` differs only by the reworded doc block in the core entry's emitted files; `dist/bin` identical — **settled CONFIRMED**, `dist-chain-compare-2.log.txt` |
| reviewer F-3, the bundled-npm fact | the Node release index read 2026-09-13 | lowest bundled npm across every release at or after 22.18.0 is 10.9.0 (at 23.3.0) — **confirmed and sharpened**: the fact is true of every supported release, and its source is the index, not the Linux readings the paragraph cites; `node-index-floor.log.txt` |
| the remedy command was never executed (carried from the U-fix-2 round) | `evidence/linux-gate/remedy-control.sh` | ambient 10.9.7, `npm install --global npm@11.6.0` into a scratch prefix, exit 0, installed npm self-reports 11.6.0 — **measured**, `remedy-control.log.txt` |
| both lanes claim 3, ROADMAP tokens | `ROADMAP.md:373,377,389,428,436,437` | `@npmcli/arborist`, `setsid`, `timeout`, `tests/src/server/helpers.test.ts`, the log path, and the backticked `0.0.65` sit without a following noun — **confirmed**; the file is unpublished |

## Reconciled rulings

| claim | subjective | objective | reconciled |
| --- | --- | --- | --- |
| 1 | BROKEN (nested run) | BROKEN (older-npm generalization) | **BROKEN** on Sol's clause only. The reviewer's clause evaporated on `path-prepend.log.txt`. Carrier: U-fix-4 (the whole-paragraph rewrite), sentences 6 and 7. |
| 2 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 3 | BROKEN, brief defect | BROKEN | **BROKEN** on the ROADMAP tokens; the shipped half holds. The claim's scope exceeded the brief's, so the brief is defective and the rows are still corrected. Carrier: U-fix-4 item D. |
| 4 | CONFIRMED | BROKEN | **BROKEN** on the older-npm generalization in the README. Carrier: U-fix-4 item B. |
| 5 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 6 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 7 | UNRESOLVED | BROKEN, brief defect | **CONFIRMED** on `git show`; the brief's word "pair" was wrong, the integration brief precedes the code by design ("the pair on disk before it runs"). No carrier. |
| 8 | UNRESOLVED | CONFIRMED | **CONFIRMED** on `dist-chain-compare-2.log.txt`. |
| 9 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 10 | BROKEN | BROKEN | **BROKEN** on the older-npm generalization; the reviewer's nested-run half evaporated. Carrier: U-fix-4. |

Findings outside the claims, each with one carrier, all in U-fix-4: reviewer F-1 (`below` for a
version direction; one term, `earlier` and `later`); F-2 (a sentence-initial `It` with competing
referents); F-3 (the bundled-npm fact attributed to the Linux readings, and "a supported Node" with
no antecedent in the README); F-4 (the paragraph bounds its claim by accretion). Sol reported none.

## The strategy switch

This is the third round over one paragraph, and each round found the next sentence claiming more
than the readings carry: the universal refusal, then the token forms, now the older-npm range and
the provenance. `.claude/rules/quality.md` § Rounds and verdicts and `.agents/orchestration.md`
§ Context and decomposition call the switch: U-fix-4 rewrites the paragraph whole, from a closed
set of sentences each with a named retained source (`u-fix-4-brief.md` § Sentences), and its audit
asks of each sentence whether its source carries it and whether any sentence sits outside the set.
A fourth sentence-level repair is refused.

## Which engine was right, on what

Sol on the older-npm range, the `0.0.65` token, and the letter of claim 7's wording. The reviewer on
the one-commit and dist readings it could not run but framed correctly, on `below`, the pronoun,
the provenance of the bundled-npm fact, and the accretion. The reviewer's headline finding was
wrong on the evidence and is recorded as such: the nested `npm run` refusal was measured.

## Bounds

Not broken: the placement; the README voice and the pin; the ROADMAP edits' substance; the doc
block's summary and parity; `host.json`; one-commit landing; `dist/bin`; the gate run; the emitted
record and every refusal reading. What is broken is one generalization ("older than 10.9.0")
where two releases were measured, plus token forms in an unpublished file and the paragraph's
provenance and shape. `README.md` and `guides/scaffold.md` ship, so the upload waits for U-fix-4.

VERDICT: FAIL 1, 3, 4, 10; outside the claims: F-1, F-2, F-3, F-4
