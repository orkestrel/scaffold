#!/usr/bin/env bash
# Commits J-MOTION-PROOFS-B round 2 in its worktree, retains the round under units/ in the same action, then integrates
# its two report-only patches as a separate commit (2026-09-25):
# - r2-types.ts.patch rewords CarouselEventMap.slid's summary;
# - r2-EngineSection.test.ts.patch corrects one showcase comment.
# The integration runs format:check, lint:check, check, test:guides, and the showcase file before it commits.
# Usage: bash commit-motion-proofs-b-2.sh <round-message-file> <integration-message-file>
set -u
MESSAGE="$1"
INTEGRATION="$2"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-motion-proofs-b
LOG=$UNITS/j-motion-proofs-b-integration-2.log.txt
cd "$TREE" || exit 1
{
	echo "# J-MOTION-PROOFS-B round 2 commit and integration (2026-09-25), over $(git log --oneline -1)"
	git status --short > "$UNITS/j-motion-proofs-b-2-status.txt"
	git add -- guides/veneer.md src/browser/Carousel.ts tests/src/browser/Carousel.test.ts
	git commit -q -F "$MESSAGE"; echo "round commit exit=$?"
	git log --oneline -1
	git diff f03690f HEAD > "$UNITS/j-motion-proofs-b-2.diff"
	for f in r2-accept.sh r2-patches.sh r2-run.sh r2-wait.sh r2-mutations.json r2-types.ts.patch r2-EngineSection.test.ts.patch; do cp "$T/$f" "$UNITS/j-motion-proofs-b-$f"; done
	for f in r2-accept.log.txt r2-mutations.log.txt r2-plant-final.log.txt; do cp "$T/$f" "$UNITS/j-motion-proofs-b-$f"; done
	git apply "$T/r2-types.ts.patch" "$T/r2-EngineSection.test.ts.patch"; echo "apply exit=$?"
	git status --short
	npm run format:check; echo "format:check exit=$?"
	npm run lint:check; echo "lint:check exit=$?"
	npm run check; echo "check exit=$?"
	npm run test:guides; echo "test:guides exit=$?"
	npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/EngineSection.test.ts; echo "EngineSection exit=$?"
	git add -- src/browser/types.ts tests/app/browser/sections/EngineSection.test.ts
	git commit -q -F "$INTEGRATION"; echo "integration commit exit=$?"
	git log --oneline -3
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Tests  |^[0-9a-f]{7} | M " | head -24
