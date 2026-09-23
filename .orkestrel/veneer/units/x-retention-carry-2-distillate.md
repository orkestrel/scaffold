## Distillate — X-RETENTION-2 carry and promotion check, on GPT-5.6 Luna

Bench unit: `distiller`'s job on the absorption ladder's second step (the Cursor bench timed out its probe at 22:24 UTC), `codex exec --sandbox read-only` rooted at `/home/user/scaffold`, launched by `x-retention-carry-2.sh`; journal `tmp/codex/x-retention-carry-2.jsonl` (swept at acceptance), thread id `01a0d06c-3343-7f90-9273-aafe47725be0`, probe 22:39:06 UTC, ended 22:41:11 UTC, exit 0, 12 items. The lane's returned message follows verbatim.

File table

- landed — `ac.diff`, `al.diff`, `ca.diff`, `cn.diff`, `co.diff`, `dd.diff`, `nv.diff`, `pr.diff`, `bs.diff`, `ud.diff`, `us.diff`, and `ac-instruments-2/`, `al-instruments/`, `al-instruments-2/`, `ca-instruments/`, `ca-instruments-2/`, `co-instruments/`, `dd-instruments-2/`, `ud-instruments-2/`, `ud-instruments-3/`, `us-instruments/`: round-1 records retained by prune `91883d2a`; Veneer history and `git show --stat 91883d2a`.
- landed — `tg-*`, `tg-instruments*`, `upl-*`, `upl-instruments*`, `nb-*`, `nb-instruments*`, `t4-*`, `t4-r3-instruments/`, `tm-*`, and their descendants: landed-unit records; `tg-audit-3-verdict.md`, `upl-audit-4-verdict.md`, `nb-audit-4-verdict.md`, `t4-audit-verdict.md`.
- landed — `band-gates.log.txt`, `band-3-gates.log.txt`, `upl-landing-frame-band.py`, `upl-landing-frame-band-2.py`, `upl-landing-frame-band-3.py`: specimen-band landing; plan § Intersession state.
- landed — `main-tg-*`, `refresh-tg*`, `regen-tg*`, `verify-tg*`, `dry-check-tg*`, `main-upl-*`, `refresh-upl*`, `regen-upl*`, `verify-upl*`, `merge-51a8fa0-*`, `base-build-55ca0cd*`, `fold-61.py`, `fold-62.py`, `wave2-briefs.py`: executed landing chains; plan § Landing procedure and § Intersession state.
- landed — `codex-queue-3.sh` (`nv`, `dd`), `codex-queue-8.sh` (`upl`), `codex-queue-9.sh` (`tg`), `codex-queue-12.sh` (`nb`), `codex-queue-13.sh` (`upl-2`), `codex-queue-14.sh` (`tg-2`), `codex-queue-17.sh` (`nb-2`), `codex-queue-18.sh` (`upl-3`), `codex-queue-20.sh` (`tg-3`), `codex-queue-21.sh` (`upl-4`), `codex-queue-22.sh` (`nb-3`), `codex-queue-23.sh` (`nb-4`), `codex-queue-24.sh` (`t4`), `codex-queue-25.sh` (`t4-2`), `codex-queue-26.sh` (`t4-3`), `codex-queue-27.sh` (`t4-4`), `codex-queue-28.sh` (`t4-5`), `codex-queue-29.sh` (`tm`), `codex-queue-30.sh` (`t4-6`): queue scripts launched only landed lanes; each queue header and launcher call.
- live-instrument — `land-unit.sh`, `land-seams.py`, `land-conflict-map.py`, `table-merge3.py`, `sort-inventories.py`, `resolve-diff3.py`, `resolve-hunks.py`, `resolve-files-table.py`, `regen-portfolio.sh`, `refresh-cg.sh`, `main-bff-gates.sh`, `main-bfl-gates.sh`, `main-cg-gates.sh`, `codex-queue-2.sh`: reusable landing and queue tools named by plan § What the folder holds.
- open — all `b-*-design-*`, `b-*-terrain-*`, `b-*-family.md`, `b-passive-baseline.md`, `decisions-round-2.md`, `j-engine-*`, `proof-resolver-*`, `browser-serialization-*`, `plan-marker-2.py`, `fold-55-message.txt`, `x-retention-carry-brief.md`, `x-retention-carry-distillate.md`, `x-retention-carry-2-brief.md`, `x-retention-carry-2.sh`: open briefs, design records, family records, engine records, and cited open records; plan § What the folder holds.
- pending-run — `fold-63.py`, `veneer-021.sh`, `t4-release-bump-2.sh`, `t4-login.sh`, `t4-publish.sh`: staged by plan § Intersession state and not run.
- unattributed — `cursor-queue.sh`: no landing, reusable-tool, open-record, or pending-run attribution in the plan.

Carry list

- Test-file local fixture classes and helpers — carrier: a later `@orkestrel/test` change, recorded in `tm-fixture-population.txt` and ROADMAP § Carriers; flag: carrier is a future change, not a live unit.
- `@orkestrel/test` re-pin carrying `@orkestrel/contract` `^0.0.18` — carrier: `t4-release-bump-2.sh`, then `veneer-021.sh`; flag: registry availability is a condition, and the release unit is not run.
- Test-package release `0.0.22` after Contract `0.0.18` — carrier: `t4-release-bump-2.sh`; flag: the plan also names the conditional `0.0.21` path, so the carrier is conditional rather than a settled unit.
- Veneer re-pin, portfolio regeneration, authoritative chain, roadmap fold, and marker — carrier: `veneer-021.sh`, `fold-63.py`, and the pending landing procedure; flag: staged, not executed.
- `@orkestrel/contract` `0.0.18` publication — carrier: the contract campaign and its release; flag: external registry publication remains a prerequisite.
- T4 fixture population — carrier: `tm-fixture-population.txt`; flag: no current unit owns implementation.

Promotion list

- Retention and prune procedure in landed briefs and chain records — already carried by `.agents/orchestration.md` § Where campaign artifacts live and `.agents/skills/orkestrel-debrief/references/retention.md`.
- Types-first, real-implementation, no-mock, no-suppression, boundary, and gate rules in landed briefs and audit records — already carried by `AGENTS.md` and the applicable `.claude/rules/*.md`.
- Falsification and independent-audit procedure — already carried by `.agents/skills/orkestrel-falsify/SKILL.md` and `.claude/rules/quality.md`.
- Landing merge, chain, regeneration, and roadmap-fold procedure — already carried by `.orkestrel/veneer/plan.md` § Landing procedure.
- Queue sequencing and single-lane execution — already carried by `.agents/orchestration.md` and the retained queue template.
- Product claims in landed records — promoted through the Veneer landing commits and `guides/veneer.md`; no additional unpromoted product truth identified.
- Unit-specific deviations, report wording defects, and audit corrections — record-only; no promotion required.

Measurement list

- Bootstrap `5.3.8` — recorded in the guide and ROADMAP; date carried by the campaign records.
- `390`, `1280`, `195`, and `640` viewport and width readings — recorded in the guide and capture records; the folder records run dates in the relevant logs and verdicts.
- `0.02px` breakpoint adjustment — recorded in the guide; the folder records the capture context but not a standalone measurement date.
- `0.15s`, `0.15s ease`, and `0.15s ease-in-out` motion values — recorded in the guide; the folder records them as implementation facts, not dated measurements.
- `20%`, `10%`, `7.5%`, and `5%` color-mix readings — recorded in the guide; the folder records the values but not a dedicated measurement date.
- `0.875em`, `0.1875rem`, `4px`, `20px`, and the documented spacing and size-token values — recorded in the guide; dates are present only in the originating campaign records, not beside every copied value.
- `0.0.21`, `0.0.22`, `0.0.17`, and `0.0.18` package versions — recorded in ROADMAP and plan state; dates are recorded in the intersession notes.

CARRY: OPEN Test-file local fixture classes and helpers; Contract 0.0.18 publication; conditional test-package release; pending Veneer re-pin and landing chain