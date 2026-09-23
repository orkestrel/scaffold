#!/bin/bash
# Stage the pr worktree (PROOF-RESOLVER) from 518faf0 with its own node_modules and the styles build (build:src is red on the base at the declaration rollup, the engine session's Sanitizer reference). Log: pr-worktree.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$SCR/pr-worktree.log.txt; : > "$LOG"
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-pr
if [ ! -d "$WT" ]; then git -C /home/user/veneer worktree add --detach "$WT" 518faf0 -q >> "$LOG" 2>&1; fi
cd "$WT" || { echo "=== pr no worktree" >> "$LOG"; exit 1; }
git checkout -q -B unit/pr 518faf0 >> "$LOG" 2>&1
echo "=== pr npm ci ($(date -u +%H:%M:%S))" >> "$LOG"
npm ci --ignore-scripts >> "$LOG" 2>&1; echo "=== pr npm ci exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
mkdir -p tmp/units
npm run build:src:styles >> "$LOG" 2>&1; echo "=== build:src:styles exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp "$LOG" tmp/units/pr-stage.log.txt
echo "=== stage done ($(date -u +%H:%M:%S))" >> "$LOG"
