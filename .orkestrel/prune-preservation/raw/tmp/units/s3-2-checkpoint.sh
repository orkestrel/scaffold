#!/usr/bin/env bash
# Checkpoint unit S3-2 by pathspec after retaining the Orchestrator's gate summary.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
cp tmp/verify/s3-2-gates-summary.txt .orkestrel/campaign/s3-2-gates-summary.txt
git add -- .agents/skills/orkestrel-prove-journey/references/statechart.md host.json
git commit --quiet -F tmp/units/s3-2-commit.txt
echo "commit_EXIT=$?"
git log --oneline -2
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
