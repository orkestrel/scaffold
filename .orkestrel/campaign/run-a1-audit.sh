#!/usr/bin/env bash
# A1 audit, objective lane: `analyst` route on GPT 6 Astra, read-only, rooted at the agent checkout.
# Cap: 3000 s. Journal: scaffold/tmp/codex/a1-audit.jsonl. Verdict: agent/tmp/units/a1-audit-objective.md.
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-audit.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a1-audit.launch.txt"
timeout 3000 codex exec --json -C "$AGENT" --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a1-audit-objective.md" "You hold the OBJECTIVE lane of an adversarial audit round. Read and execute the brief at tmp/units/a1-audit-brief.md exactly. Your final message must be the verdict shape it specifies, with Lane: objective (analyst, GPT 6 Astra) as its first line." < /dev/null > "$SCAF/tmp/codex/a1-audit.jsonl" 2> "$SCAF/tmp/codex/a1-audit.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a1-audit.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-audit.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a1-audit.launch.txt"
