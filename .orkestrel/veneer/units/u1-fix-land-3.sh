#!/usr/bin/env bash
# U1 fix-round successor 3 landing: commit the four owned test files by pathspec, retain the
# amended report, and write the round-3 evidence (diff, names, status).
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
R="units"
A=".."
cp tmp/units/u1-fix-report.md "$R/u1-fix-report.md"
git status --short
git add -- tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.test.ts tests/setupConformance.test.ts
git status --short | grep -v "^M  " || true
git commit -q -F "units/u1-fix-3-message.txt"
git log --oneline -2
git diff 690bbb4..HEAD > "$A/u1-fix-3-diff.patch"
git diff 690bbb4..HEAD --name-status > "$A/u1-fix-3-names.txt"
git status --porcelain > "$A/u1-fix-3-status.txt"
wc -l "$A/u1-fix-3-diff.patch"
git status --short --branch
echo "u1-fix-land-3-done"
