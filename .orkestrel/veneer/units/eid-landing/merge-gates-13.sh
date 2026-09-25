#!/bin/bash
# Runs the gates over the session branch after merging the engine's J-RELEASE-CORE landing (b8c6a08) into the
# MODAL and FACTOR landing, which merge-gates-12.sh read green over the J-MOTION-PROOFS-B merge. Successor to
# merge-gates-12.sh. What changed: the subject, the log, and the done line, and the project set: J-RELEASE-CORE changes
# src/browser/** and tests/src/browser/** and the guide's engine sections only, so the whole-tree checks, the guide and
# policy proofs, the src:browser files it moved, and app:browser run. The log is $S/merge-gates-13.log.txt; nothing is
# pushed here.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/merge-gates-13.log.txt; : > $LOG
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
step "src:browser (moved files)" npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Button.test.ts tests/src/browser/HostSnapshot.test.ts tests/src/browser/Lifetime.test.ts tests/src/browser/helpers.test.ts tests/src/browser/index.test.ts
step "app:browser" npx vitest run --config vite.config.ts --no-cache --project app:browser
echo "=== merge gates 13 done ($(date -u +%H:%M:%S))" >> $LOG
