#!/usr/bin/env bash
# Records commit on scaffold main, derived from commit-records.sh: stages the engine folder AND the
# .orkestrel/test folder by pathspec, commits with the message file given as $1, fetches and merges
# origin/main, pushes main. The log is commit-records-2.log beside this file.
set -u
MSG="$1"
LOG="$(dirname "$0")/commit-records-2.log"
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/scaffold || exit 9
git add .orkestrel/veneer/engine .orkestrel/test >> "$LOG" 2>&1
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
