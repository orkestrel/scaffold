#!/bin/bash
# Successor of test-tip-vendor.sh. Change: the Test tip's lockfile does not satisfy its manifest
# (@types/node 26.6.1 vs 26.6.2), so the clone installs with `npm install` instead of `npm ci`; each
# step is guarded so a failed build never packs or installs. Log: test-tip-vendor-2.log.txt. Cap: 1800 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/test-tip-vendor-2.log.txt
NPM11=$SCR/npm11/node_modules/npm/bin/npm-cli.js
TARBALLS=/home/user/scaffold/tmp/tarballs
: > "$LOG"; mkdir -p "$TARBALLS"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
fail() { step "ABORT: $1"; echo "=== vendor chain done" >> "$LOG"; exit 1; }
cd /home/user/orkestrel/test || fail "no test clone"
step "test: HEAD $(git rev-parse HEAD)"
step "test: npm install"; timeout 600 npm install --ignore-scripts --no-audit --no-fund >> "$LOG" 2>&1 || fail "npm install failed"
step "test: lockfile drift after install: $(git status --porcelain | tr '\n' ' ')"
step "test: npm run build"; timeout 600 npm run build >> "$LOG" 2>&1 || fail "build failed"
grep -q 'stageMedia' dist/src/browser/index.d.ts || fail "built declarations lack stageMedia"
step "test: build declares stageMedia"
step "test: npm pack"; timeout 300 npm pack --ignore-scripts --pack-destination "$TARBALLS" >> "$LOG" 2>&1 || fail "pack failed"
TGZ=$(ls -t "$TARBALLS"/orkestrel-test-*.tgz | head -1)
step "tarball: $TGZ sha256=$(sha256sum "$TGZ" | cut -d' ' -f1)"
cd /home/user/veneer || fail "no veneer"
step "veneer: replaced range devDependencies @orkestrel/test = $(node -p "require('./package.json').devDependencies['@orkestrel/test']"), lockfile resolved 0.0.18 (registry); installing tarball --no-save"
timeout 600 node "$NPM11" install --no-save --ignore-scripts "$TGZ" >> "$LOG" 2>&1 || fail "veneer install failed"
grep -q 'stageMedia' node_modules/@orkestrel/test/dist/src/browser/index.d.ts || fail "installed test lacks stageMedia"
step "veneer: installed test $(node -p "require('./node_modules/@orkestrel/test/package.json').version") declares stageMedia; packages $(ls node_modules | wc -l)"
step "veneer: baseline-2 start"; "$SCR/veneer-baseline-2.sh"; step "veneer: baseline-2 done"
echo "=== vendor chain done" >> "$LOG"
