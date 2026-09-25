#!/usr/bin/env bash
# Reads whether a styles test file is red on Veneer origin/main itself (2026-09-25), in the detached probe worktree: it
# fast-forwards the worktree to origin/main, reinstalls only when the lockfile moved, builds the styles, and runs the file
# through the styles configuration. Usage: bash main-red-check.sh <test-file> ; the log lands in units/.
set -u
FILE="$1"
T=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe
LOG=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/main-red-check-$(basename "$FILE" .ts).log.txt
cd "$T" || exit 1
{
	git fetch -q origin
	before=$(git rev-parse HEAD:package-lock.json)
	git merge --ff-only -q origin/main; echo "ff exit=$?"
	git log --oneline -1
	if [ "$before" != "$(git rev-parse HEAD:package-lock.json)" ]; then npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"; sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256; else echo "lockfile unchanged"; fi
	rm -rf node_modules/.vite
	npm run build:src:styles > /dev/null 2>&1; echo "build:src:styles exit=$?"
	NO_COLOR=1 npx vitest run --config configs/src/vite.styles.config.ts --no-cache "$FILE" 2>&1 | sed 's/\x1b\[[0-9;]*m//g'
	echo "vitest exit=${PIPESTATUS[0]}"
	git status --short
} > "$LOG" 2>&1
grep -E "ff exit|lockfile|npm ci|build:src|Test Files|Tests  |FAIL|vitest exit|^[0-9a-f]{7} " "$LOG" | cut -c1-220
