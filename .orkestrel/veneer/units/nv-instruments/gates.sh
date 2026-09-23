#!/bin/bash
# Runs the nv unit's gates, cheap first, in the stage (main 72fdde4 plus the unit's owned files and shared patches). Log: nv-unit/gates.log.txt
SC=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$SC/npm11/node_modules/.bin:$PATH"
cd $SC/nv-stage || exit 1
LOG=$SC/nv-unit/gates.log.txt; : > $LOG
step() { echo "=== $* ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; echo "=== exit=$? :: $*" >> $LOG; }
step npm run format:check
step npm run lint:check
step npm run check
step npm run build:src
step npm run test:setup
step npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/nav.test.ts tests/src/styles/components/card.test.ts
step npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts
step npm run test:app
step npm run test:conformance
step npm run test:guides
step npm run test:policy
echo "=== done" >> $LOG
