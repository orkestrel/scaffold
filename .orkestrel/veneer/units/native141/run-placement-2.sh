#!/bin/bash
# Chromium 141 runs of the engine session's J-PLACEMENT-141-PROBE-2 file, requested in its plan.md at a checkout that
# holds d33b27c. Derived from native141/run.sh (the J-NATIVE-PROBE round-3 run): what changed is the probe file, the
# log names, and three runs, as the engine took on Chromium 153. Moves the detached probe worktree /home/user/veneer-probe
# to Veneer origin/main, hardlinks node_modules when absent, drops the Vite pre-bundle, copies the retained file, and runs
# it through the worktree's own srcBrowser project with vite.probe-141.config.ts. Logs:
# /home/user/scaffold/.orkestrel/veneer/units/native141/j-placement-141-probe-2-141-run-<n>.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
W=/home/user/veneer-probe
SRC=/home/user/scaffold/.orkestrel/veneer/engine/units/j-placement-141-probe-2.test.ts
OUT=/home/user/scaffold/.orkestrel/veneer/units/native141
cd /home/user/veneer || exit 1
git fetch -q origin main || exit 1
[ "$(git rev-parse HEAD:package-lock.json)" = "$(git rev-parse origin/main:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
[ -z "$(git -C $W status --porcelain -- . ':!tmp' ':!node_modules')" ] || { echo "probe worktree dirty"; exit 2; }
git -C $W checkout -q --detach origin/main || exit 1
git -C $W merge-base --is-ancestor d33b27c HEAD || { echo "probe worktree lacks d33b27c"; exit 2; }
rm -rf $W/node_modules/.vite
rm -rf $W/tmp/probe && mkdir -p $W/tmp/probe && cp $SRC $W/tmp/probe/j-placement-141-probe-2.test.ts
cd $W || exit 1
for n in 1 2 3; do
  LOG=$OUT/j-placement-141-probe-2-141-run-$n.log.txt
  {
    echo "probe: the worktree copy sha256 $(sha256sum tmp/probe/j-placement-141-probe-2.test.ts | cut -c1-64), retained $(sha256sum $SRC | cut -c1-64)"
    git log --oneline -1
    /opt/pw-browsers/chromium-1194/chrome-linux/chrome --version 2>/dev/null
    cat /proc/loadavg
    npx vitest run --config $S/native141/vite.probe-141.config.ts --root $W --reporter=verbose tmp/probe/j-placement-141-probe-2.test.ts
    echo "exit=$?"
  } > $LOG 2>&1
  tail -2 $LOG
done
