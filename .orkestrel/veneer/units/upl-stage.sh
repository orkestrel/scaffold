#!/bin/bash
# Stage the upl worktree from e4e6a40 with its own node_modules and build. Log: upl-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/upl-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-upl
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" e4e6a40 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== upl no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/upl e4e6a40 >> "$LOG" 2>&1
echo "=== upl npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== upl npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp "$LOG" tmp/units/upl-stage.log.txt
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
