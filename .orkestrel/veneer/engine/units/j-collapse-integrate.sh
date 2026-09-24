#!/usr/bin/env bash
# Integrates J-COLLAPSE for landing, in the collapse worktree, after the round-3 audit passes and
# every lane has returned: merges Veneer main (the baseline's re-pin merge 217d12b, which differs from
# the worktree's base eab447e by package.json and package-lock.json alone) into unit/collapse with the
# round-2 and round-3 edits still uncommitted (git permits the merge because it touches no dirty
# file), reinstalls from the merged lockfile, applies the four returned patches, rewraps the one
# orphan line in the guide (a whitespace-only edit, collapse-orphan-fix.py), and runs the integration
# gates read-only in the worktree. The landing commit and the fast-forward follow in land-collapse.sh.
set -u
S="$(dirname "$0")"
LOG="$S/collapse-integrate.log"
: > "$LOG"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse
VENEER=/c/Users/mikes/WebstormProjects/veneer
{
	echo "# J-COLLAPSE integration (2026-09-24)"
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" log --oneline -1
	git -C "$TREE" status --short
	git -C "$TREE" merge --no-edit main; echo "merge main into unit/collapse exit=$?"
	CONFLICTS=$(git -C "$TREE" diff --name-only --diff-filter=U)
	if [ -n "$CONFLICTS" ]; then echo "merge conflicts; integration stopped for the Orchestrator to resolve:"; echo "$CONFLICTS"; exit 70; fi
	git -C "$TREE" log --oneline -2
	cd "$TREE" || exit 1
	npm ci --ignore-scripts; echo "npm ci exit=$?"
	git apply --check "$U"/j-collapse-patches-2/*.diff; echo "apply check exit=$?"
	git apply "$U"/j-collapse-patches-2/*.diff; echo "apply exit=$?"
	python "$S/collapse-orphan-fix.py"; echo "orphan fix exit=$?"
	git status --short
	echo "--- integration gates (read-only, in the worktree)"
	npm run format:check; echo "format:check exit=$?"
	npm run lint:check; echo "lint:check exit=$?"
	npm run check; echo "check exit=$?"
	npm run test:guides; echo "test:guides exit=$?"
	npm run test:policy; echo "test:policy exit=$?"
	npm run test:src:browser; echo "test:src:browser exit=$?"
	git diff --stat
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|CONFLICT\|^[0-9]*:[ AMU?][ AMDU?] \|files changed" | head -60
