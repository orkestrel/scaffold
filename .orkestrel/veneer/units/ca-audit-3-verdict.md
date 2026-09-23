# Audit verdict — CAROUSEL (`ca`), round 3 (the fix round on `builder`)

Subject: the round-3 delta (`ca-3.diff`, `ca-3-status.txt`, `b-modal-ca-report-3.md`, `ca-instruments-2/` refreshed with `logs/cascade/` and `logs/round3-gates/`) over `c3ac297` in `/home/user/veneer-ca`, against `ca-brief-3.md` (the carriers of round 2's findings 5 and 8) and the claims in `ca-check-3-brief.md`.

## Lanes

- `checker` on Sonnet (`ca-check-3-brief.md`, claims 1 to 5): `ca-check-3-verdict.md`, `VERDICT: FAIL 5; outside the claims: none`.
- `analyst` on Astra and `reviewer` on Opus 5.5: not run in this round. Round 3 is a `builder` fix round carrying two mechanical findings from round 2's audit (the comparator's order check over departure properties with its controls; the case split and the comment nouns), whose acceptance criteria are mechanical, so the checker is the round's lane; rounds 1 and 2 ran both adversarial lanes on the same code (`ca-audit-verdict.md`, `ca-audit-2-verdict.md`), and no assertion line in `carousel.test.ts` changed in round 3 (checker claim 1).

## Reconciliation

1. **Delta and scope** — CONFIRMED (checker). The delta is the two proof files; `_carousel.scss` and `CarouselSection.ts` are byte-identical to round 2.
2. **The comparator** — CONFIRMED (checker). The `sequence` helper no longer excludes a departure property from the order check; the R-A controls `color-before-position`, `missing-selector`, `swapped-keys`, `moved-layer`, and `stale-departure` each read the named red line, and the clean and restored runs read green.
3. **The case split** — CONFIRMED (checker). `paints the fading carousel's resting slide at full opacity` holds the moved assertion and is the one case `fade-class-dropped` reddens.
4. **The comments** — CONFIRMED (checker).
5. **The gates and the record** — BROKEN as claimed, closed by the Orchestrator's readings. The builder's `logs/round3-gates/oxlint.log.txt` and `patch-check.log.txt` are empty and the report quotes the formatter's line for the linter. The Orchestrator ran both commands in `/home/user/veneer-ca` at `c3ac297` on 2026-09-23 at 17:26 UTC and retained them with their exit codes: `logs/round3-gates/oxlint-orchestrator.log.txt` (`npx oxlint --config .oxlintrc.json --deny-warnings` over the two proofs, no finding, `exit=0`) and `logs/round3-gates/patch-check-orchestrator.log.txt` (`git apply --check ca-shared-2.patch`, `exit=0`). The empty logs are consistent with those exits (each command prints nothing on success), so the finding is a record defect, not a gate defect. The report's `now` (line 28) and `new` (line 113) are banned-sense hits in the retained report; the report is the builder's artifact and is retained as returned, with this verdict as the ruling record, and the landing message carries none of them. Round 2's count phrase `one regular expression` sits in the retained round-2 report only; the round-3 report carries no count phrase, which is the state the claim required.

## Deviation recorded

The builder reported running `git stash` and `git checkout` inside its disposable validation copy at `tmp/probe/base` (a `git archive` extract with its own `git init`, not the worktree), then discarded and rebuilt the copy. The worktree `/home/user/veneer-ca` carried the four untracked owned files and nothing else throughout (`ca-3-status.txt`), so the deviation had no effect on any tree the campaign keeps. Recorded here as a permission-floor deviation with null effect; the `builder` role file's ban stands.

## Ruling

Accepted for landing on the session branch after the BROWSER-SERIALIZATION landing: `land-unit.sh ca` over `c3ac297` with `ca-shared-2.patch` applied three-way, the Carousel region constructed after the last constructed region, the R8 sentence once, the regeneration including the caption reading at 390 (R3), the chain, the fold, the merge of `origin/main`, and the push.

VERDICT: PASS; outside the claims: none
