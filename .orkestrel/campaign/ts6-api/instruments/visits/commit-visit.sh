#!/usr/bin/env bash
# Commit one checkout's phase A visit by path (the owned edits and every path repair wrote), never git add -A; push its branch only.
# Usage: commit-visit.sh <target-dir>
set -eu
SP=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd "$1"
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
PATHS=$(git status --short | awk '{print $2}' | grep -v "^package-lock.json$" | grep -v "^tmp/" || true)
[ -n "$PATHS" ] || { echo "$(basename "$1"): nothing to commit"; exit 0; }
git add -- $PATHS
git diff --cached --stat | tail -1
$G commit -q -F "$SP/visits/commit-visit-msg.txt"
git log --oneline -1
BR=$(git branch --show-current)
n=0; delay=2; while :; do if git push -u origin "$BR" 2>&1 | tail -1; then break; fi; n=$((n+1)); [ $n -ge 4 ] && exit 1; sleep $delay; delay=$((delay*2)); done
