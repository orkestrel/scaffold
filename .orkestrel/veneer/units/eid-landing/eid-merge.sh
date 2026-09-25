#!/bin/bash
# Merges origin/main (the engine session's J-SNAPSHOT-SHARED, 6dd5034) into Veneer's session branch after the E-ID
# landing and fold, then runs the fast gates on the merge: format:check, lint:check, check, conformance, guides,
# policy, src:browser, and setup:browser. Stops at the first red; pushes nothing. Log: $S/eid-merge.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-merge.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
cd /home/user/veneer || exit 1
git fetch -q origin main
step "merge origin/main" git merge --no-ff origin/main -m "Merge origin/main (the engine session's J-SNAPSHOT-SHARED) into the styles session's branch" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== merged $(git rev-parse --short HEAD)" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "test:conformance" npm run test:conformance
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
step "test:src:browser" npm run test:src:browser
step "setup:browser" npm run test:setup:browser
echo "=== status: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
echo "=== eid merge done" >> $LOG
