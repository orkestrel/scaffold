#!/usr/bin/env bash
# Builds the fresh copy of e4e6a40 as a git repository, lays the owned files over it, checks and
# applies the shared-file patch and the unlisted-file patch, runs the gates in order, logging each
# exit and result line, then reverses both patches and checks the shared patch again at the base.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
W=/home/user/veneer-upl
F=$W/tmp/probe/fresh
L=$W/tmp/units/upl-instruments-4/logs
S=$W/tmp/units/upl-shared-4.patch
U=$W/tmp/units/upl-unlisted-4.patch
COPY=fresh bash "$W/tmp/units/upl-instruments-4/tools/stage.sh" || exit 1
cd "$F"
git apply --check "$S"; echo "apply-check shared at base exit=$?"
git apply --check "$U"; echo "apply-check unlisted at base exit=$?"
git apply "$S"; echo "apply shared exit=$?"
git apply "$U"; echo "apply unlisted exit=$?"
run() {
	local name=$1; shift
	"$@" > "$L/fresh-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code :: $(sed 's/\x1b\[[0-9;]*m//g' "$L/fresh-$name.log.txt" | grep -E 'Tests +[0-9]|All matched|Format issues|Found [0-9]+ (warning|error)|passed|failed' | tail -1)"
}
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts
run setup-styles npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run service sh -c 'npm run build:src:styles && npm run test:service'
run guides npm run test:guides
run policy npm run test:policy
run setup npm run test:setup
run setup-browser npm run test:setup:browser
git apply -R "$U"; echo "reverse unlisted exit=$?"
git apply -R "$S"; echo "reverse shared exit=$?"
git diff --quiet -- . ':!app/browser/styles/_shell.scss'; echo "tracked files other than the owned shell partial at base exit=$?"
git apply --check "$S"; echo "apply-check shared after return to base exit=$?"
git apply --check "$U"; echo "apply-check unlisted after return to base exit=$?"
git apply "$S"; git apply "$U"; echo "reapplied for the mutation runs exit=$?"
