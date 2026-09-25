#!/bin/bash
# Runs the landing chain alone over Veneer's session branch for E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES.
# Successor to eid-land-10.sh, stopped after integration for a union read; the integration commit fixed the Additions
# cells and the reboot paragraph. What changed from eid-chain-8.sh: the log and done line name this script;
# the chain is unchanged.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-chain-10.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
TRAILER="Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
echo "=== head $(git rev-parse --short HEAD)" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "build:src" npm run build:src
step "test:src:styles" npm run test:src:styles
step "test:setup" npm run test:setup
step "test:conformance" npm run test:conformance
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
echo "=== src:browser against the 0865c67 baseline ($(date -u +%H:%M:%S))" >> $LOG
npm run test:src:browser > $S/eid-chain-10-src-browser.log.txt 2>&1; code=$?
grep -E '^ FAIL ' $S/eid-chain-10-src-browser.log.txt | sort -u > $S/eid-chain-10-src-browser.fail.txt
grep -E '^ FAIL ' $S/native141/src-browser-0865c67.log.txt | sort -u > $S/eid-chain-10-src-browser.base.txt
fresh=$(comm -23 $S/eid-chain-10-src-browser.fail.txt $S/eid-chain-10-src-browser.base.txt)
echo "=== src:browser exit=$code; $(tail -5 $S/eid-chain-10-src-browser.log.txt | grep -E 'Tests' | tr -s ' ')" >> $LOG
if [ -n "$fresh" ]; then echo "=== src:browser reds absent from the baseline:" >> $LOG; echo "$fresh" >> $LOG; echo "=== stopped at src:browser" >> $LOG; exit 5; fi
echo "=== src:browser: no red outside the baseline" >> $LOG
step "test:service" npm run test:service
step "build" npm run build
step "test:distribution" npm run test:distribution
step "app:browser" npx vitest run --config vite.config.ts --no-cache --project app:browser
step "setup:browser" npx vitest run --config vite.config.ts --no-cache --project setup:browser
step "journey, CAPTURE=1" env CAPTURE=1 npm run test:journey
step "journey, CAPTURE unset" npm run test:journey
echo "=== status after chain: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== eid chain 10 done" >> $LOG
