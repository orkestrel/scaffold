#!/usr/bin/env bash
# Land the ts6-api records, the packument refusal, and the ts7 prune as three commits, staged by path.
set -eu
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/scaffold
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
echo "== A records"
git ls-files --others --exclude-standard .orkestrel/campaign/ts6-api | grep -v 'packument-refusal-report.md' | xargs git add --
git diff --cached --stat | tail -1
$G commit -q -F "$S/commit-a-msg.txt"
echo "== B packument refusal"
git add -- tests/setupServer.ts tests/setupServer.test.ts .orkestrel/campaign/ts6-api/packument-refusal-report.md
git diff --cached --stat | tail -1
$G commit -q -F "$S/commit-b-msg.txt"
echo "== C prune"
git rm -r -q -- .orkestrel/campaign/ts7 .orkestrel/campaign/ts7-break
git add -- ROADMAP.md
git diff --cached --stat | tail -1
$G commit -q -F "$S/prune-msg.txt"
echo "== state"
git status --short
git log --oneline -5
