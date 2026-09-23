#!/bin/bash
# Stage the al worktree from c3ac297 with its own node_modules and build. Log: al-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/al-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-al
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" c3ac297 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== al no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/al c3ac297 >> "$LOG" 2>&1
echo "=== al npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== al npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/al-brief.md tmp/units/al-brief.md; cp "$LOG" tmp/units/al-stage.log.txt
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
