#!/usr/bin/env bash
# Checkpoint the roughnotes visit by pathspec: the catalog re-pin, the install, the wrapper, and
# every file the repair restored or regenerated.
set -u
R="C:/Users/mikes/WebstormProjects/roughnotes"
sp="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad"
cd "$R" || exit 1
git add -- .claude/agents/orkestrel.md configs/browsers.ts guides/scaffold.md guides/test.md package-lock.json package.json tests/config.test.ts tests/policy.test.ts tests/setupPolicy.ts vite.config.ts configs/app/vite.journey.config.ts tests/app/browser/integration.test.ts
git commit --quiet -F "$sp/visit-roughnotes-commit.txt"
echo "commit_EXIT=$?"
git log --oneline -2
echo "--- status ---"
git status --short | head -20
echo "(end status)"
