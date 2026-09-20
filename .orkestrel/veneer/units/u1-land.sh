#!/usr/bin/env bash
# U1-author landing: commit run 5's distribution stage, guides, README, and guide proof by
# pathspec, retaining the unit's final report beside its briefs in the same action.
# Log: scaffold/tmp/units/u1-land.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
R="units"
cp tmp/codex/u1-author-report.md "$R/u1-author-report.md"
git status --short
git add -- README.md guides/README.md guides/veneer.md tests/distribution.test.ts tests/guides.test.ts
git status --short | grep -v "^M  " || true
git commit -q -F "units/u1-land-message.txt"
git log --oneline -3
git status --short --branch
echo "u1-land-done"
