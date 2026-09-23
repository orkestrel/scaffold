#!/usr/bin/env bash
# Runs every gate the brief names on the validation copy, one after another, one log per gate, and
# records each command, its exit code, and its result line in summary.txt.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
L=/home/user/veneer-ca/tmp/units/ca-instruments-2/logs/gates
mkdir -p $L
cd /home/user/veneer-ca/tmp/probe/base
FILES="src/styles/components/_carousel.scss src/styles/index.scss tests/src/styles/components/carousel.test.ts app/browser/sections/CarouselSection.ts tests/app/browser/sections/CarouselSection.test.ts app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts tests/setup.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts guides/veneer.md"
LINTFILES=$(echo $FILES | tr ' ' '\n' | grep '\.ts$' | tr '\n' ' ')
run() {
	local name=$1; shift
	"$@" > $L/$name.log.txt 2>&1
	local code=$?
	local tally
	tally=$(sed 's/\x1b\[[0-9;]*m//g' $L/$name.log.txt | grep -E '^\s+Tests |^# (pass|fail)|^ℹ (pass|fail)' | sed 's/^ *//' | tr '\n' ' ')
	echo "$name exit=$code $tally| $*" >> $L/summary.txt
}
: > $L/summary.txt
run scoped-format npx oxfmt --config .oxfmtrc.json --check $FILES
run scoped-lint npx oxlint --config .oxlintrc.json --deny-warnings $LINTFILES
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts
run app npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run guides npm run test:guides
run policy npm run test:policy
run setup npm run test:setup
run conformance npm run test:conformance
echo DONE >> $L/summary.txt
