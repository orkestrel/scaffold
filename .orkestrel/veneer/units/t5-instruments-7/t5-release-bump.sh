#!/bin/bash
# t5-release-bump.sh: bumps orkestrel/test to 0.0.24 at /home/user/test after the T5 round-5 landing commit, per
# .agents/skills/orkestrel-publish/references/wave.md. Derived from t4-release-bump-3.run.sh: the registry must serve
# 0.0.23, the bump targets 0.0.24, and the self-pin sweep searches 0.0.23. No @orkestrel range moves (Test pins
# contract ^0.0.18, guide ^0.0.20, probe ^0.0.16, scaffold ^0.0.77, each the registry's version on 2026-09-24), so no re-pin commit.
# Installs, sweeps the self-pins, runs prepublishOnly to green, and writes the release commit. The push and the upload
# are the Orchestrator's separate steps. Refuses a dirty tree. Log: t5-release-bump.log.txt
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/t5-release-bump.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/test || exit 1
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; exit 2; }
served=$(npm view @orkestrel/test version 2>/dev/null)
echo "=== npm $(npm --version) HEAD $(git rev-parse --short HEAD) registry @orkestrel/test@$served" >> $LOG
[ "$served" = "0.0.23" ] || { echo "=== the registry serves $served, not 0.0.23; refusing" >> $LOG; exit 3; }
step "npm version 0.0.24" npm version 0.0.24 --no-git-tag-version --ignore-scripts
step "install" npm install --ignore-scripts
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
echo "=== manifest $(node -p "require('./package.json').version"); lockfile root $(node -p "require('./package-lock.json').version"); lockfile package $(node -p "require('./package-lock.json').packages[''].version")" >> $LOG
echo "=== self-pin sweep: grep -rn 0.0.23 over tests/ and src/ (*.ts, *.json)" >> $LOG
grep -rn --include='*.ts' --include='*.json' '0\.0\.23' tests src >> $LOG 2>&1; echo "=== self-pin sweep exit=$? (1 = no hit)" >> $LOG
step "prepublishOnly" npm run prepublishOnly
echo "=== status before the release commit: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
git add package.json package-lock.json && git commit -q -m "Release 0.0.24" -m "The releasePointer function parks the pointer at (-1, -1), outside the runner page's viewport, so no staging, scroll, or offset a capture takes puts content under it. The capture's park-point avoidance is removed: computeOffset keeps only the window-fit move, and captureFrame keeps no ancestor walk and one scroll restore after the pane's release." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== release commit $(git rev-parse --short HEAD) status: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== bump done" >> $LOG
