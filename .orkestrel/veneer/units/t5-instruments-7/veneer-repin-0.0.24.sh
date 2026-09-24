#!/bin/bash
# Veneer re-pin to @orkestrel/test ^0.0.24 and the RP landing, the Orchestrator's tracked command. Derived from
# veneer-repin-0.0.20.sh: the registry must serve 0.0.24; the install, npm ci, lock marker, and a fresh `.vite` directory
# (a same-version swap leaves a stale pre-bundle); the installed browser bundle must equal Test's built one at 960dd75;
# the re-pin commit; then rp-3.diff (accepted in rp-audit-3-verdict.md), the fast gates, setup, setup:browser, guides,
# and the whole journey projects on the re-pinned tree; then the RP commit. Refuses a dirty tree. Stops at the first red.
# Log: veneer-repin-0.0.24.log.txt. Cap: 3000 s.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/veneer-repin-0.0.24.log.txt; : > $LOG
U=/home/user/scaffold/.orkestrel/veneer/units
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer || exit 1
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; exit 2; }
served=$(npm view @orkestrel/test version 2>/dev/null)
echo "=== npm $(npm --version) HEAD $(git rev-parse --short HEAD) registry @orkestrel/test@$served range $(node -p "require('./package.json').devDependencies['@orkestrel/test']")" >> $LOG
[ "$served" = "0.0.24" ] || { echo "=== the registry serves $served, not 0.0.24; refusing" >> $LOG; exit 3; }
step "install ^0.0.24" npm install --save-dev --ignore-scripts --no-audit --no-fund '@orkestrel/test@^0.0.24'
step "npm ci" npm ci --ignore-scripts
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
rm -rf node_modules/.vite
echo "=== installed $(node -p "require('./node_modules/@orkestrel/test/package.json').version"); marker $(cut -c1-16 node_modules/.orkestrel-lock.sha256)" >> $LOG
step "installed browser bundle equals Test 960dd75's build" cmp node_modules/@orkestrel/test/dist/src/browser/index.js /home/user/test/dist/src/browser/index.js
git add package.json package-lock.json && git commit -q -m "Re-pin @orkestrel/test to 0.0.24" -m "The release parks the released pointer at (-1, -1), outside the runner page's viewport, frames an element at its own edge, and names the frame's size when it refuses to decode one." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== re-pin commit $(git rev-parse --short HEAD) status: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
step "apply rp-3.diff" git apply --3way $U/rp-3.diff
echo "=== RP diff: $(git diff --stat | tail -1)" >> $LOG
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "test:setup" npm run test:setup
step "test:setup:browser" npm run test:setup:browser
step "test:guides" npm run test:guides
step "test:journey (every variant)" npm run test:journey
git add tests/app/browser/integration.test.ts tests/setup.ts tests/setupBrowser.ts guides/veneer.md && git commit -q -m "State the pointer park at each padding site, and prove no parked pointer enters an origin-touching copy" -m "The release in 0.0.24 parks the pointer outside the page. The padding comments and the guide now state the padding's gutter role and the park in separate sentences, and a journey case lifts an unpadded copy whose box touches the document's origin, stages the pane after the release, and asserts no mouseover event reaches it. The case fails on 0.0.23 (rp-control-4)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== RP commit $(git rev-parse --short HEAD) status: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== repin done" >> $LOG
