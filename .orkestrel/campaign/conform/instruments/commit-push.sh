#!/usr/bin/env bash
# Commit the already-staged paths in a fleet checkout with an absolute message file, then push with retry.
# Usage: commit-push.sh <pkg> <absolute message file>
set -u
p=$1; msg=$2; d=/home/user/fleet/$p; [ "$p" = scaffold ] && d=/home/user/scaffold
BRANCH=claude/orkestrel-npm-audit-deps-14ibta
git -C "$d" -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$msg" || { echo "$p commit failed"; exit 1; }
pushed=no; for delay in 0 2 4 8 16; do [ $delay -gt 0 ] && sleep $delay; git -C "$d" push -q -u origin $BRANCH 2>/dev/null && { pushed=yes; break; }; done
echo "$p $(git -C "$d" rev-parse --short HEAD) pushed=$pushed"
git -C "$d" status --short | grep -v '^?? tmp/'
