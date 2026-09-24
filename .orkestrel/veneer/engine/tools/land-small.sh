#!/usr/bin/env bash
# Lands a small unit whose change is confined to named paths: commits those paths on unit/<unit> with the
# message file, merges origin/main, runs the static gates and the named test files (the scoped chain the
# user's 2026-09-24 ruling asks for), fast-forwards main, pushes, and removes the worktree and branch.
# A merge that brings anything re-runs the whole browser suite and setup:browser before the fast-forward.
# Usage: bash land-small.sh <unit> <message-file> <log-file> <test-file>... -- <path>...
set -u
UNIT="$1"; MESSAGE="$2"; LOG="$3"; shift 3
TESTS=(); PATHS=(); SEEN=0
for arg in "$@"; do
	if [ "$arg" = "--" ]; then SEEN=1; continue; fi
	if [ "$SEEN" -eq 0 ]; then TESTS+=("$arg"); else PATHS+=("$arg"); fi
done
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/$UNIT
: > "$LOG"
{
	echo "# J-${UNIT^^} landing (2026-09-24): paths ${PATHS[*]}; tests ${TESTS[*]}"
	cd "$TREE" || exit 1
	git add -- "${PATHS[@]}"
	git commit -F "$MESSAGE"; echo "commit exit=$?"
	git fetch origin main; echo "fetch exit=$?"
	BEFORE=$(git rev-parse HEAD)
	git merge --no-edit origin/main; echo "merge exit=$?"
	if [ -n "$(git diff --name-only --diff-filter=U)" ]; then echo "conflicts; stopped"; exit 70; fi
	STEPS=(format:check lint:check check test:policy)
	for step in "${STEPS[@]}"; do npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }; done
	npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser "${TESTS[@]}"; code=$?; echo "scoped tests exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }
	if [ "$(git rev-parse HEAD^1 2>/dev/null)" = "$BEFORE" ] && [ "$(git rev-parse HEAD)" != "$BEFORE" ]; then
		echo "origin/main moved; the whole browser suite and setup:browser run on the merge"
		for step in test:src:browser test:setup:browser; do npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && { echo "red; stopped"; exit 71; }; done
	fi
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; exit 65; fi
	git -C "$VENEER" fetch origin main
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" merge --ff-only "unit/$UNIT"; echo "main ff to unit exit=$?"
	git -C "$VENEER" push origin main; echo "push exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" worktree prune
	git -C "$VENEER" branch -D "unit/$UNIT"; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -3
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|moved\|stopped\|refused\|Tests \|^[0-9a-f]\{7\} " | head -30
