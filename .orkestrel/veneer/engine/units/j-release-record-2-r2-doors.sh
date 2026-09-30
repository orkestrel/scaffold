#!/usr/bin/env bash
# Round 2: builds one mutant per door after a split write by deleting that door's lines, prints the
# deleted lines, and runs the engine's test file against the mutant through mutate.sh, which puts the
# unit's source back byte for byte.
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record || exit 1
mkdir -p tmp/j-release-record/mutants
run() {
	label="$1"
	engine="$2"
	range="$3"
	mutant="tmp/j-release-record/mutants/r2-door-$label.ts"
	sed "${range}d" "src/browser/$engine.ts" >"$mutant"
	echo "== $label: $engine.ts lines $range removed"
	sed -n "${range}p" "src/browser/$engine.ts"
	bash tmp/j-release-record/mutate.sh "r2-door-$label" "src/browser/$engine.ts" "$mutant" "tests/src/browser/$engine.test.ts"
}
run collapse-show Collapse 272,274
run collapse-hide Collapse 352,352
run toast-show Toast 215,215
run toast-hide Toast 281,281
run tab-pane Tab 248,248
run carousel-incoming Carousel 538,555
run carousel-outgoing Carousel 607,611
