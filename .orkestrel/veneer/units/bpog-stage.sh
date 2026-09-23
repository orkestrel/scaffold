#!/bin/bash
# Stage the co worktree from b5038db with its own node_modules and build. Log: bpog-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/bpog-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-bpog
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" b5038db -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== bpog no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/bpog b5038db >> "$LOG" 2>&1
echo "=== bpog npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== bpog npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bpog-brief.md tmp/units/bpog-brief.md; cp "$LOG" tmp/units/bpog-stage.log.txt
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
