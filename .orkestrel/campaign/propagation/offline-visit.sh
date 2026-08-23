#!/usr/bin/env bash
# The visit the first propagation should have been: --offline, so the vendored floor is the
# release candidate's own dist/host rather than the published 0.0.49 inventory.
SP=/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad
CLI=$SP/propagate/runner/node_modules/@orkestrel/scaffold/dist/bin/main.js
T=/tmp/pristine-abort
cd $T || exit 1
git -c user.email=c@l -c user.name=c add -A >/dev/null 2>&1
git -c user.email=c@l -c user.name=c commit -q -m checkpoint >/dev/null 2>&1
echo "before: config=$(sha256sum tests/config.test.ts | cut -c1-16) orch=$(sha256sum .agents/orchestration.md | cut -c1-16)"
node $CLI overwrite --offline --target $T 2>&1 | tail -2; echo "overwrite exit: ${PIPESTATUS[0]}"
echo "after:  config=$(sha256sum tests/config.test.ts | cut -c1-16) orch=$(sha256sum .agents/orchestration.md | cut -c1-16)"
echo "tip:    config=$(sha256sum /home/user/scaffold/tests/config.test.ts | cut -c1-16) orch=$(sha256sum /home/user/scaffold/.agents/orchestration.md | cut -c1-16)"
npm install --no-audit --no-fund >/dev/null 2>&1; echo "install: $?"
npm run format >/dev/null 2>&1
for G in format:check lint:check check build test; do
  npm run $G >/dev/null 2>&1 && echo "  $G=0" || echo "  $G=RED"
done
echo "OFFLINE VISIT COMPLETE"
