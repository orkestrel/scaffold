#!/usr/bin/env bash
# Successor of w2-land-2b.sh (2026-09-24): reads whether the lockfile moved from the merge commit's
# first parent (w2-merge-main.sh commits a clean merge, so no MERGE_HEAD remains), and takes a `hold`
# argument that stops after the gates so an audit still running can gate the fast-forward, which
# w2-land-3.sh then runs. Usage: bash w2-land-2c.sh <unit> [hold]
set -u
UNIT="$1"
HOLD="${2:-}"
S="$(dirname "$0")"
LOG="$S/w2-land-2c-$UNIT.log.txt"
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
	if git rev-parse -q --verify MERGE_HEAD > /dev/null; then
		MOVED="$(git diff --name-only HEAD MERGE_HEAD -- package.json package-lock.json)"
		git commit --no-edit; echo "merge commit exit=$?"
	else
		MOVED="$(git diff --name-only HEAD^1 HEAD -- package.json package-lock.json)"
		echo "the merge is committed"
	fi
	echo "lockfile moved: [$MOVED]"
	git log --oneline -3
	if [ -z "$MOVED" ]; then echo "lockfile unchanged by the merge; no reinstall"; else npm install --ignore-scripts; echo "npm install exit=$?"; sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256; rm -rf node_modules/.vite; fi
	git status --short
	echo "--- integration gates (read-only, in the worktree)"
	FAIL=0
	# A unit that touches app/** or tests/setup* adds the app, journey, and app build gates (J-DEMOFIX, 2026-09-24).
	EXTRA=""; if [ -n "$(git diff --name-only main HEAD -- app tests/setup.ts tests/setupBrowser.ts tests/app)" ]; then EXTRA="test:app test:journey build:app"; fi; echo "extra gates: [$EXTRA]"
	for step in format:check lint:check check test:guides test:policy test:src:browser build:src:core build:src:styles build:src:browser test:conformance test:setup test:setup:browser $EXTRA; do
		npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && FAIL=1
	done
	if [ "$FAIL" -ne 0 ]; then echo "a gate is red; the fast-forward is not run"; exit 71; fi
	if [ "$HOLD" = "hold" ]; then echo "every gate green; the fast-forward is held for the audit (w2-land-3.sh)"; exit 0; fi
	bash "$S/w2-land-3.sh" "$UNIT"
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|unmerged\|stopped\|refused\|red;\|held\|moved" | head -60
