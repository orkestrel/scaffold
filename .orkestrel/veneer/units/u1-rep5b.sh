#!/usr/bin/env bash
# U1-rep5, second script (supersedes u1-rep5.sh, which stopped because repair reads the vendored
# host from the target's installed @orkestrel/scaffold, not from the local build): install the
# packed local scaffold into Veneer's node_modules without saving, vendor the surface-policy fix
# through repair pass 5, read the gates over the styles axis run 3 left, commit by pathspec.
# Log: scaffold/units/u1-rep5b.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
TARBALL="tmp/pack/orkestrel-scaffold-0.0.75.tgz"
echo "--- install the packed local scaffold (no save; registry range ^0.0.75 stays in package.json) ---"
npm install --no-save --ignore-scripts "$TARBALL" 2>&1 | tail -n 4
grep -c "POLICY_SURFACE_STYLES_ENTRY" node_modules/@orkestrel/scaffold/dist/host/tests/setupPolicy.ts
git status --short -- package.json package-lock.json
echo "--- repair (pass 5) ---"
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
git add -u -- .claude .oxlintrc.json .oxfmtrc.json .oxlintignore .prettierignore .editorconfig .gitattributes AGENTS.md CLAUDE.md scripts guides/guide.md guides/scaffold.md configs/browsers.ts configs/helpers.ts configs/policy.ts tsconfig.json vite.config.ts 2>/dev/null || true
git status --short
git commit -q -F "u1-rep5-message.txt"
git log --oneline -2
git status --short --branch
echo "u1-rep5b-done"
