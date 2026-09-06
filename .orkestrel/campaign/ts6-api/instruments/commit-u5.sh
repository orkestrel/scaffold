#!/usr/bin/env bash
# Land unit U5 (scaffold's generated-text readers off the in-process compiler) as one commit in scaffold, staged by path; never git add -A.
set -eu
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/scaffold
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
git add -- tests/guides.test.ts tests/setupServer.test.ts tests/setupServer.ts tests/src/core/templates.test.ts
git diff --cached --stat | tail -2
$G commit -q -F "$S/commit-u5-msg.txt"
git status --short | head -5
git log --oneline -2
