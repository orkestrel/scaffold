#!/bin/bash
# Stage the cn worktree from c3ac297 with its own node_modules and build. Log: cn-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/cn-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-cn
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" c3ac297 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== cn no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/cn c3ac297 >> "$LOG" 2>&1
echo "=== cn npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== cn npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/cn-brief.md tmp/units/cn-brief.md; cp "$LOG" tmp/units/cn-stage.log.txt
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
