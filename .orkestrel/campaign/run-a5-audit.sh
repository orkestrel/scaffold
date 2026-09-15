#!/usr/bin/env bash
# A5 audit, objective lane: `analyst` route on GPT 6 Astra, read-only, rooted at the checkouts' parent so the lane
# reads the agent checkout at the A5 commit, the scaffold's canon, and the campaign folder. No writer is live in
# agent during the round, so no worktree is needed.
# Cap: 3000 s. Journal: scaffold/tmp/codex/a5-audit.jsonl. Verdict: scaffold/tmp/codex/a5-audit-objective-last.md.
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" rev-parse --short HEAD > "$SCAF/tmp/codex/a5-audit.head.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a5-audit.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a5-audit.launch.txt"
timeout 3000 codex exec --json --skip-git-repo-check -C "C:/Users/mikes/WebstormProjects" --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$SCAF/tmp/codex/a5-audit-objective-last.md" "You hold the OBJECTIVE lane of an adversarial audit round. Read and execute the brief at scaffold/tmp/units/a5-audit-brief.md exactly; every relative path in it resolves from this root (the checkouts' parent): agent/, ollama/, scaffold/. Your final message must be the verdict shape it specifies, with Lane: objective (analyst, GPT 6 Astra) as its first line." < /dev/null > "$SCAF/tmp/codex/a5-audit.jsonl" 2> "$SCAF/tmp/codex/a5-audit.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a5-audit.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a5-audit.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a5-audit.launch.txt"
