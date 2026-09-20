#!/usr/bin/env bash
# Land the surface-policy styles-entry fix in scaffold: rebuild dist (the vendored host copy), run
# the scoped gates, commit by pathspec. Log: scaffold/units/policy-styles-entry-land.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/scaffold"
echo "--- build ---"
npm run build 2>&1 | tail -n 15
echo "--- vendored copy carries the fix ---"
grep -c "POLICY_SURFACE_STYLES_ENTRY" dist/host/tests/setupPolicy.ts
echo "--- gates ---"
npm run format:check 2>&1 | tail -n 2
npm run lint:check 2>&1 | tail -n 2
npm run test:setup 2>&1 | tail -n 5
npm run test:policy 2>&1 | tail -n 5
echo "--- status ---"
git status --short | grep -v "^?? .orkestrel\|^ M .orkestrel" || true
echo "--- commit ---"
git add -- tests/setupPolicy.ts tests/setupPolicy.test.ts host.json
git commit -q -F "policy-styles-entry-message.txt"
git log --oneline -1
echo "policy-land-done"
