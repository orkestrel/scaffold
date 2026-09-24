#!/bin/bash
# AP-COLOR runner: runs one npm script or command with npm 11 and the Playwright browsers on PATH, logging to tmp/units/<name>.log.txt.
# Usage: apc-run.sh <log-name> <command...>
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-apc || exit 1
NAME=$1; shift
LOG=tmp/units/$NAME.log.txt
echo "=== $* ($(date -u +%H:%M:%S)) HEAD $(git rev-parse --short HEAD)" > $LOG
"$@" >> $LOG 2>&1; CODE=$?
echo "=== exit=$CODE ($(date -u +%H:%M:%S))" >> $LOG
exit $CODE
