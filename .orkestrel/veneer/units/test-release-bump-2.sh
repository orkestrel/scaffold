#!/bin/bash
# Bump orkestrel/test to 0.0.20 at /home/user/test (tip 73e4069) and prove the distribution in release mode
# under npm 11, per .agents/skills/orkestrel-publish/references/wave.md. No commit, no publish here.
# Log: test-release-bump-2.log.txt. Cap: 900 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/test-release-bump-2.log.txt
: > "$LOG"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/test || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
step "npm $(npm --version) HEAD $(git rev-parse --short HEAD) status: $(git status --porcelain | tr '\n' ' ')"
step "npm version 0.0.20 --no-git-tag-version"; timeout 120 npm version 0.0.20 --no-git-tag-version >> "$LOG" 2>&1; step "bump exit=$?"
step "manifest version $(node -p "require('./package.json').version"); lockfile root version $(node -p "require('./package-lock.json').version"); lockfile package version $(node -p "require('./package-lock.json').packages[''].version")"
step "git status: $(git status --porcelain | tr '\n' ' ')"
step "npm run test:distribution -- --mode release"; timeout 600 npm run test:distribution -- --mode release >> "$LOG" 2>&1; step "test:distribution release exit=$?"
echo "=== bump done" >> "$LOG"
