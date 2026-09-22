#!/bin/bash
# Prepare orkestrel/test for a 0.0.20 release (session clone at /home/user/test, tip 73e4069; successor of test-release-prep.sh), per
# .agents/skills/orkestrel-publish/references/wave.md: registry evidence, install from the repaired lockfile,
# scaffold audit (read-only), the gate chain, and the rebuilt-dist comparison against the published tarball.
# No bump, no commit, no publish here. Log: test-release-prep-2.log.txt. Cap: 1800 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/test-release-prep-2.log.txt
NPM11=$SCR/npm11/node_modules/npm/bin/npm-cli.js
: > "$LOG"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/test || exit 1
step "HEAD $(git rev-parse HEAD); status: $(git status --porcelain | tr '\n' ' ')"
step "manifest version $(node -p "require('./package.json').version"); orkestrel ranges: $(node -p "JSON.stringify(Object.fromEntries(Object.entries({...require('./package.json').dependencies,...require('./package.json').devDependencies,...require('./package.json').peerDependencies}).filter(([k])=>k.startsWith('@orkestrel/'))))")"
step "registry: test $(timeout 60 node $NPM11 view @orkestrel/test version 2>/dev/null); contract $(timeout 60 node $NPM11 view @orkestrel/contract version 2>/dev/null); scaffold $(timeout 60 node $NPM11 view @orkestrel/scaffold version 2>/dev/null)"
step "lockfile diff summary: $(git diff --stat -- package-lock.json | tail -1)"
step "npm ci from the repaired lockfile"; timeout 600 npm ci --ignore-scripts >> "$LOG" 2>&1; step "npm ci exit=$?"
step "scaffold audit (read-only)"; timeout 300 npx scaffold audit >> "$LOG" 2>&1; step "scaffold audit exit=$?"
for gate in format:check lint:check check build test; do
  step "npm run $gate"; timeout 900 npm run "$gate" >> "$LOG" 2>&1; step "$gate exit=$?"
done
step "fetch published tarball"; mkdir -p "$SCR/test-published" && cd "$SCR/test-published" && timeout 120 node $NPM11 pack @orkestrel/test@0.0.19 --pack-destination . >> "$LOG" 2>&1 && rm -rf package && tar -xzf orkestrel-test-0.0.19.tgz; step "published tarball extracted: $(ls package/dist 2>/dev/null | tr '\n' ' ')"
cd /home/user/test
step "material diff of rebuilt dist against published (sourcemaps excluded, whitespace ignored)"
diff -rq -x '*.map' --ignore-all-space "$SCR/test-published/package/dist" dist >> "$LOG" 2>&1; step "dist diff exit=$? (1 = differs)"
step "declared-surface diff (browser index.d.ts export names)"
diff <(grep -o -E 'export declare (function|const|class) [A-Za-z_]+' "$SCR/test-published/package/dist/src/browser/index.d.ts" | sort -u) <(grep -o -E 'export declare (function|const|class) [A-Za-z_]+' dist/src/browser/index.d.ts | sort -u) >> "$LOG" 2>&1; step "browser surface diff exit=$?"
step "self-pins: hits of 0.0.19 under src and tests: $(grep -rn '0\.0\.19' src tests 2>/dev/null | wc -l)"
grep -rn '0\.0\.19' src tests 2>/dev/null | head -20 >> "$LOG"
step "prepublishOnly script: $(node -p "require('./package.json').scripts.prepublishOnly")"
echo "=== prep done" >> "$LOG"
