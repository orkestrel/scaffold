#!/usr/bin/env bash
# U1 fix-round landing: commit the fix diff by pathspec, retain the fix report beside its briefs in
# the same action, and write the round-2 audit evidence (diff, names, status).
# Log: scaffold/units/u1-fix-land.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
R="units"
A=".."
cp u1-fix-report.md "$R/u1-fix-report.md"
git status --short
git add -- app/browser/main.ts app/browser/showcases/Showcase.ts guides/README.md src/browser/color-mode/ColorMode.ts tests/conformance.test.ts tests/distribution.test.ts tests/setupBrowser.test.ts tests/setupBrowser.ts tests/setupConformance.test.ts tests/setupConformance.ts tests/setupStyles.test.ts tests/src/browser/color-mode/ColorMode.test.ts tests/src/browser/index.test.ts
git status --short | grep -v "^M  " || true
git commit -q -F "u1-fix-message.txt"
git log --oneline -2
git diff ae0221d..HEAD > "$A/u1-fix-diff.patch"
git diff ae0221d..HEAD --name-status > "$A/u1-fix-names.txt"
git status --porcelain > "$A/u1-fix-status.txt"
wc -l "$A/u1-fix-diff.patch" "$A/u1-fix-status.txt"
git status --short --branch
echo "u1-fix-land-done"
