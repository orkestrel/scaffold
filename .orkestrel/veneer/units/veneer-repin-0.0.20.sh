#!/bin/bash
# Unit F9 VENEER-REPIN, the Orchestrator's tracked part: re-pin @orkestrel/test to the registry caret ^0.0.20, regenerate the
# lockfile, restore the registry copy with npm ci from the lockfile alone (no --no-save install), write the lock marker.
# Log: veneer-repin-0.0.20.log.txt. Cap: 900 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/veneer-repin-0.0.20.log.txt
NPM11=$SCR/npm11/node_modules/npm/bin/npm-cli.js
: > "$LOG"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/veneer || exit 1
step "before: range $(node -p "require('./package.json').devDependencies['@orkestrel/test']"), installed $(node -p "require('./node_modules/@orkestrel/test/package.json').version"), status $(git status --porcelain | tr '\n' ' ')"
step "npm install --save-dev @orkestrel/test@^0.0.20"; timeout 600 node "$NPM11" install --save-dev --ignore-scripts --no-audit --no-fund '@orkestrel/test@^0.0.20' >> "$LOG" 2>&1; step "install exit=$?"
step "after install: range $(node -p "require('./package.json').devDependencies['@orkestrel/test']"), lock resolved $(node -p "require('./package-lock.json').packages['node_modules/@orkestrel/test'].version") $(node -p "require('./package-lock.json').packages['node_modules/@orkestrel/test'].resolved")"
step "npm ci from the lockfile alone"; timeout 600 node "$NPM11" ci --ignore-scripts >> "$LOG" 2>&1; step "npm ci exit=$?"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
step "installed test $(node -p "require('./node_modules/@orkestrel/test/package.json').version"); driveHold declared: $(grep -c driveHold node_modules/@orkestrel/test/dist/src/browser/index.d.ts); marker $(cat node_modules/.orkestrel-lock.sha256 | cut -c1-16)"
step "status: $(git status --porcelain | tr '\n' ' '); diff: $(git diff --stat | tail -1)"
echo "=== pin done" >> "$LOG"
