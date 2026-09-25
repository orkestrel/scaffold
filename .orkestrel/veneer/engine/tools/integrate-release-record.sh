#!/usr/bin/env bash
# Integrates J-RELEASE-RECORD's report-only shared-file patch (2026-09-25): applies the unit's exact returned
# tests/setupBrowser.ts patch in its worktree, then runs Dropdown.test.ts and the other five owned test files scoped,
# and the setup-browser proof. Usage: bash integrate-release-record.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
LOG=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-record-integrate.log.txt
cd "$TREE" || exit 1
{
	echo "# J-RELEASE-RECORD integration (2026-09-25) at $(git log --oneline -1)"
	git apply --check tmp/j-release-record/setupBrowser.patch; echo "apply check exit=$?"
	git apply tmp/j-release-record/setupBrowser.patch; echo "apply exit=$?"
	git diff --stat -- tests/setupBrowser.ts
	for f in Dropdown Collapse Toast Tab Carousel helpers; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/j-release-record/integrate-$f.log.txt" 2>&1
		echo "$f exit=$? $(sed 's/\x1b\[[0-9;]*m//g' "tmp/j-release-record/integrate-$f.log.txt" | grep -E 'Tests +[0-9]')"
	done
	npm run test:setup:browser > tmp/j-release-record/integrate-setup-browser.log.txt 2>&1
	echo "test:setup:browser exit=$? $(sed 's/\x1b\[[0-9;]*m//g' tmp/j-release-record/integrate-setup-browser.log.txt | grep -E 'Tests +[0-9]')"
} > "$LOG" 2>&1
cat "$LOG"
