#!/bin/bash
# E-RECEIPTS early reading: builds Veneer main b1d314d in the detached worktree /home/user/veneer-read and runs the
# distribution proof in release mode, the publish gate's mode. Logs to this folder as <step>.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
cd /home/user/veneer-read || exit 1
echo "head $(git rev-parse --short HEAD)"
npm run build > "$S/receipts-read/build.log.txt" 2>&1; echo "build exit=$?"
npm run test:distribution -- --mode release > "$S/receipts-read/distribution-release.log.txt" 2>&1; echo "distribution release exit=$?"
echo done
