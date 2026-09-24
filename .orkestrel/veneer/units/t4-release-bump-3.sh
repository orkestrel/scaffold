#!/bin/bash
# t4-release-bump-3.sh: successor of t4-release-bump-2.sh (TEST-REPIN), which never ran. Changed from it: the registry
# serves @orkestrel/test 0.0.21, so the refusal reads 0.0.21, the bump targets 0.0.22, the self-pin sweep searches
# 0.0.21, and the commit messages and log name 0.0.22. Otherwise as its predecessor: it refuses until the registry
# serves contract 0.0.18, re-pins every @orkestrel range to the registry caret in a preparation commit, bumps from what
# the registry serves, installs, sweeps the self-pins, runs prepublishOnly to green, and writes the release commit.
# The push and the upload are the Orchestrator's separate steps. Refuses a dirty tree. Log: t4-release-bump-3.log.txt
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/t4-release-bump-3.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/test || exit 1
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; exit 2; }
served=$(npm view @orkestrel/test version 2>/dev/null)
echo "=== npm $(npm --version) HEAD $(git rev-parse --short HEAD) registry @orkestrel/test@$served" >> $LOG
[ "$served" = "0.0.21" ] || { echo "=== the registry serves $served, not 0.0.21; refusing" >> $LOG; exit 3; }
contract=$(npm view @orkestrel/contract version 2>/dev/null)
echo "=== registry @orkestrel/contract@$contract" >> $LOG
[ "$contract" = "0.0.18" ] || { echo "=== the registry serves contract $contract, not 0.0.18; refusing" >> $LOG; exit 4; }
python3 - <<'PYIN' >> $LOG 2>&1
import json, subprocess
p = json.load(open('package.json'))
for group in ('dependencies', 'devDependencies', 'peerDependencies'):
    for name in list(p.get(group, {})):
        if name.startswith('@orkestrel/'):
            v = subprocess.run(['npm', 'view', name, 'version'], capture_output=True, text=True).stdout.strip()
            old = p[group][name]; p[group][name] = '^' + v
            print(f'{group} {name}: {old} -> ^{v}')
open('package.json', 'w').write(json.dumps(p, indent='\t') + '\n')
PYIN
step "install (re-pin)" npm install --ignore-scripts
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
if [ -n "$(git status --porcelain package.json package-lock.json)" ]; then
  npx oxfmt --write package.json >> $LOG 2>&1
  git add package.json package-lock.json && git commit -q -m "Re-pin @orkestrel/contract to 0.0.18 before the 0.0.22 release" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" && echo "=== re-pin commit $(git rev-parse --short HEAD)" >> $LOG
fi
step "npm version 0.0.22" npm version 0.0.22 --no-git-tag-version --ignore-scripts
step "install" npm install --ignore-scripts
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
echo "=== manifest $(node -p "require('./package.json').version"); lockfile root $(node -p "require('./package-lock.json').version"); lockfile package $(node -p "require('./package-lock.json').packages[''].version")" >> $LOG
echo "=== self-pin sweep: grep -rn 0.0.21 over tests/ and src/ (*.ts, *.json)" >> $LOG
grep -rn --include='*.ts' --include='*.json' '0\.0\.21' tests src >> $LOG 2>&1; echo "=== self-pin sweep exit=$? (1 = no hit)" >> $LOG
step "prepublishOnly" npm run prepublishOnly
echo "=== status before the release commit: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
git add package.json package-lock.json && git commit -q -m "Release 0.0.22" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== release commit $(git rev-parse --short HEAD) status: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== bump done" >> $LOG
