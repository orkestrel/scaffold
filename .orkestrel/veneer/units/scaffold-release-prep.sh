#!/bin/bash
# Prepare @orkestrel/scaffold 0.0.77 at /home/user/scaffold (tip 3541abe), per orkestrel-publish wave.md § Visit a
# repository and § Prepare a layer: registry evidence, the @orkestrel/test re-pin to the registry caret, the full
# install with the lock marker, the self-pin sweep, the mutating format, the bump from the registry's 0.0.76, the
# package's own prepublishOnly chain (which rebuilds dist after the bump, because dist embeds the version), the
# rebuilt-dist comparison against the published tarball, and the audit through the built entry. No commit, no publish.
# Log: scaffold-release-prep.log.txt. Cap: 1800 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/scaffold-release-prep.log.txt
: > "$LOG"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/scaffold || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
step "npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) status: $(git status --porcelain | tr '\n' ' ')"
step "registry: scaffold $(timeout 60 npm view @orkestrel/scaffold version 2>/dev/null); test $(timeout 60 npm view @orkestrel/test version 2>/dev/null)"
step "re-pin @orkestrel/test to the registry caret"; timeout 600 npm install --save-dev --ignore-scripts --no-audit --no-fund '@orkestrel/test@^0.0.20' >> "$LOG" 2>&1; step "re-pin exit=$? range now $(node -p "require('./package.json').devDependencies['@orkestrel/test']")"
if grep -rqn "'\^0\.0\.18'" src/core/constants.ts; then sed -i "s|'@orkestrel/test': '\^0\.0\.18'|'@orkestrel/test': '^0.0.20'|" src/core/constants.ts; step "catalog constant re-pinned: $(grep -n '@orkestrel/test' src/core/constants.ts | head -1)"; else step "catalog constant carries no ^0.0.18 literal"; fi
step "npm ci from the lockfile"; timeout 600 npm ci --ignore-scripts >> "$LOG" 2>&1; step "npm ci exit=$?"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256; step "lock marker $(cut -c1-16 node_modules/.orkestrel-lock.sha256)"
step "self-pin sweep: 0.0.76 literals under src and tests: $(grep -rn '0\.0\.76' src tests --include='*.ts' --include='*.json' | wc -l); ^0.0.18 literals for test: $(grep -rn '@orkestrel/test.\{0,4\}\^0\.0\.18' src tests | wc -l)"
step "npm run format (mutating converge)"; timeout 600 npm run format >> "$LOG" 2>&1; step "format exit=$?"
step "npm version 0.0.77 --no-git-tag-version"; timeout 120 npm version 0.0.77 --no-git-tag-version >> "$LOG" 2>&1; step "bump exit=$? manifest $(node -p "require('./package.json').version") lock $(node -p "require('./package-lock.json').packages[''].version")"
for gate in format:check lint:check check build test; do
  step "npm run $gate"; timeout 1200 npm run "$gate" >> "$LOG" 2>&1; step "$gate exit=$?"
done
step "npm run test:distribution -- --mode release"; timeout 900 npm run test:distribution -- --mode release >> "$LOG" 2>&1; step "test:distribution release exit=$?"
step "dist embeds: $(grep -o '0\.0\.7[67]' dist/src/core/index.js | sort | uniq -c | tr '\n' ' ')"
step "fetch published tarball"; mkdir -p "$SCR/scaffold-published" && cd "$SCR/scaffold-published" && rm -rf package && timeout 120 npm pack @orkestrel/scaffold@0.0.76 --pack-destination . >> "$LOG" 2>&1 && tar -xzf orkestrel-scaffold-0.0.76.tgz; step "published tarball extracted: $(ls package/dist 2>/dev/null | tr '\n' ' ')"
cd /home/user/scaffold
step "material diff of rebuilt dist against published (sourcemaps excluded, whitespace ignored)"
diff -rq -x '*.map' --ignore-all-space "$SCR/scaffold-published/package/dist" dist >> "$LOG" 2>&1; step "dist diff exit=$? (1 = differs)"
step "host files that differ:"; diff -rq -x '*.map' --ignore-all-space "$SCR/scaffold-published/package/dist/host" dist/host 2>/dev/null | sed 's|^|  |' >> "$LOG"
step "audit through the built entry (read-only)"; timeout 120 node dist/bin/main.js audit >> "$LOG" 2>&1; step "audit exit=$?"
step "status: $(git status --porcelain | tr '\n' ' ')"
echo "=== prep done" >> "$LOG"
