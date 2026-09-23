#!/bin/bash
# prune-wave2.sh [--apply]: the wave-2 prune of `.orkestrel/veneer/units/` after TOGGLES, UTIL-PLACEMENT, NAVBAR, the
# specimen band, T4 TEST-CLIP, and TEST-MATRICES are on their `main` branches. The set is the `landed` class of the carry
# check (`x-retention-carry-2-distillate.md`, GPT-5.6 Luna) with the Orchestrator's rulings: PROOF-RESOLVER and
# BROWSER-SERIALIZATION landed (`7d9d415`, `83d23cf`), so their brief/report pairs prune although the lane read them as
# open; `fold-55-message.txt` and `plan-marker-2.py` belong to closed folds and markers; the first carry register pair is
# superseded by `x-retention-carry-2-*`. Kept: `t4-release-bump-2.sh` (the engine session's TEST-REPIN reads it), the
# landing instruments, `cursor-queue.sh` and `codex-queue-2.sh`, every design, terrain, family, decision, and
# `j-engine-*` record, and `engine/`. Without --apply it lists what it would remove; with --apply it removes the paths
# with `git rm -r -q`. Refuses a dirty campaign folder.
set -u
cd /home/user/scaffold/.orkestrel/veneer/units || exit 1
[ -z "$(git status --porcelain -- .)" ] || { echo "campaign folder dirty; refusing"; exit 2; }
shopt -s nullglob
paths=(
	tg-* b-collapse-tg-* upl-* b-utilities-upl-* nb-* b-collapse-nb-* tm-* band-*
	main-tg-* refresh-tg* regen-tg* verify-tg* dry-check-tg* main-upl-* refresh-upl* regen-upl* verify-upl*
	merge-51a8fa0-* base-build-55ca0cd* fold-55-message.txt fold-61.py fold-62.py fold-63.py wave2-briefs.py plan-marker-2.py
	veneer-021.sh veneer-021.log.txt
	ac.diff al.diff ca.diff cn.diff co.diff dd.diff nv.diff pr.diff bs.diff ud.diff us.diff
	ac-instruments-2 al-instruments al-instruments-2 ca-instruments ca-instruments-2 co-instruments dd-instruments-2
	ud-instruments-2 ud-instruments-3 us-instruments
	proof-resolver-brief.md proof-resolver-report.md browser-serialization-brief.md browser-serialization-report.md
	x-retention-carry-brief.md x-retention-carry-distillate.md x-retention-carry.sh
	codex-queue-3.sh codex-queue-8.sh codex-queue-9.sh codex-queue-12.sh codex-queue-13.sh codex-queue-14.sh
	codex-queue-17.sh codex-queue-18.sh codex-queue-20.sh codex-queue-21.sh codex-queue-22.sh codex-queue-23.sh
	codex-queue-24.sh codex-queue-25.sh codex-queue-26.sh codex-queue-27.sh codex-queue-28.sh codex-queue-29.sh
	codex-queue-30.sh
)
t4=(t4-*)
for f in "${t4[@]}"; do [ "$f" = "t4-release-bump-2.sh" ] || paths+=("$f"); done
tracked=()
for p in "${paths[@]}"; do [ -e "$p" ] && [ -n "$(git ls-files -- "$p")" ] && tracked+=("$p"); done
echo "paths: ${#tracked[@]}"
printf '%s\n' "${tracked[@]}" | sed 's/-[0-9a-z]*\..*$//' | sort | uniq -c | sort -rn | head -40
[ "${1:-}" = "--apply" ] || exit 0
git rm -r -q -- "${tracked[@]}" && echo "removed; staged in the index"
