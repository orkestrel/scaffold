#!/usr/bin/env bash
# The Orchestrator's replay of J-RELEASE-CORE round 1 at d702bb8 (2026-09-25). It runs:
# - whole-file runs of the five owned test files;
# - test:policy, test:guides, and test:setup:browser;
# - every row of the unit's committed mutate.mjs, with the error class of each failure counted from the vitest output;
# - Button.test.ts against 63eabbd's Button.ts, for the red reading of B1 and the nested drain;
# - a check that the source and the tree are clean afterwards.
# Usage: bash replay-release-core-1.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-release-core-replay-1.log.txt
cd "$TREE" || exit 1
{
	echo "# J-RELEASE-CORE round 1 replay (2026-09-25) at $(git log --oneline -1)"
	for f in Lifetime HostSnapshot helpers Button index; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay-$f.log.txt" 2>&1
		echo "$f whole-file exit=$? $(grep -E 'Tests +[0-9]' "tmp/replay-$f.log.txt")"
	done
	for step in test:policy test:guides test:setup:browser; do
		npm run "$step" > "tmp/replay-$step.log.txt" 2>&1; echo "$step exit=$?"
	done
	node tmp/j-release-core/mutate.mjs; echo "mutate exit=$?"
	cp tmp/j-release-core/mutations.log.txt tmp/replay-mutations.log.txt
	echo "--- per row: failing cases, and the error names in the row's output"
	awk '/^## /{row=$2} /^  ×/{fail[row]++} /AssertionError/{a[row]++} /TypeError|ReferenceError|SyntaxError/{o[row]++} /skipped$/{s[row]=1} END{for (r in fail) printf "%s failed=%d assertion=%d other=%d\n", r, fail[r], a[r], o[r]; for (r in s) printf "%s SKIPPED\n", r}' tmp/replay-mutations.log.txt | sort
	echo "--- rows that failed nothing"
	grep "^## " tmp/replay-mutations.log.txt | sed 's/^## \([^ :]*\).*/\1/' | while read -r row; do awk -v r="$row" '/^## /{cur=$2} cur==r && /^  ×/{n++} END{if (n==0) print r}' tmp/replay-mutations.log.txt; done
	echo "--- Button.test.ts against 63eabbd's Button.ts"
	cp src/browser/Button.ts tmp/Button.ts.head
	git show 63eabbd:src/browser/Button.ts > src/browser/Button.ts
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Button.test.ts > tmp/replay-button-base.log.txt 2>&1
	echo "base Button exit=$? $(grep -E 'Tests +[0-9]' tmp/replay-button-base.log.txt)"
	sed 's/\x1b\[[0-9;]*m//g' tmp/replay-button-base.log.txt | grep -E "^ +×|AssertionError|TypeError" | head -12
	cp tmp/Button.ts.head src/browser/Button.ts
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Tests|failed=|SKIPPED|^ +×|Error|^---|^ ?[MA?] |^#" | head -70
