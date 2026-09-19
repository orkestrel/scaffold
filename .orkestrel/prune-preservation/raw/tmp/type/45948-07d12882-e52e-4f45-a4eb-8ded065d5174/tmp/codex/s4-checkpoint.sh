#!/usr/bin/env bash
# Checkpoint unit S4 by pathspec after retaining the Orchestrator's gate summary.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
cp tmp/verify/s4-gates-summary.txt .orkestrel/campaign/s4-gates-summary.txt
git add -- guides/scaffold.md src/bin/CLI.ts src/bin/helpers.ts src/bin/types.ts tests/setupPolicy.ts tests/setupServer.test.ts tests/setupServer.ts tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts tests/src/core/templates.test.ts host.json
git commit --quiet -F tmp/codex/s4-commit.txt
echo "commit_EXIT=$?"
git log --oneline -2
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
