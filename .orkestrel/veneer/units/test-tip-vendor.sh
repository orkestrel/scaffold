#!/bin/bash
# Build the orkestrel/test tip (00e2b87), pack it under scaffold tmp/, install the tarball into veneer
# without saving (the manifest keeps ^0.0.18), record the swap, then re-run veneer's baseline chain.
# Log: test-tip-vendor.log.txt beside this script. Cap: 1800 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/test-tip-vendor.log.txt
NPM11=$SCR/npm11/node_modules/npm/bin/npm-cli.js
TARBALLS=/home/user/scaffold/tmp/tarballs
: > "$LOG"; mkdir -p "$TARBALLS"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/orkestrel/test || exit 1
step "test: git rev-parse HEAD = $(git rev-parse HEAD)"
step "test: npm ci"; timeout 600 npm ci --ignore-scripts >> "$LOG" 2>&1; step "test: npm ci exit=$?"
step "test: npm run build"; timeout 600 npm run build >> "$LOG" 2>&1; step "test: build exit=$?"
step "test: npm pack"; timeout 300 npm pack --ignore-scripts --pack-destination "$TARBALLS" >> "$LOG" 2>&1; step "test: pack exit=$?"
TGZ=$(ls -t "$TARBALLS"/orkestrel-test-*.tgz | head -1)
step "tarball: $TGZ sha256=$(sha256sum "$TGZ" | cut -d' ' -f1)"
cd /home/user/veneer || exit 1
step "veneer: replaced range devDependencies @orkestrel/test = $(node -p "require('./package.json').devDependencies['@orkestrel/test']") (lockfile 0.0.18); installing tarball --no-save"
timeout 600 node "$NPM11" install --no-save --ignore-scripts "$TGZ" >> "$LOG" 2>&1; step "veneer: install exit=$?"
step "veneer: installed test version $(node -p "require('./node_modules/@orkestrel/test/package.json').version"); stageMedia declared: $(grep -c 'stageMedia' node_modules/@orkestrel/test/dist/src/browser/index.d.ts)"
step "veneer: packages $(ls node_modules | wc -l); orkestrel $(ls node_modules/@orkestrel | wc -l)"
step "veneer: baseline-2 start"; "$SCR/veneer-baseline-2.sh"; step "veneer: baseline-2 done"
echo "=== vendor chain done" >> "$LOG"
