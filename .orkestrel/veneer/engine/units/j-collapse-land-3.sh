#!/usr/bin/env bash
# J-COLLAPSE landing, step 2 of 3, after collapse-resolve-guide.py resolved the guide conflict: re-pads
# the guide with the formatter, commits the merge, reinstalls from the merged lockfile, and runs the
# integration gates read-only in the worktree. Step 3 is collapse-land-4.sh (the fast-forward).
set -u
S="$(dirname "$0")"
LOG="$S/collapse-land-3.log"
: > "$LOG"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse
cd "$TREE" || exit 1
{
	echo "# J-COLLAPSE landing, step 2: the merge commit and the integration gates (2026-09-24)"
	npx oxfmt --config .oxfmtrc.json --write guides/veneer.md; echo "oxfmt write exit=$?"
	git add -- guides/veneer.md
	echo "unmerged: $(git diff --name-only --diff-filter=U | tr '\n' ' ')"
	git commit --no-edit; echo "merge commit exit=$?"
	git log --oneline -3
	npm ci --ignore-scripts; echo "npm ci exit=$?"
	git status --short
	echo "--- integration gates (read-only, in the worktree)"
	npm run format:check; echo "format:check exit=$?"
	npm run lint:check; echo "lint:check exit=$?"
	npm run check; echo "check exit=$?"
	npm run test:guides; echo "test:guides exit=$?"
	npm run test:policy; echo "test:policy exit=$?"
	npm run test:src:browser; echo "test:src:browser exit=$?"
	npm run build:src:core; echo "build:src:core exit=$?"
	npm run build:src:styles; echo "build:src:styles exit=$?"
	npm run build:src:browser; echo "build:src:browser exit=$?"
	npm run test:conformance; echo "test:conformance exit=$?"
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|unmerged\|^[0-9]*:[ AMU?][ AMDU?] " | head -50
