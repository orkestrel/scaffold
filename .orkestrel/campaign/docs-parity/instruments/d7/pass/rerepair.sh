#!/usr/bin/env bash
# rerepair.sh <pkg>: after the config-face fix — repair --offline from the re-packed tip in a checkout with no live
# writer, the deciding test:config run, and the commit by path. Log at land/<pkg>-rerepair.log.txt.
set -u
n=$1; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
export PATH=/opt/npm11/bin:$PATH
cd "$d" || exit 9
{
echo "== $n re-repair $(date -u +%FT%TZ) over $(git rev-parse --short HEAD)"
echo "== status before"; git status --short
node "$SCR/tip/package/dist/bin/main.js" repair --offline 2>&1 | tail -1
echo "== status after"; git status --short
echo "== test:config"; npm run test:config 2>&1 | grep -E 'Tests |FAIL' | tail -2; echo "   exit ${PIPESTATUS[0]}"
if [ -n "$(git status --short)" ]; then
  git status --short | awk '{print $2}' | while read -r p; do git add -- "$p"; done
  git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F - <<MSG
Re-repair from scaffold's tip after the config-test fix

The vendored config test reads the first face project the workspace carries
instead of assuming a core face.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
  echo "== committed"; git log --oneline -1
else echo "== nothing to commit"; fi
} | tee "$SCR/land/$n-rerepair.log.txt"
