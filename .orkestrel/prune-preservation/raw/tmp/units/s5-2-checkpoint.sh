#!/usr/bin/env bash
# Checkpoint unit S5-2 by pathspec after retaining the Orchestrator's gate summary.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
cp tmp/verify/s5-2-gates-summary.txt .orkestrel/campaign/s5-2-gates-summary.txt
git add -- .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md .agents/skills/orkestrel-prove-journey/references/layer.md .agents/skills/orkestrel-prove-journey/references/styles.md .agents/transports/codex.md ROADMAP.md host.json
git commit --quiet -F tmp/units/s5-2-commit.txt
echo "commit_EXIT=$?"
git log --oneline -3
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
