#!/bin/bash
# veneer-021.sh: after @orkestrel/contract 0.0.18 and @orkestrel/test 0.0.21 are on the registry, re-pin Veneer's session
# branch to both in one commit (test depends on the contract at runtime, so one commit keeps a single contract copy; the
# engine session's J-BINDER follow-up owns the `isInstance` call sites) and verify the wave-2
# landings (UTIL-PLACEMENT ac96f81, NAVBAR 009b95a, the specimen band 5d7f3b9) with the repaired harness. Derived from
# verify-upl.sh, refresh-upl.sh, regen-upl.sh, and main-upl-gates.sh. Refuses a dirty tree and a registry that does not
# serve test 0.0.21 and contract 0.0.18. Steps: the re-pin (package.json range, npm install, the lock marker, the re-pin commit); the refresh
# (build:src, conformance, setup, app); the portfolio regeneration, one variant at a time, then the plain journey; the
# authoritative chain. Stops at the first red step. Log: veneer-021.log.txt (copied to units at the end).
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
LOG=$S/veneer-021.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer || exit 1
finish() { echo "=== veneer-021 done ($(date -u +%H:%M:%S))" >> $LOG; cp $LOG $U/veneer-021.log.txt; exit $1; }
gate() { echo "=== $1 ($(date -u +%H:%M:%S))" >> $LOG; timeout 1500 npm run $1 >> $LOG 2>&1; local code=$?; echo "=== $1 exit=$code ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $1" >> $LOG; finish $code; }; }
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; finish 2; }
served=$(npm view @orkestrel/test version 2>/dev/null)
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) registry @orkestrel/test@$served @orkestrel/contract@$(npm view @orkestrel/contract version 2>/dev/null)" >> $LOG
[ "$served" = "0.0.21" ] || { echo "=== the registry serves $served, not 0.0.21; refusing" >> $LOG; finish 3; }
[ "$(npm view @orkestrel/contract version 2>/dev/null)" = "0.0.18" ] || { echo "=== the registry does not serve contract 0.0.18; refusing" >> $LOG; finish 4; }
python3 - >> $LOG 2>&1 <<'PY'
import json
p = json.load(open('package.json'))
for group in ('dependencies', 'devDependencies'):
    for name, version in (('@orkestrel/test', '0.0.21'), ('@orkestrel/contract', '0.0.18')):
        if name in p.get(group, {}):
            print(f'{group} {name}: {p[group][name]} -> ^{version}'); p[group][name] = '^' + version
open('package.json', 'w').write(json.dumps(p, indent='\t') + '\n')
PY
echo "=== npm install ($(date -u +%H:%M:%S))" >> $LOG; npm install --ignore-scripts >> $LOG 2>&1; code=$?; echo "=== npm install exit=$code" >> $LOG; [ $code -eq 0 ] || finish $code
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
echo "=== installed test $(node -p "require('./node_modules/@orkestrel/test/package.json').version") contract $(node -p "require('./node_modules/@orkestrel/contract/package.json').version"); nested contract copies: [$(find node_modules -path '*/@orkestrel/contract/package.json' | tr '\n' ' ')]; status: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
npx oxfmt --write package.json >> $LOG 2>&1
git add package.json package-lock.json && git commit -q -m "Re-pin @orkestrel/test to 0.0.21 and @orkestrel/contract to 0.0.18 in one commit, so one contract copy installs" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== re-pin commit $(git rev-parse --short HEAD)" >> $LOG
for g in build:src test:conformance test:setup test:app; do gate $g; done
for v in light-1280 dark-1280 light-390 dark-390; do
  echo "=== capture $v ($(date -u +%H:%M:%S))" >> $LOG
  CAPTURE=1 timeout 1500 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$v*" >> $LOG 2>&1; code=$?
  echo "=== capture $v exit=$code ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
  [ $code -eq 0 ] || { echo "=== stopped at capture $v" >> $LOG; finish $code; }
done
echo "=== portfolio status: [$(git status --porcelain | wc -l) changed paths]" >> $LOG
for g in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do gate $g; done
echo "=== gates done ($(date -u +%H:%M:%S))" >> $LOG
finish 0
