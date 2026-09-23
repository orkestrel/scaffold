#!/bin/bash
# Stage the bpo worktree from the session head (87ff1d0) with its own node_modules. Log: bpo-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/bpo-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-bpo
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" 87ff1d0 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== bpo no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/bpo 87ff1d0 >> "$LOG" 2>&1
echo "=== bpo npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== bpo npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bpo-brief.md tmp/units/bpo-brief.md
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
