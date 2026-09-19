#!/usr/bin/env bash
# Checkpoint unit S6 by pathspec after retaining the Orchestrator's gate summary.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
cp tmp/verify/s6-gates-summary.txt .orkestrel/campaign/s6-gates-summary.txt
git add -- src/core/templates.ts tests/src/core/templates.test.ts
git commit --quiet -F tmp/units/s6-commit.txt
echo "commit_EXIT=$?"
git log --oneline -2
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
