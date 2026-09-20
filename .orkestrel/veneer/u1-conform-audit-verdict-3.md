# U1-conform audit round 3 — verdict, 2026-09-20

Subject: the U1-conform tree on Veneer `d8b0e65` after brief 4 (`units/u1-conform-report-4.md`,
`builder` on native Sonnet), rendered as `units/u1-conform-diff-3.patch.txt` and
`units/u1-conform-status-3.txt`. Claims: `u1-conform-audit-claims-3.md`. Lanes, blind to each
other, neither on the writer's engine:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c063-d7dc-7d51-a238-c8383269933f`, exit 0 | `units/u1-conform-audit-3-analyst.sh`, `units/u1-conform-audit-3-analyst-report.md` |
| subjective | `reviewer` | native Opus 5, workflow `wf_b7025f01-4d1` | `units/u1-conform-audit-3-reviewer-brief.md`, `units/u1-conform-audit-3-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u1-conform-audit-3-checker-brief.md`, `units/u1-conform-audit-3-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u1-conform-gate-brief-3.md`, `units/u1-conform-gate-report-3.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED (formatter and linter executed through their installed entries) | CONFIRMED | PASS | confirmed |
| 2 | CONFIRMED (thirty-three inputs executed with the installed parser, the negative control reproducing the defect under `preserveParens: true`) | CONFIRMED | PASS | confirmed |
| 3 | CONFIRMED (`collectLayer('elements', [])` executed) | CONFIRMED | PASS | confirmed |
| 4 | CONFIRMED (the untracked hunk reproduced from the one word) | CONFIRMED | PASS | confirmed |
| 5 | REFUTED on the added sentence: `preserveParens` carries no kind word (`writing.md` § Code tokens); the code law holds | CONFIRMED on the code law; the same hit recorded as bound 10 under the round-2 package-wide ruling | PASS (code law) | the code law confirmed; the sentence carried (brief 5) — it is this round's own added sentence, so it is corrected here rather than left to the package-wide pass |
| 6 | REFUTED as written: the untracked renderings do carry `index` lines, so the blob-pair set includes `app/browser/Showcase.ts`; the scope holds (a removed status row failed the comparison in memory) | CONFIRMED (five blob pairs listed, the untracked one included) | PASS | confirmed in substance; the claims preamble's statement that `git diff --no-index` emits no `index` line was the Orchestrator's error (reviewer 12), corrected here |
| 7 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u1-conform-gate-report-3.md`: format, lint, check, build, the whole `npm test` chain, `test:distribution` (11 passed, 3 skipped), Edge `test:src` 17, `test:app` 3, `test:src:styles` 40, `test:setup:browser` 19, all exit 0; audit exit 0 with the `setup` question and the three advisory lines; status identical before and after |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| "Parses with `preserveParens` disabled" lacks the kind word | analyst 5, reviewer 10 | brief 5 item 1 |
| the parse-option sentence sits inside `@returns` | reviewer 9 (bound) | brief 5 item 1 |
| `The named sheets carry no Veneer cascade` names an argument the default-argument callers never write | reviewer 8 (bound) | brief 5 item 2: `The sheets carry no Veneer cascade`, true for both callers |
| the case title names nothing about parentheses | reviewer 11 (bound) | brief 5 item 3 |
| the claims preamble misdescribed the untracked renderings | analyst 6, reviewer 12 | corrected in this verdict; the round-4 evidence description states the blob pairs plainly |

## Ruling

Every behaviour claim is confirmed on every lane and the gates are green on the round-3 tree.
What remains is prose: one kind word, one sentence's home, one thrown message that fits both
callers, one case title. Brief 5 on `builder` carries them verbatim. Because they change no
behaviour and each is specified word for word, round 4 runs the `checker` against the rendered
diff and the `verifier` for the gates, and the Orchestrator rules; the objective and subjective
lanes are not run for it, recorded here with this reason.

Verdict: fix round — claim 5 (the sentence) with reviewer bounds 8, 9, and 11; brief 5 on `builder`.
