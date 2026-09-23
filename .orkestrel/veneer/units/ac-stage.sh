#!/bin/bash
# Stage the ac worktree from a658879 with its own node_modules and build. Log: ac-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/ac-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-ac
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" a658879 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== ac no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/ac a658879 >> "$LOG" 2>&1
echo "=== ac npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== ac npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp "$LOG" tmp/units/ac-stage.log.txt
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
