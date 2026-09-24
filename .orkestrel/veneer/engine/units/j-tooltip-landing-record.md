# J-TOOLTIP — the Orchestrator's landing record (2026-09-24)

Subject: `unit/tooltip` — rounds 1 to 4 as `4a10b51`, round 5 as the merge commit `0807a4f` (the first merge with `main` `c21fd17`, the two door repairs, the promotion bound, the wording), round 6 (the second merge with `main` `2d95b37`, resolution only) and round 7 (the two hide-takeover sentences) staged on the open merge, committed by `w2-land-2b.sh tooltip` as the merge commit whose tip the landing log names (`j-tooltip-landing.log.txt`).

## What accepted the landing

- **The landing audit** (`j-tooltip-audit-6-verdict.md`): the objective lane (Astra) and the checker over the landing diff against `MERGE_HEAD` `2d95b37`; every claim confirmed but the two hide-takeover sentences, which round 7 corrected as the lane prescribed (`j-tooltip-report-7.md`; `test:guides` 20 and the format check green after them). The checker's two open clauses closed on the Orchestrator's gate run and its read of `tooltip.js`.
- **The Orchestrator's gate run over the merged tree** (`j-tooltip-gates-6.log.txt`): `check:src:browser`, oxlint, oxfmt, `test:src:browser` 799 passed, `test:guides` 20, `test:policy` 109 and 1 skipped, the three builds, `test:conformance` 26, `test:setup` 318, the tree-wide `check` — twelve exits at 0.
- **The Orchestrator's replay** (`j-tooltip-mutations-5-orchestrator.log.txt`): the round-5 instrument's mechanism rows over the merged tree reproduced the writer's readings — "the rebuild's dispatch reads no tip", "the rebuild ignores the old tip's report", "the teardown reads no token", "P3 the promotion reads no door", "the show completion reads no door" (`EXACT`); "the door reads no container", "the door reads no token", "P2 the discard reports every tip as removed" (`JOINED`) — with the instrument's receipt and the Orchestrator's own digest: every source restored byte for byte. This settles the replay clause every round left UNRESOLVED (rounds 2 to 6); the round-3 replay was deferred to round 4's instrument and round 4's to round 5's per the pipeline, and the 97-row whole run stands on the writer's log with matching digests for the rows not replayed.
- **The landing chain** (`w2-land-2b.sh tooltip`, retained as `j-tooltip-landing.log.txt`): the merge commit, the reinstall where the lockfile moved, `format:check`, `lint:check`, `check`, `test:guides`, `test:policy`, `test:src:browser`, the three builds, `test:conformance`, `test:setup`, then the fast-forward of `main`, the worktree removal, and the branch deletion; the push follows.

## Carried out of the unit (all in `plan.md` § Carried findings)

- The `Placement` guard for the promotion's positioning writes after a relocating opening `beforetoggle` (E18 as amended; J-POPOVER).
- The instrument row pinning the rebuild dispatch's container read alone (the old placement stays promoted when that dispatch stops the rebuild; J-POPOVER's instrument).
- The round-4 subjective lane's bounds B5, B6, B8, B10, B11 and its B7 titles (J-POPOVER's prose pass).

## Deviations

- No subjective lane at the landing round (the reason in `j-tooltip-audit-6-verdict.md`).
- The replay ran the eight mechanism rows, not the 97; the selection is recorded above.
- The stopped round-4 writer's collided instrument run and its repair are recorded in `j-tooltip-report-4.md` and confirmed by the round-4 checker and objective lane.

RULING: accepted; landed when the chain's fast-forward completes and `main` is pushed
