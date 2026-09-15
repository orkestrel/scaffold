#!/usr/bin/env bash
# Objective design lane: `analyst` route on GPT 6 Astra, read-only, rooted at the checkouts' parent.
# Cap: 3000 s. Journal: scaffold/tmp/codex/design-objective.jsonl. Answer: design-objective-last.md.
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
cd "$SCAF" || exit 9
for r in agent ollama supervisor scaffold; do git -C "$ROOT/$r" status --porcelain > "$SCAF/tmp/codex/design-objective.status-before.$r.txt"; done
date -u +%FT%TZ > "$SCAF/tmp/codex/design-objective.launch.txt"
timeout 3000 codex exec --json --skip-git-repo-check -C "C:/Users/mikes/WebstormProjects" --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$SCAF/tmp/codex/design-objective-last.md" "You hold the OBJECTIVE lane. Read and execute the brief at scaffold/tmp/units/design-brief.md exactly, holding the objective perspective in full: correctness, constraints, and what the code and contracts actually permit. Your final message must be the Output shape the brief specifies, with Lane: objective." < /dev/null > "$SCAF/tmp/codex/design-objective.jsonl" 2> "$SCAF/tmp/codex/design-objective.err"
echo "exit=$?" >> "$SCAF/tmp/codex/design-objective.launch.txt"
for r in agent ollama supervisor scaffold; do git -C "$ROOT/$r" status --porcelain > "$SCAF/tmp/codex/design-objective.status-after.$r.txt"; done
date -u +%FT%TZ >> "$SCAF/tmp/codex/design-objective.launch.txt"
