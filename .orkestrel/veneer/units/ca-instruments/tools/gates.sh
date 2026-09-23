#!/usr/bin/env bash
# Runs every gate the brief names on the validation copy, one after another, and records each exit.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
T=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/ca/gates
mkdir -p $T
cd /home/user/veneer-ca/tmp/probe/base
FILES="src/styles/components/_carousel.scss src/styles/index.scss tests/src/styles/components/carousel.test.ts app/browser/sections/CarouselSection.ts tests/app/browser/sections/CarouselSection.test.ts app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts tests/setup.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts guides/veneer.md"
LINTFILES=$(echo $FILES | tr ' ' '\n' | grep '\.ts$' | tr '\n' ' ')
run() { local name=$1; shift; "$@" > $T/$name.log.txt 2>&1; local code=$?; local tally; tally=$(sed 's/\x1b\[[0-9;]*m//g' $T/$name.log.txt | grep -E '^\s+Tests ' | tail -1 | sed 's/^ *//'); echo "$name exit=$code $tally" >> $T/summary.txt; }
: > $T/summary.txt
run format npx oxfmt --config .oxfmtrc.json --check $FILES
run lint npx oxlint --config .oxlintrc.json --deny-warnings $LINTFILES
run check npm run check
run build npm run build:src
run carousel npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts
run close npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/close.test.ts
run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
run setup npm run test:setup
run app npm run test:app
node cascade-check.mjs expanded > $T/cascade-expanded.txt 2>&1
node cascade-check.mjs > $T/cascade-built.txt 2>&1
echo DONE >> $T/summary.txt
