#!/usr/bin/env bash
# Successor of w2-land-2.sh (2026-09-24): reinstalls only when the merge moved the lockfile, and with `npm install --ignore-scripts` (npm ci fails EPERM on the oxide binary WebStorm holds in a worktree). W2 landing, step 2 of 3, for one unit after w2-land-1.sh merged main (and w2-resolve-guide.py resolved
# a guide conflict where one arose): re-pads the guide with the formatter, commits the merge, reinstalls
# from the merged lockfile, and runs the integration gates read-only in the worktree, then fast-forwards
# main and removes the worktree and the branch when every gate is green (step 3 folded in, gated).
# Usage: bash w2-land-2.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
LOG="$S/w2-land-2b-$UNIT.log"
: > "$LOG"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
cd "$TREE" || exit 1
{
	echo "# J-${UNIT^^} landing, step 2: the merge commit, the integration gates, the fast-forward (2026-09-24)"
	npx oxfmt --config .oxfmtrc.json --write guides/veneer.md; echo "oxfmt write exit=$?"
	git add -- guides/veneer.md
	echo "unmerged: $(git diff --name-only --diff-filter=U | tr '\n' ' ')"
	if [ -n "$(git diff --name-only --diff-filter=U)" ]; then echo "unmerged paths remain; stopped"; exit 70; fi
	MOVED="$(git diff --name-only HEAD MERGE_HEAD -- package.json package-lock.json 2>/dev/null)"; echo "lockfile moved: [$MOVED]"
	if git rev-parse -q --verify MERGE_HEAD > /dev/null; then git commit --no-edit; echo "merge commit exit=$?"; else echo "no merge in progress (main was already contained)"; fi
	git log --oneline -3
	if [ -z "$MOVED" ]; then echo "lockfile unchanged by the merge; no reinstall"; else npm install --ignore-scripts; echo "npm install exit=$?"; fi
	git status --short
	echo "--- integration gates (read-only, in the worktree)"
	FAIL=0
	for step in format:check lint:check check test:guides test:policy test:src:browser build:src:core build:src:styles build:src:browser test:conformance test:setup; do
		npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && FAIL=1
	done
	if [ "$FAIL" -ne 0 ]; then echo "a gate is red; the fast-forward is not run"; exit 71; fi
	echo "--- the fast-forward"
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; git -C "$VENEER" status --short; exit 65; fi
	git -C "$VENEER" merge --ff-only "unit/$UNIT"; echo "main ff to unit/$UNIT exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" branch -D "unit/$UNIT"; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -4
	git -C "$VENEER" status --short --branch
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|unmerged\|stopped\|refused\|red;" | head -60
