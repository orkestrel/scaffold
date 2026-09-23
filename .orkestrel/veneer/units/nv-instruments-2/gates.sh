#!/bin/bash
# Runs the NAV unit's gates, cheap first, in the validation copy tmp/probe/base (c3ac297 plus the owned files and the shared patch).
# Each gate writes its own log beside this script: gate-<name>.log.txt, ending in exit=<code>.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
I=/home/user/veneer-nv/tmp/units/nv-instruments-2
cd /home/user/veneer-nv/tmp/probe/base || exit 1
step() { local name=$1; shift; echo "=== $* ($(date -u +%H:%M:%S))" > "$I/gate-$name.log.txt"; "$@" >> "$I/gate-$name.log.txt" 2>&1; echo "exit=$?" >> "$I/gate-$name.log.txt"; tail -1 "$I/gate-$name.log.txt" | sed "s/^/$name /"; }
for g in ${GATES:-format lint check build setup styles sections conformance guides policy}; do
  case $g in
    format) step format npm run format:check ;;
    lint) step lint npm run lint:check ;;
    check) step check npm run check ;;
    build) step build npm run build:src ;;
    setup) step setup npm run test:setup ;;
    styles) step styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/nav.test.ts ;;
    sections) step sections npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts ;;
    conformance) step conformance npm run test:conformance ;;
    guides) step guides npm run test:guides ;;
    policy) step policy npm run test:policy ;;
  esac
done
echo done
