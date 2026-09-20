#!/usr/bin/env bash
# U1-rep5: vendor the surface-policy fix into Veneer through repair pass 5, read the gates over the
# styles axis run 3 left in the tree, commit the checkpoint by pathspec.
# Log: scaffold/units/u1-rep5.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
echo "--- repair (pass 5, local scaffold e8a34296) ---"
node ../scaffold/dist/bin/main.js repair --target . 2>&1 | tail -n 12
grep -c "POLICY_SURFACE_STYLES_ENTRY" tests/setupPolicy.ts
echo "--- gates ---"
npm run format:check 2>&1 | tail -n 2
npm run lint:check 2>&1 | tail -n 2
npm run check 2>&1 | tail -n 2
npm run test:policy 2>&1 | tail -n 5
npm run test:config 2>&1 | tail -n 4
npm run test:setup 2>&1 | tail -n 4
npm run test:src:styles 2>&1 | tail -n 4
echo "--- audit ---"
node ../scaffold/dist/bin/main.js audit --target . 2>&1 | tail -n 8 || true
echo "--- status ---"
git status --short
echo "--- commit ---"
git add -- tests/setupPolicy.ts tests/policy.test.ts configs/src/tsconfig.styles.json configs/src/vite.styles.config.ts src/styles tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles
git add -u -- .claude .oxlintrc.json .oxfmtrc.json .oxlintignore .prettierignore .editorconfig .gitattributes AGENTS.md CLAUDE.md scripts guides/guide.md guides/scaffold.md configs/browsers.ts configs/helpers.ts configs/policy.ts tsconfig.json vite.config.ts package.json 2>/dev/null || true
git status --short
git commit -q -F "u1-rep5-message.txt"
git log --oneline -2
git status --short --branch
echo "u1-rep5-done"
