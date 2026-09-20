#!/usr/bin/env bash
# U1-rep5, third script (supersedes u1-rep5b.sh): repair reads the vendored host from upstream by
# default and matched the published 0.0.75 floor, so pass 5 runs --offline against the local
# scaffold build's floor (e8a34296), which carries the surface-policy fix. Then the gates over the
# styles axis run 3 left, and the checkpoint commit by pathspec.
# Log: scaffold/tmp/units/u1-rep5c.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
echo "--- repair (pass 5, --offline, local scaffold e8a34296 floor) ---"
node ../scaffold/dist/bin/main.js repair --target . --offline 2>&1 | tail -n 12
grep -c "POLICY_SURFACE_STYLES_ENTRY" tests/setupPolicy.ts
echo "--- gates ---"
npm run format:check 2>&1 | tail -n 2
npm run lint:check 2>&1 | tail -n 2
npm run check 2>&1 | tail -n 2
npm run test:policy 2>&1 | tail -n 5
npm run test:config 2>&1 | tail -n 4
npm run test:setup 2>&1 | tail -n 4
npm run test:src:styles 2>&1 | tail -n 4
echo "--- audit (--offline) ---"
node ../scaffold/dist/bin/main.js audit --target . --offline 2>&1 | tail -n 8 || true
echo "--- status ---"
git status --short
echo "--- commit ---"
git add -- tests/setupPolicy.ts tests/policy.test.ts configs/src/tsconfig.styles.json configs/src/vite.styles.config.ts src/styles tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles
git add -u -- .claude .oxlintrc.json .oxfmtrc.json .oxlintignore .prettierignore .editorconfig .gitattributes AGENTS.md CLAUDE.md scripts guides/guide.md guides/scaffold.md configs/browsers.ts configs/helpers.ts configs/policy.ts tsconfig.json vite.config.ts 2>/dev/null || true
git status --short
git commit -q -F "units/u1-rep5-message.txt"
git log --oneline -2
git status --short --branch
echo "u1-rep5c-done"
