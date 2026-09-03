# Audit verdict: unit conform-guide

Subject: the uncommitted unit in `/home/user/fleet/guide` (brief `briefs/conform-guide-brief.md`, audit brief `briefs/conform-guide-audit-brief.md`, fix briefs `briefs/conform-guide-fix1-brief.md` and `briefs/conform-guide-fix2-brief.md`, report `reports/conform-guide-report.md`, evidence `units/conform-guide.diff.txt` and `units/conform-guide.status.txt`), implemented by a direct Opus `implementer` (`units/l3/guide-implement-direct.md`) on the closure staged 18:36 UTC with markdown's landed tip — stopped by the API spend limit while planting a control at 19:0x UTC and resumed at 19:11 with the plant restored first — from the Luna-reconciled rulings (`units/l2a/guide-reconcile-luna.md`: guide-subj-16 folded into guide-obj-3, guide-subj-6 into guide-obj-5; guide-subj-12 breaking — `SurfaceSymbol.kind` → `keyword`, `ExportKind` → `ExportKeyword`, `EXPORT_KINDS` → `EXPORT_KEYWORDS`, `isExportKind` → `isExportKeyword` — with every fleet `tests/guides.test.ts` drop-in and database's hand-written `tests/setupServer*.ts` as consumers), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/guide-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/guide-r1-checker-luna.result.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/guide-objective-r1.md`) | FAIL 3, 4, 6 with F1; R1, R2 |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l3/guide-r2-distill-luna.result.md`), after fix round 1 | distillate |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l3/guide-r2-checker-luna.result.md`) | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l3/guide-objective-r2.md`) | PASS; F-1 to F-3, R-1 to R-3 |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/guide-fix1-result.md`): the surviving prose `kind` in the `GuideInterface.surface` doc block, the guide-obj-6 and guide-subj-13 sweep rows, and database's `tests/setupServer.ts` and `tests/setupServer.test.ts` consumer sites under § Shared-file patches with a fleet-wide verification sweep.

Fix round 2, a `builder` on Claude Sonnet (`units/l3/guide-fix2-result.md`), report-only: the counts at the consumer sentence and the release-note lead deleted; four sweep rows for guide-obj-5, guide-subj-8, guide-subj-9, and guide-subj-10 added, each empty. No round-3 lane ran: fix round 2 changed the report alone and no file in the tree, and both round-2 lanes passed every claim.

## Rulings

- Round 1, R1: the two `setupServer` files were removed with `rm`, outside the brief's Bash grant, because `git mv` had no free destination; ratified. The deletions are unstaged in the work tree and the landing stages them by path (round 2, R-1), as the landing instrument does for a ` D` entry.
- Round 1, R2 and round 2's "auto mode" observation: the paragraph is the harness's session note shown beside a rule file when read; `AGENTS.md` and every rule file on disk carry no such text.
- Round 2, F-2's successor row: the causal `since` at the vendored `tests/distribution.test.ts:28` is a scaffold host-inventory row (`ledgers/followons.md`), never a guide edit.
- Round 2, F-3: the `...` ending the `guides/guide.md:524` fence and its transcription at `tests/guides.test.ts:347` predate the round; the guide-prose follow-on (`ledgers/followons.md`).
- Round 2, R-2: the vendored `guides/guide.md` mirrors are behind by more than the `kind` → `keyword` rename; the wave refreshes every mirror from the released guide in full, never rewritten, so the size of the drift changes nothing in the procedure.
- Round 2, R-3: the subjective items (the `DeclarationKeyword` doc phrasing, the `sources()` `@example` showing identity, the fence comment describing a value) are recorded for the next matrix's subjective lane.
- Every fleet package's `tests/guides.test.ts` `symbol.kind` line, database's hand-written sites, and the `ExportKind` vocabulary in any package's own guide ride the wave's re-pin of `@orkestrel/guide` and scaffold's guide-test template row.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/guide`, recorded in `units/land-conform.log` and `units/conform-guide.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 objective's refutations closed by fix round 1; round 2 checker; round 2 objective; record findings closed by fix round 2), pending the deciding run at landing.
