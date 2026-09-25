#!/usr/bin/env bash
# Cuts the J-CASCADE worktree (branch unit/cascade) and the detached J-NATIVE-PROBE round-2 worktree from
# Veneer main 6dd5034 (J-SNAPSHOT-SHARED's landing), and installs each one's node_modules from its lockfile.
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
BASE=6dd5034
git -C "$VENEER" worktree add -b unit/cascade "$VENEER/tmp/worktrees/cascade" "$BASE"; echo "cascade worktree exit=$?"
git -C "$VENEER" worktree add --detach "$VENEER/tmp/worktrees/probe" "$BASE"; echo "probe worktree exit=$?"
for tree in cascade probe; do
	cd "$VENEER/tmp/worktrees/$tree" || exit 1
	npm ci --ignore-scripts > /dev/null 2>&1; echo "$tree npm ci exit=$?"
	sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256
	mkdir -p tmp/probe
	git log --oneline -1
	git status --short
done
