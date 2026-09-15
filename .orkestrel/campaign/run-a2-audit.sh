#!/usr/bin/env bash
# A2 audit, objective lane: `analyst` route on GPT 6 Astra, read-only, rooted at the isolated worktree
# (agent-audit, moved to the A2 commit before launch; node_modules is a junction to the main checkout).
# Cap: 3000 s. Journal: scaffold/tmp/codex/a2-audit.jsonl. Verdict: agent-audit/tmp/units/a2-audit-objective.md.
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
WT="C:/Users/mikes/WebstormProjects/agent-audit"
cd "$SCAF" || exit 9
mkdir -p "$ROOT/agent-audit/tmp/units"
cp "$SCAF/tmp/units/a2-audit-brief.md" "$ROOT/agent-audit/tmp/units/a2-audit-brief.md"
git -C "$ROOT/agent-audit" rev-parse --short HEAD > "$SCAF/tmp/codex/a2-audit.head.txt"
git -C "$ROOT/agent-audit" status --porcelain > "$SCAF/tmp/codex/a2-audit.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a2-audit.launch.txt"
timeout 3000 codex exec --json -C "$WT" --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$WT/tmp/units/a2-audit-objective.md" "You hold the OBJECTIVE lane of an adversarial audit round. Read and execute the brief at tmp/units/a2-audit-brief.md exactly; every relative path in it resolves from this worktree, and ../scaffold is the campaign repository. Your final message must be the verdict shape it specifies, with Lane: objective (analyst, GPT 6 Astra) as its first line." < /dev/null > "$SCAF/tmp/codex/a2-audit.jsonl" 2> "$SCAF/tmp/codex/a2-audit.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a2-audit.launch.txt"
git -C "$ROOT/agent-audit" status --porcelain > "$SCAF/tmp/codex/a2-audit.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a2-audit.launch.txt"
