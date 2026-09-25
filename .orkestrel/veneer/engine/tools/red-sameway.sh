#!/usr/bin/env bash
# The Orchestrator's own red-first reading for J-SAMEWAY (622181f): in the integration worktree, write the
# base 4b62bca bytes of the four sources the unit changed, run the unit's three owned test files at 622181f,
# restore the unit's bytes, and check each digest. No unit writes in the worktree while it runs.
set -u
T=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$U/j-sameway-red-orchestrator.log.txt
S=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-sameway
cd "$T" || exit 1
mkdir -p "$S"
FILES="src/browser/Modal.ts src/browser/Offcanvas.ts src/browser/Backdrop.ts src/browser/types.ts"
{
	echo "# The Orchestrator's red reading of J-SAMEWAY's cases on the base 4b62bca sources (2026-09-24, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$S/digests.txt"
	for f in $FILES; do cp "$f" "$S/$(basename "$f")"; git show "4b62bca:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL " | head -40
	for f in $FILES; do cp "$S/$(basename "$f")" "$f"; done
	sha256sum -c "$S/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$LOG" 2>&1
cat "$LOG" | cut -c1-200 | tail -25
