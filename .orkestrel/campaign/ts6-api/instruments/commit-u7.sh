#!/usr/bin/env bash
# Land unit U7 (probe type stage on the tsc process over a mirror) with its fix rounds as one commit in probe, staged by path; never git add -A.
set -eu
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/fleet/probe
G="git -c user.name=Claude -c user.email=noreply@anthropic.com"
git add -- guides/probe.md src/core/constants.ts src/core/helpers.ts src/core/types.ts src/server/Overlay.ts src/server/Probe.ts src/server/helpers.ts src/server/index.ts src/server/parsers.ts src/server/stages/RuntimeStage.ts src/server/stages/TypeStage.ts src/server/types.ts tests/src/core/errors.test.ts tests/src/core/helpers.test.ts tests/src/core/validators.test.ts tests/src/server/Overlay.test.ts tests/src/server/Probe.test.ts tests/src/server/ProbeServer.test.ts tests/src/server/helpers.test.ts tests/src/server/parsers.test.ts tests/src/server/stages/TypeStage.test.ts
git diff --cached --stat | tail -3
$G commit -q -F "$S/commit-u7-msg.txt"
git status --short | head -5
git log --oneline -2
