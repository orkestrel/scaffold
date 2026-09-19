#!/usr/bin/env bash
# Checkpoint unit S3 and the test 0.0.17 re-pin as two commits, each staged by pathspec, after
# retaining the Orchestrator's gate summaries under .orkestrel/campaign/.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
cp tmp/verify/s3-gates-summary.txt .orkestrel/campaign/s3-gates-summary.txt
cp tmp/verify/s3b-summary.txt .orkestrel/campaign/s3b-gates-summary.txt
git add -- .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md .agents/skills/orkestrel-prove-journey/references/decide.md .agents/skills/orkestrel-prove-journey/references/layer.md .agents/skills/orkestrel-prove-journey/references/statechart.md .agents/skills/orkestrel-prove-journey/references/styles.md .agents/transports/codex.md ROADMAP.md
git commit --quiet -F tmp/units/s3-commit-a.txt
echo "commit_a_EXIT=$?"
git add -- host.json package.json package-lock.json guides/test.md .claude/agents/orkestrel.md tests/src/bin/CLI.test.ts tests/src/core/fixtures/app-only-toolchain.txt tests/src/core/fixtures/setup-false-manifest.txt tests/src/core/fixtures/source-manifest.txt
git commit --quiet -F tmp/units/s3-commit-b.txt
echo "commit_b_EXIT=$?"
git log --oneline -3
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
