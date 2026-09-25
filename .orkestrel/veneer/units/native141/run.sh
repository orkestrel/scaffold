#!/bin/bash
# Chromium 141 run of the engine session's J-NATIVE-PROBE round-3 file for E27 and E29 (the size rows decide
# J-COLLAPSE-SIZE, the V.* rows decide the anchors-visible cascade rule). Cuts the detached probe worktree
# /home/user/veneer-probe at Veneer origin/main, hardlinks node_modules, drops the Vite pre-bundle, copies the retained
# file, and runs it through the worktree's own srcBrowser project. Log: /home/user/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt (retained copy).
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
W=/home/user/veneer-probe
SRC=/home/user/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts
LOG=/home/user/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt (retained copy)
cd /home/user/veneer || exit 1
git fetch -q origin main || exit 1
[ "$(git rev-parse HEAD:package-lock.json)" = "$(git rev-parse origin/main:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
if [ ! -d $W ]; then git worktree add -q --detach $W origin/main && cp -al /home/user/veneer/node_modules $W/node_modules || exit 1; fi
rm -rf $W/node_modules/.vite
mkdir -p $W/tmp/probe && cp $SRC $W/tmp/probe/j-native-probe-3.test.ts
cd $W || exit 1
{
	echo "probe: the worktree copy sha256 $(sha256sum tmp/probe/j-native-probe-3.test.ts | cut -c1-64), retained $(sha256sum $SRC | cut -c1-64)"
	git log --oneline -1
	/opt/pw-browsers/chromium-1194/chrome-linux/chrome --version 2>/dev/null
	npx vitest run --config $S/native141/vite.probe-141.config.ts --root $W --reporter=verbose tmp/probe/j-native-probe-3.test.ts
	echo "exit=$?"
} > $LOG 2>&1
tail -3 $LOG
