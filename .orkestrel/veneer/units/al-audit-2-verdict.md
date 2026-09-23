# Audit verdict — ALERT (`al`), round 2 (the fix round, 2026-09-23)

Subject: `al-2.diff`, `al-2-status.txt`, `al-shared-2.patch` (against `c3ac297`), the report `b-modal-al-report-2.md`, the instruments `al-instruments-2/`; claims `al-audit-2-claims.md`; effective brief `al-brief-2.md`. Lanes: the objective lane `analyst` on GPT-6 Astra (`al-audit-2-objective-verdict.md`; thread `01a0cf02-0470-76e2-ae16-47ad594642be`, launched through `codex-queue-5.sh` after a live probe at 16:03 UTC); the subjective lane `reviewer` on Opus 5.5 (`al-audit-2-subjective-verdict.md`); `checker` on Sonnet (`al-audit-2-checker-verdict.md`); blind on one claims file. The writer was `opus` on Opus 5.5, so the objective lane is the auditor engine that did not write it.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | BROKEN (the claim's removal list) | CONFIRMED | CONFIRMED on scope; the claim's list of removed lines was a claims-file fault (it omitted the realigned `#### btn-close` rows and named round-1-to-round-2 differences as removals); the patch's removals are the M6 sentence, the `Overlays` row, the `btn-close` rows realigned, the `CLOSE_COPY` sentence, and the `CLOSE_DEFERRED` entry |
| 2 The mutation logs | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The hit reading | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Physical direction and the `right` key | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 The R17 sentence and `CLOSE_COPY` | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 The nouns and the inset comment | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The gates and the patch check | CONFIRMED (the digest computed in the sandbox) | UNRESOLVED (the digest; the gates' order) | UNRESOLVED (the digest) | CONFIRMED: the Orchestrator's `sha256sum` reads the report's digest, and the worktree's file times put the last owned-file edit at 15:30:49 UTC, the patch at 15:38:24, the styles log at 15:39:17, and the gates log at 15:40:05 |
| 8 Law and report | BROKEN (the report's diffstat totals and the word `just`) | CONFIRMED | CONFIRMED | BROKEN on the report only; the delta is clean |

Outside the claims: REPORT-COUNTS (objective); the subjective lane's referral on retention fidelity.

## Rulings

- **Claim 8 and REPORT-COUNTS.** A records edit by the Orchestrator, not a unit round: the retained report drops the owned-file line totals, writes "immediately before" for "just before", and names light and dark in the matrix rows that said "both modes"; the `git diff --stat` line stays as a measurement with its command, and the run result lines stay. The edit is recorded in the commit that retains this verdict.
- **Retention fidelity (the subjective referral).** Retention rewrites every `tmp/` path in a retained artifact to the path it now names, quoted transcript lines included, because a retained file naming a launch copy resolves to nothing after the sweep (`.agents/orchestration.md` § Dispatch anatomy). The report's own brief path and its § Review evidence lines are rewritten to the retained names in the same commit. No rule change.
- **Claim 1.** No change to the unit; the claims file's fault is recorded.

ALERT is accepted for landing after the disclosure wave: the patch applies against the landing head with three-way resolution in the disclosure landings' form, the Alert region's construction position moves at integration per the M14 placement deviation, and the journey and the capture regeneration are the landing's evidence.

VERDICT: PASS
