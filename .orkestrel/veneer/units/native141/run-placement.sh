#!/bin/bash
# Chromium 141 run of the engine session's J-PLACEMENT-141-PROBE file (units/j-placement-141-probe.test.ts, SHA-256
# 28e0cd12…), which decides why a scroller-resident dropdown menu does not anchor on Chromium 141. Derived from run.sh:
# the probe worktree /home/user/veneer-probe moves, detached, to Veneer origin/main (21c821a, which carries the engine's
# 094a71e the 153 run read), the retained file is copied in, and it runs through the worktree's own srcBrowser project
# with vite.probe-141.config.ts. Log: $S/native141/j-placement-141-probe-141.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
W=/home/user/veneer-probe
SRC=/home/user/scaffold/.orkestrel/veneer/engine/units/j-placement-141-probe.test.ts
LOG=$S/native141/j-placement-141-probe-141.log.txt
cd /home/user/veneer || exit 1
git fetch -q origin main || exit 1
[ "$(git rev-parse 0865c67:package-lock.json)" = "$(git rev-parse origin/main:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
git -C $W checkout -q --detach origin/main || exit 3
rm -rf $W/node_modules/.vite
mkdir -p $W/tmp/probe && cp $SRC $W/tmp/probe/j-placement-141-probe.test.ts
cd $W || exit 1
{
	echo "probe: the worktree copy sha256 $(sha256sum tmp/probe/j-placement-141-probe.test.ts | cut -c1-64), retained $(sha256sum $SRC | cut -c1-64)"
	git log --oneline -1
	/opt/pw-browsers/chromium-1194/chrome-linux/chrome --version 2>/dev/null
	echo "loadavg: $(cat /proc/loadavg)"
	npx vitest run --config $S/native141/vite.probe-141.config.ts --root $W --reporter=verbose tmp/probe/j-placement-141-probe.test.ts
	echo "exit=$?"
	echo "loadavg: $(cat /proc/loadavg)"
} > $LOG 2>&1
tail -3 $LOG
