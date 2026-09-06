#!/usr/bin/env bash
# Land unit U2 (policy plugin) with its records as one commit, staged by path; never git add -A.
set -eu
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/scaffold
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
git add -- .oxlintrc.json configs/policy.ts tests/config.test.ts tests/policy.test.ts tests/setupPolicy.ts .claude/rules/architecture.md .claude/rules/workspace.md .claude/rules/tests.md guides/scaffold.md host.json
git add -- .orkestrel/campaign/ts6-api
git diff --cached --stat | tail -3
$G commit -q -F "$S/commit-u2-msg.txt"
git status --short | head -5
git log --oneline -2
