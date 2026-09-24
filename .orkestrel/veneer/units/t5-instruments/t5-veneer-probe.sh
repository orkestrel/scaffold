#!/bin/bash
# T5 consumer probe: Veneer 82e1120 against @orkestrel/test packed from /home/user/test-tf (T5 over 80c419e).
# Packs with scripts skipped (dist/ is the T5 build the Orchestrator ran at 16:45), extracts the tarball over
# node_modules/@orkestrel/test in a probe worktree (the registry copy it replaces is 0.0.23), and runs the
# light-390 capture journey. Never touches /home/user/veneer or /home/user/test-tf's tree.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-t5probe
LOG=$S/t5-veneer-probe.log.txt
: > $LOG
mkdir -p $S/t5-pack && cd /home/user/test-tf && npm pack --ignore-scripts --pack-destination $S/t5-pack >> $LOG 2>&1 || { echo "pack failed" >> $LOG; exit 1; }
T=$(ls $S/t5-pack/orkestrel-test-*.tgz | head -1); echo "tarball $T $(sha256sum $T | cut -c1-16)" >> $LOG
cd /home/user/veneer && git worktree add -q --detach $P 82e1120 && cp -al /home/user/veneer/node_modules $P/node_modules
echo "replaced $(node -p "require('$P/node_modules/@orkestrel/test/package.json').version") (registry)" >> $LOG
rm -rf $P/node_modules/@orkestrel/test && mkdir -p $P/node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C $P/node_modules/@orkestrel/test
grep -c "will-change:transform" $P/node_modules/@orkestrel/test/dist/src/browser/index.js >> $LOG
cd $P && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-390" > $S/t5-veneer-journey.log.txt 2>&1
echo "journey exit=$?" >> $LOG
grep -E "Tests |FAIL|AssertionError|Error:" $S/t5-veneer-journey.log.txt | head -20 >> $LOG
echo "=== done" >> $LOG
