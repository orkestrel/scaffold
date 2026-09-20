#!/usr/bin/env bash
# U1 fix-round successor 4 landing: commit the two owned test files by pathspec, retain the
# amended report, and write the round-4 evidence (diff, names, status).
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
R="units"
A=".."
cp tmp/units/u1-fix-report.md "$R/u1-fix-report.md"
git status --short
git add -- tests/setupStyles.ts tests/setupStyles.test.ts
git status --short | grep -v "^M  " || true
git commit -q -F "units/u1-fix-4-message.txt"
git log --oneline -2
git diff a0447d2..HEAD > "$A/u1-fix-4-diff.patch"
git diff a0447d2..HEAD --name-status > "$A/u1-fix-4-names.txt"
echo "git status --porcelain at HEAD ($(git rev-parse --short HEAD)):" > "$A/u1-fix-4-status.txt"
git status --porcelain >> "$A/u1-fix-4-status.txt"
wc -l "$A/u1-fix-4-diff.patch"
git status --short --branch
echo "u1-fix-land-4-done"
