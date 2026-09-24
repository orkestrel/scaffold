#!/usr/bin/env bash
# The Orchestrator's re-run of the J-SANITIZER-CONTEXT round-2 instrument (commit 85c04ac), with its own
# digests of every browser source and test before and after, and the ConfigSanitizer file alone once on
# the source. The audit lane reads the commit through `git show`, so the plants never reach it.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer-context
LOG="$U/j-sanitizer-context-mutations-2-orchestrator.log.txt"
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's re-run of the J-SANITIZER-CONTEXT round-2 mutations (2026-09-24, Chromium 153.0.8010.12), worktree at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-sanitizer-context/mutations.py | cut -c1-64); b=$(sha256sum "$U/j-sanitizer-context-mutations-2.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS"; exit 3; fi
	find src/browser tests/src/browser -type f -name '*.ts' -print0 | sort -z | xargs -0 sha256sum > "$S/replay-sanitizer-context-2-before.sha256"
	npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/sanitizers/ConfigSanitizer.test.ts tests/src/browser/index.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Test Files|Tests |FAIL"
	echo "source run exit=${PIPESTATUS[0]}"
	python tmp/j-sanitizer-context/mutations.py < /dev/null
	echo "instrument exit=$?"
	sha256sum -c "$S/replay-sanitizer-context-2-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$LOG" 2>&1
grep -n "instrument\|Tests \|restored\|DIFFER\|red\|surviv\|exit=" "$LOG" | cut -c1-180 | head -40
