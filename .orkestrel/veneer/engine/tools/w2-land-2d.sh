#!/usr/bin/env bash
# Successor of w2-land-2c.sh (2026-09-25): the integration gates are the kickoff brief's acceptance item 5 list exactly
# (format:check, lint:check, check, build, test, test:service), because w2-land-2c.sh ran each project's gate but never
# `npm run test` or `npm run test:service` (units/rebaseline-0925-exit.md). `test` covers guides, policy, setup, conformance,
# app, and journey. The merge handling and the `hold` argument are unchanged. Usage: bash w2-land-2d.sh <unit> [hold]
set -u
UNIT="$1"
HOLD="${2:-}"
S="$(dirname "$0")"
LOG="$S/w2-land-2d-$UNIT.log.txt"
: > "$LOG"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
cd "$TREE" || exit 1
{
	echo "# J-${UNIT^^} landing, step 2: the merge commit, the kickoff gates, the fast-forward (2026-09-25)"
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
	for step in format:check lint:check check build test test:service; do
		npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && FAIL=1
	done
	if [ "$FAIL" -ne 0 ]; then echo "a gate is red; the fast-forward is not run"; exit 71; fi
	if [ "$HOLD" = "hold" ]; then echo "every gate green; the fast-forward is held for the audit (w2-land-3.sh)"; exit 0; fi
	bash "$S/w2-land-3.sh" "$UNIT"
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|unmerged\|stopped\|refused\|red;\|held\|moved" | head -60
