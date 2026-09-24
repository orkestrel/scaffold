#!/bin/bash
# contract-release-gates.sh: prove @orkestrel/contract 0.0.18 at 014c2d2 in this container before the upload:
# npm ci from the lockfile, the package's own prepublishOnly chain, then npm pack into tmp/contract and the tarball's
# shasum beside the engine session's recorded one (a1ece65b606e4d3d055c3f7d9b676629c1a3ab8c, its Windows pack).
# Log: /home/user/scaffold/.orkestrel/contract/units/release-2-gates.log.txt
LOG=/home/user/scaffold/.orkestrel/contract/units/release-2-gates.log.txt; : > $LOG
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/contract || exit 1
[ "$(git rev-parse --short HEAD)" = "014c2d2" ] || { echo "=== HEAD is not 014c2d2; refusing" >> $LOG; exit 2; }
echo "=== start $(date -u +%T) npm $(npm --version) node $(node --version)" >> $LOG
npm ci --ignore-scripts >> $LOG 2>&1; echo "=== npm ci exit=$? $(date -u +%T)" >> $LOG
npm run prepublishOnly >> $LOG 2>&1; echo "=== prepublishOnly exit=$? $(date -u +%T)" >> $LOG
npm pack --pack-destination /home/user/scaffold/tmp/contract >> $LOG 2>&1; echo "=== pack exit=$? $(date -u +%T)" >> $LOG
sha1sum /home/user/scaffold/tmp/contract/orkestrel-contract-0.0.18.tgz >> $LOG 2>&1
git status --porcelain >> $LOG 2>&1; echo "=== status read; done $(date -u +%T)" >> $LOG
