# Audit verdict — CAROUSEL (`ca`), round 2 (the fix round, 2026-09-23)

Subject: `ca-2.diff`, `ca-2-status.txt`, `ca-shared-2.patch` (against `c3ac297`), the report `b-modal-ca-report-2.md`, the instruments `ca-instruments-2/`; claims `ca-audit-2-claims.md`; effective brief `ca-brief-2.md`. Lanes: the objective lane `analyst` on GPT-6 Astra (`ca-audit-2-objective-verdict.md`; thread `01a0cf2e-b123-7893-806e-5570d623a8b3`, launched through `codex-queue-7.sh` after a live probe at 16:52 UTC); the subjective lane `reviewer` on Opus 5.5 (`ca-audit-2-subjective-verdict.md`); `checker` on Sonnet (`ca-audit-2-checker-verdict.md`); blind on one claims file. The writer was `opus` on Opus 5.5, so the objective lane is the auditor engine that did not write it.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The mutations and the matrix | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The height case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 The contrast case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 The comparator | BROKEN (the expanded order comparison excludes properties with recorded value departures, so a moved `color` declaration reads green) | CONFIRMED (with the R-A referral: branches no control turned red) | — | BROKEN: the comparator's expanded-mode order check must include the departure properties, with the moved-`color` mutation retained as a negative control |
| 6 The copy, the tokens, and the reason | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The gates and the patch check | BROKEN (the worktree check absent from the log) | BROKEN (same) | BROKEN (same) | CONFIRMED on the Orchestrator's own reading (`git apply --check` in the worktree exit 0 at 16:50:44 UTC, and the objective lane's own run exit 0); the claim's log clause was overstated, and round 3 retains the line |
| 8 Law and report | BROKEN ("all three" at `carousel.test.ts` around line 286; "one regular expression"; placeholder gate commands) | CONFIRMED ("all three" ruled permitted because the members are named) | CONFIRMED | BROKEN on the report's placeholders and "one regular expression"; "all three" takes the members' names, because `AGENTS.md` § Writing bans a count where the members can be named instead |

Outside the claims: FADE-IN-CONTRAST and FADE-COMMENT (subjective), REPORT-COUNTS (objective), R-A and R-B (subjective referrals).

## Rulings

- **Claim 5.** Round 3 changes `cascade-check.mjs` so the expanded-mode declaration-order comparison includes every shared property, those with a recorded value departure included, and excludes only a property absent from one side; the negative control `color-before-position` (the controls block's `color` declaration moved before `position` in the compiled input) is run and retained red, and the clean and restored runs stay green. R-A: the `MISSING`, `ORDER`, `LAYER`, and `STALE-DEPARTURE` branches each take one negative control run in the same round (a recorded selector removed from the compiled input; two carousel keys swapped in it; a block moved outside the components layer; a departure row added to a copy of the guide that the cascade does not write), each retained red.
- **FADE-IN-CONTRAST.** The fading specimen's resting-slide opacity assertion leaves the contrast case for a case titled `paints the fading carousel's resting slide at full opacity`, and the matrix row for `.carousel-fade .carousel-item.active` names that case for the section mutation `fade-class-dropped`.
- **FADE-COMMENT.** The fade case's comment names every mutation the matrix routes to it: a fade rule that stops hiding the other slides, a stacking rule that drops the resting slide or either incoming slide, and the outgoing slide's delay dropped.
- **Claim 8.** `carousel.test.ts`'s controls comment names the light, dark, and consumer readings instead of "all three"; the report writes "a regular expression", records the scoped `oxfmt` and `oxlint` commands with their executed arguments (from `logs/gates/summary.txt`), and gains the worktree `git apply --check` line (R-B: the scoped worktree `oxfmt` and `oxlint` runs are logged too).
- **Claims-file fault.** Claim 7's clause that `patch.log.txt` records the worktree check is recorded against the claims file.

## Carriers

Every finding is carried by `ca-brief-3.md` (a fully specified round on `builder`, verified by `checker`): claim 5 with R-A, FADE-IN-CONTRAST, FADE-COMMENT, claim 8 with R-B and REPORT-COUNTS. Claims 1 to 4 and 6 are closed.

VERDICT: FAIL 5, 8; outside the claims: FADE-IN-CONTRAST, FADE-COMMENT, REPORT-COUNTS, R-A, R-B — carried by round 3
