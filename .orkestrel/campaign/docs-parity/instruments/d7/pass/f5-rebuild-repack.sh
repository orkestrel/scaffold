#!/usr/bin/env bash
# F5: after the config-face fix — scaffold's build re-stages dist/host and host.json; test:config, format:check, and the
# scoped lint read green; then the tip is re-packed and re-extracted for the pass. Orchestrator-owned tracked command.
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
cd /home/user/scaffold || exit 9
echo "== F5 $(date -u +%FT%TZ) at $(git rev-parse --short HEAD)"; git status --short
echo "== build"; npm run build 2>&1 | tail -6; echo "build exit ${PIPESTATUS[0]}"
echo "== status after build"; git status --short
echo "== test:config"; npm run test:config 2>&1 | grep -E 'Tests |Test Files|FAIL' | tail -3; echo "test:config exit ${PIPESTATUS[0]}"
echo "== format:check"; npm run format:check 2>&1 | tail -1; echo "format exit ${PIPESTATUS[0]}"
echo "== lint (scoped)"; npx oxlint --config .oxlintrc.json --deny-warnings tests/config.test.ts; echo "lint exit $?"
echo "== host digest of the vendored test"; grep -n 'tests/config.test.ts' host.json | head -2
echo "== done $(date -u +%FT%TZ)"
