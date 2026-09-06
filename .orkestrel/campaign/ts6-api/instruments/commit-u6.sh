#!/usr/bin/env bash
# Land unit U6 (scaffold's seeds, constants, manifest, lint restriction, guide, roadmap, proposal) with the Orchestrator's lockfile and host inventory as one commit in scaffold, staged by path; never git add -A.
set -eu
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/scaffold
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
git add -- src/core/constants.ts src/core/compilers.ts src/core/templates.ts package.json package-lock.json host.json .oxlintrc.json guides/scaffold.md ROADMAP.md PROPOSAL.md vite.config.ts tests/src/core/constants.test.ts tests/src/core/compilers.test.ts tests/src/core/fixtures/source-manifest.txt tests/src/core/fixtures/setup-false-manifest.txt tests/src/bin/CLI.test.ts tests/src/bin/main.test.ts
git diff --cached --stat | tail -3
$G commit -q -F "$S/commit-u6-msg.txt"
git status --short | head -5
git log --oneline -2
