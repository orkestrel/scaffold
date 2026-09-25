#!/usr/bin/env bash
# Integrates J-MOTION-PROOFS-B round 1's report-only patches (2026-09-25): the guide's § Toast, the ToastInterface
# @returns remarks, and the showcase toast case that waits for the completion events. It applies the exact patches,
# checks format, lint, and types, runs the guides project and the showcase file, and commits. Usage: bash
# integrate-motion-proofs-b-1.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b
LOG=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-b-integration-1.log.txt
cd "$TREE" || exit 1
{
	echo "# J-MOTION-PROOFS-B round 1 integration (2026-09-25), over $(git log --oneline -1)"
	T=tmp/j-motion-proofs-b
	git apply "$T/veneer.md.patch" "$T/types.ts.patch" "$T/EngineSection.test.ts.patch"; echo "apply exit=$?"
	git status --short
	npm run format:check; echo "format:check exit=$?"
	npm run lint:check; echo "lint:check exit=$?"
	npm run check; echo "check exit=$?"
	npm run test:guides; echo "test:guides exit=$?"
	npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/EngineSection.test.ts; echo "EngineSection exit=$?"
	git add -- guides/veneer.md src/browser/types.ts tests/app/browser/sections/EngineSection.test.ts
	git commit -q -F "$MESSAGE"; echo "commit exit=$?"
	git log --oneline -2
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Test Files|Tests  |^[0-9a-f]{7} | M |^M " | head -20
