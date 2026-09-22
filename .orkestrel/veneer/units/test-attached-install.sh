#!/bin/bash
# Bring the attached orkestrel/test checkout (/home/user/test, main 00e2b87) to an installed, built state on the
# session branch: take the regenerated lockfile the read clone produced (npm install over the drifted one), npm ci, build.
# Log: test-attached-install.log.txt. Cap: 900 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/test-attached-install.log.txt
: > "$LOG"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/test || exit 1
git checkout -q -b claude/inspiring-allen-t4qzv1 2>>"$LOG" || git checkout -q claude/inspiring-allen-t4qzv1
step "branch $(git branch --show-current) at $(git rev-parse --short HEAD)"
cp /home/user/orkestrel/test/package-lock.json package-lock.json
step "lockfile taken from the read clone: $(git diff --stat -- package-lock.json | tail -1)"
step "npm ci"; timeout 600 npm ci --ignore-scripts >> "$LOG" 2>&1; step "npm ci exit=$?"
step "build"; timeout 600 npm run build >> "$LOG" 2>&1; step "build exit=$?"
step "status: $(git status --porcelain | tr '\n' ' ')"
echo "=== install done" >> "$LOG"
