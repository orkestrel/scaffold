#!/bin/bash
# Stage the bpp worktree from the session head (87ff1d0) with its own node_modules. Log: bpp-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/bpp-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-bpp
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" 87ff1d0 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== bpp no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/bpp 87ff1d0 >> "$LOG" 2>&1
echo "=== bpp npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== bpp npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bpp-brief.md tmp/units/bpp-brief.md
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
