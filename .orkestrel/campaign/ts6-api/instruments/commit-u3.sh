#!/usr/bin/env bash
# Land unit U3 (declaration rollup) with its fix round and records as one commit, staged by path; never git add -A.
set -eu
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/scaffold
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
git add -- configs/helpers.ts configs/src/vite.core.config.ts configs/src/vite.server.config.ts tests/config.test.ts src/core/templates.ts src/core/compilers.ts src/core/helpers.ts tests/src/core/compilers.test.ts tests/src/core/helpers.test.ts guides/scaffold.md .claude/rules/workspace.md host.json
git add -- .orkestrel/campaign/ts6-api
git diff --cached --stat | tail -3
$G commit -q -F "$S/commit-u3-msg.txt"
git status --short | head -5
git log --oneline -2
