#!/usr/bin/env bash
# U1 fix-round successor 5 landing: commit the two owned test files by pathspec, retain the
# amended report, and write the round-5 evidence (diff, names, status).
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
R="units"
A=".."
cp tmp/units/u1-fix-report.md "$R/u1-fix-report.md"
git status --short
git add -- tests/setupStyles.ts tests/setupStyles.test.ts
git status --short | grep -v "^M  " || true
git commit -q -F "units/u1-fix-5-message.txt"
git log --oneline -2
git diff bd4284c..HEAD > "$A/u1-fix-5-diff.patch"
git diff bd4284c..HEAD --name-status > "$A/u1-fix-5-names.txt"
echo "git status --porcelain at HEAD ($(git rev-parse --short HEAD)):" > "$A/u1-fix-5-status.txt"
git status --porcelain >> "$A/u1-fix-5-status.txt"
wc -l "$A/u1-fix-5-diff.patch"
git status --short --branch
echo "u1-fix-land-5-done"
