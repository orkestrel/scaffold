#!/bin/bash
# Round 2 of the TOGGLES unit. Runs the gates, cheap first, in the validation copy tmp/probe/base
# (a658879 plus the owned files and the shared edits). Each gate writes its own log under logs/
# beside this script: gate-<name>.log.txt, ending in exit=<code>. GATES selects a subset. Changed from
# the round-1 gates.sh: the log directory, the scoped setup gate over tests/setupStyles.test.ts, and
# the test:setup gate dropped for the scoped one the round-2 brief names.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
I=/home/user/veneer-tg/tmp/units/tg-instruments-2/logs
cd /home/user/veneer-tg/tmp/probe/base || exit 1
step() { local name=$1; shift; echo "=== $* ($(date -u +%H:%M:%S))" > "$I/gate-$name.log.txt"; "$@" >> "$I/gate-$name.log.txt" 2>&1; echo "exit=$?" >> "$I/gate-$name.log.txt"; tail -1 "$I/gate-$name.log.txt" | sed "s/^/$name /"; }
for g in ${GATES:-format lint check build setup styles sections conformance guides policy}; do
  case $g in
    format) step format npm run format:check ;;
    lint) step lint npm run lint:check ;;
    check) step check npm run check ;;
    build) step build npm run build:src ;;
    setup) step setup npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts ;;
    styles) step styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts ;;
    sections) step sections npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts ;;
    conformance) step conformance npm run test:conformance ;;
    guides) step guides npm run test:guides ;;
    policy) step policy npm run test:policy ;;
  esac
done
echo done
