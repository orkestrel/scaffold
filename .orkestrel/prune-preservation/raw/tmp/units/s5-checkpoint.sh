#!/usr/bin/env bash
# Checkpoint unit S5 by pathspec after retaining the Orchestrator's gate summary and the claim-7
# mutation closure.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
cp tmp/verify/s5-gates-summary.txt .orkestrel/campaign/s5-gates-summary.txt
cp tmp/audit/s-fix-c7-mutations-summary.txt .orkestrel/campaign/s-fix-c7-mutations-summary.txt
cp tmp/audit/s-fix-c7-mutations.sh .orkestrel/campaign/s-fix-c7-mutations.sh
git add -- .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md .agents/skills/orkestrel-prove-journey/references/layer.md .agents/skills/orkestrel-prove-journey/references/statechart.md .agents/skills/orkestrel-prove-journey/references/styles.md .agents/transports/codex.md ROADMAP.md guides/scaffold.md host.json
git commit --quiet -F tmp/units/s5-commit.txt
echo "commit_EXIT=$?"
git log --oneline -3
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
