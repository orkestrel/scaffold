# X-RETENTION-2: the carry and promotion check before the wave-2 prune (successor of `x-retention-carry-brief.md`)

## Role and engine

`distiller`'s job on the absorption ladder's second step: GPT-5.6 Luna (`gpt-5.6-luna`) through
`codex exec --sandbox read-only`, rooted at `/home/user/scaffold`. The Cursor bench is dark this
session (a bounded probe with `grok-4.7-high` timed out at 150 s at 22:24 UTC). You are the engine
behind the CLI: do the reading directly, spawn nothing, edit nothing, and return distilled evidence
with `file:line` pointers. Decide nothing; the Orchestrator rules.

## Law

Read first: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.agents/orchestration.md`
§ Where campaign artifacts live, and the retention procedure
`/home/user/scaffold/.agents/skills/orkestrel-debrief/references/retention.md` (the carry,
promotion, measurement, and orientation checks). The folder inventory rule is
`/home/user/scaffold/.orkestrel/veneer/plan.md` § What the folder holds.

## Subject

The campaign folder `/home/user/scaffold/.orkestrel/veneer/`. Never read or rule on `engine/`: it
is the engine session's folder. The Veneer checkout is `/home/user/veneer`: its `origin/main` is
`51a8fa0`, and the session branch carries four commits above it that land on `main` after this
check (`ac96f81` UTIL-PLACEMENT, `5fb8b41` the width-steps capture edit, `009b95a` NAVBAR, `5d7f3b9`
the specimen band), then a re-pin of `@orkestrel/test` to 0.0.21 and the regenerated portfolio. The
test package's checkout is `/home/user/test`, `main` at `7ce88a8` (`Release 0.0.21`), which carries
T4 TEST-CLIP and TEST-MATRICES; their reconciled verdict is `units/t4-audit-verdict.md`.

## Questions

1. **The file table.** Classify every file and directory under `units/` into exactly one class,
   with the evidence for the class:
   - `landed` — a record of a unit whose work is on Veneer `main`, the session branch range above,
     or the test package's `main` (TOGGLES `tg-*`, `b-collapse-tg-*`; UTIL-PLACEMENT `upl-*`,
     `b-utilities-upl-*`; NAVBAR `nb-*`, `b-collapse-nb-*`; T4 `t4-*`; TEST-MATRICES `tm-*`; the
     specimen band `band-*` and `upl-landing-frame-band*.py`; the earlier landed units whose round-1
     records survived the prune commit `91883d2a`, such as `ac.diff`, `al.diff`, `ca.diff`,
     `cn.diff`, `co.diff`, `dd.diff`, `nv.diff`, `pr.diff`, `bs.diff`, `ud.diff`, `us.diff`, and
     their `*-instruments*` directories — confirm each against `git -C /home/user/veneer log
     --oneline` and `git -C /home/user/scaffold show --stat 91883d2a`), the chain scripts and logs
     that ran only those landings (`main-tg-*`, `refresh-tg*`, `regen-tg*`, `verify-tg*`,
     `dry-check-tg*`, `main-upl-*`, `refresh-upl*`, `regen-upl*`, `verify-upl*`,
     `merge-51a8fa0-*`, `base-build-55ca0cd*`, `fold-61.py`, `fold-62.py`, `wave2-briefs.py`), and
     the bench queues that launched only their lanes (`codex-queue-*.sh`: name which unit each
     queue launched).
   - `live-instrument` — a landing or chain tool a future landing reuses (`land-unit.sh`,
     `land-seams.py`, `land-conflict-map.py`, `table-merge3.py`, `sort-inventories.py`,
     `resolve-*.py`, `regen-portfolio.sh`, `refresh-cg.sh`, `main-*-gates.sh` templates, the
     retained queue template the inventory names), with the plan line that names it.
   - `open` — a record of a unit that has not landed, or a file the plan or an open brief cites
     (design briefs and terrain reports of rounds whose units have not all landed, the
     `j-engine-*` absorption records, `decisions-round-2.md`, the family files).
   - `pending-run` — a script staged for this landing that has not run yet (`fold-63.py`,
     `veneer-021.sh`, `t4-release-bump-2.sh`, `t4-login.sh`, `t4-publish.sh`).
   - `unattributed` — a file you cannot attribute; name it.
2. **The carry check.** From `plan.md` (§ Intersession state, § Landing procedure, § Process
   corrections), the reconciled verdicts of the landed units (`units/tg-audit-3-verdict.md`,
   `units/upl-audit-4-verdict.md`, `units/nb-audit-4-verdict.md`, `units/t4-audit-verdict.md`), the
   landing checker verdicts (`units/*-landing-checker-verdict.md`), `units/tm-fixture-population.txt`,
   and `/home/user/veneer/ROADMAP.md` § Carriers: every open item those landed units leave (a
   defect, a deferred decision, a measurement to re-take, a withdrawn claim, an unmet condition),
   with its carrier as recorded. Flag an item whose carrier is missing, is a condition rather than a
   unit, or names two units.
3. **The promotion check.** For each `landed` file that states a process law ("always", "never",
   "must", a procedure step) rather than a unit-specific fact, name the rule or contract file that
   already carries it (search `/home/user/scaffold/AGENTS.md`, `.agents/orchestration.md`,
   `.claude/rules/*.md`, and `.agents/skills/**`), or report it as unpromoted with the quoted line.
   Report product truth a `landed` file states that `/home/user/veneer/guides/veneer.md` does not.
4. **The measurement check.** Every number a `landed` file carries that `guides/veneer.md` or
   `ROADMAP.md` also carries, with whether the folder records the date it was taken.

## Output

Return, as your final message and nothing else: the file table (grouped by class, one line per
file or directory with its evidence pointer), the carry list with carriers and flags, the
promotion list, the measurement list, and one terminal line
`CARRY: CLOSED` or `CARRY: OPEN <item names>`.
