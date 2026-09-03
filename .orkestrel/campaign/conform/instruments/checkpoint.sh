#!/bin/bash
# Checkpoint-commit a fleet checkout's uncommitted unit work: stage by path (never tmp/ or .orkestrel/), commit with the named message, push with retry.
set -u
BRANCH=claude/orkestrel-npm-audit-deps-14ibta
for pkg in "$@"; do
  dir=/home/user/fleet/$pkg; msg=/home/user/scaffold/tmp/work/msgs/$pkg.txt
  paths=$(git -C $dir status --short | awk '{print $NF}' | grep -v '^tmp/' | grep -v '^.orkestrel/')
  [ -z "$paths" ] && { echo "$pkg: nothing to commit"; continue; }
  echo "$paths" | xargs git -C $dir add --
  git -C $dir -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F $msg || { echo "$pkg: commit failed"; continue; }
  pushed=no; for delay in 0 2 4 8 16; do [ $delay -gt 0 ] && sleep $delay; git -C $dir push -q -u origin $BRANCH 2>/dev/null && { pushed=yes; break; }; done
  echo "$pkg: $(git -C $dir rev-parse --short HEAD) pushed=$pushed paths=$(echo "$paths" | wc -l)"
done
