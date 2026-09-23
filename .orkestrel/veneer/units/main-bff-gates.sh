#!/bin/bash
# Authoritative gate chain over the Veneer session branch after the B-FORMS-CLOSE-FORCED landing, derived from main-bfs-gates.sh.
# First lets npm normalize the auto-merged lockfile (no-op when coherent) and writes the install marker.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/main-bff-gates.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
echo "=== npm install --ignore-scripts (lockfile normalization) ($(date -u +%H:%M:%S))" >> "$LOG"
npm install --ignore-scripts >> "$LOG" 2>&1; echo "=== npm install exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
echo "=== lockfile status after install: [$(git status --porcelain package-lock.json package.json)]" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
