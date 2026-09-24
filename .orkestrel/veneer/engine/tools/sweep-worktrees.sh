#!/usr/bin/env bash
# Creates the J-REENTRY breadth sweep's scratch worktrees at J-INTEGRATION round 3 (e0dee7e), one per
# lens, each on a sweep/<lens> branch no landing reads, and installs each in parallel. The lenses write
# probe cases only under tmp/ in their own worktree. Usage: bash sweep-worktrees.sh
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
BASE=e0dee7e
for lens in modal-show modal-hide offcanvas-show offcanvas-hide; do
	git -C "$VENEER" worktree add -b "sweep/$lens" "$VENEER/tmp/worktrees/sweep-$lens" "$BASE" || exit 1
done
for lens in modal-show modal-hide offcanvas-show offcanvas-hide; do
	(cd "$VENEER/tmp/worktrees/sweep-$lens" && npm ci --ignore-scripts > "tmp-npm-ci.log.txt" 2>&1; echo "$lens npm ci exit=$?") &
done
wait
for lens in modal-show modal-hide offcanvas-show offcanvas-hide; do
	T="$VENEER/tmp/worktrees/sweep-$lens"
	sha256sum "$T/package-lock.json" | cut -c1-64 > "$T/node_modules/.orkestrel-lock.sha256"
	rm -f "$T/tmp-npm-ci.log.txt"
	git -C "$T" log --oneline -1
done
