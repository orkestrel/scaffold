#!/usr/bin/env bash
# J-HELPERS acceptance chain, run from the worktree root with Git Bash. Each step writes its whole
# output to its own log under tmp/j-helpers/ and the chain prints one exit line per step; a red step
# does not stop the steps after it, so every reading is taken.
cd "$(dirname "$0")/../.." || exit 1
LOGS=tmp/j-helpers

step() {
	local name=$1
	shift
	"$@" > "$LOGS/acceptance-$name.log.txt" 2>&1
	echo "$name exit=$?"
}

step chromium node --experimental-strip-types tmp/j-helpers/chromium.ts
step check npm run check:src:browser
step lint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step format npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step grep-retired grep -rn "isDisabled" src tests guides
step grep-walks grep -rn "previousElementSibling\|nextElementSibling\|:scope \|innerWidth - documentElement.clientWidth" src/browser
step grep-disabled grep -rn "getAttribute('disabled')\|, :disabled" src/browser
step grep-removed grep -rn "#closest(\|#readModal(\|#list(" src
step browser npm run test:src:browser
step guides npm run test:guides
step policy npm run test:policy
step build-core npm run build:src:core
step build-styles npm run build:src:styles
step build-browser npm run build:src:browser
step conformance npm run test:conformance
step setup npm run test:setup
