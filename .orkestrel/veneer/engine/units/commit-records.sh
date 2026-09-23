#!/usr/bin/env bash
# Records commit on scaffold main: stage the engine folder by pathspec, commit with the message file
# given as $1, fetch and merge origin/main, push main.
set -u
MSG="$1"
LOG="$(dirname "$0")/commit-records.log"
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/scaffold || exit 9
git add .orkestrel/veneer/engine >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
git commit -F "$MSG" >> "$LOG" 2>&1
echo "commit exit=$?" >> "$LOG"
git fetch origin main >> "$LOG" 2>&1
git merge --no-edit origin/main >> "$LOG" 2>&1
echo "merge exit=$?" >> "$LOG"
git push origin main >> "$LOG" 2>&1
echo "push exit=$?" >> "$LOG"
git log --oneline -3 >> "$LOG" 2>&1
git status --short --branch >> "$LOG" 2>&1
cat "$LOG"
