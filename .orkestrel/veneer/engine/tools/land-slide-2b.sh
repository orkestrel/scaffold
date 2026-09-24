#!/usr/bin/env bash
# J-SLIDE landing, step 2, derived from w2-land-2b.sh: the unit changes the showcase app and the guide, so the
# integration gates add test:app and build:app; the reinstall runs when the merge moved the lockfile.
# Commits the merge, runs the gates read-only in the worktree, then fast-forwards main and removes the
# worktree and the branch when every gate is green. Usage: bash land-demo-2b.sh
set -u
UNIT=slide
S="$(dirname "$0")"
LOG="$S/land-slide-2b.log"
: > "$LOG"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
cd "$TREE" || exit 1
{
	echo "# J-SLIDE landing, step 2: the merge commit, the integration gates, the fast-forward (2026-09-24)"
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
	for step in format:check lint:check check test:guides test:policy test:app test:journey test:src:browser build:src:core build:src:styles build:src:browser build:app test:conformance test:setup; do
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
