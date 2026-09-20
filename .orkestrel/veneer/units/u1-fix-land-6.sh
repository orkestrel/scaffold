#!/usr/bin/env bash
# U1 fix-round successor 6 landing: commit the two owned test files by pathspec, retain the
# amended report, and write the round-5 evidence over the combined fix diff bd4284c..HEAD.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
R="units"
A=".."
cp tmp/units/u1-fix-report.md "$R/u1-fix-report.md"
git status --short
git add -- tests/setupStyles.ts tests/setupStyles.test.ts
git status --short | grep -v "^M  " || true
git commit -q -F "units/u1-fix-6-message.txt"
git log --oneline -3
git diff bd4284c..HEAD > "$A/u1-fix-6-diff.patch"
git diff bd4284c..HEAD --name-status > "$A/u1-fix-6-names.txt"
echo "git status --porcelain at HEAD ($(git rev-parse --short HEAD)):" > "$A/u1-fix-6-status.txt"
git status --porcelain >> "$A/u1-fix-6-status.txt"
wc -l "$A/u1-fix-6-diff.patch"
git status --short --branch
echo "u1-fix-land-6-done"
