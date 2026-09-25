#!/bin/bash
# Runs the gates over the session branch after merging the engine's J-ORACLE-RECORD landing (63eabbd) into the
# E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES landing. Successor to merge-gates-9.sh. What changed: the subject, the
# log, and the done line, and the styles project joins the set, because the engine's third standing row (the `.btn`
# form case of button.test.ts) closes on this merge; the whole-tree checks and every project whose files either side
# changed run as before. The log is $S/merge-gates-10.log.txt; nothing is pushed here.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/merge-gates-10.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
echo "=== head $(git rev-parse --short HEAD)" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "build:src" npm run build:src
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
step "test:setup" npm run test:setup
step "test:conformance" npm run test:conformance
step "test:src:styles" npm run test:src:styles
step "setup:browser" npx vitest run --config vite.config.ts --no-cache --project setup:browser
step "app:browser" npx vitest run --config vite.config.ts --no-cache --project app:browser
echo "=== merge gates 10 done ($(date -u +%H:%M:%S))" >> $LOG
