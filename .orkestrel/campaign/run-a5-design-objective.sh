#!/usr/bin/env bash
# A5 design, objective lane: `analyst` route on GPT 6 Astra, read-only, rooted at the checkouts' parent.
# Cap: 3000 s. Journal: scaffold/tmp/codex/a5-design-objective.jsonl. Answer: a5-design-objective-last.md.
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
cd "$SCAF" || exit 9
for r in agent ollama scaffold; do git -C "$ROOT/$r" status --porcelain > "$SCAF/tmp/codex/a5-design-objective.status-before.$r.txt"; done
date -u +%FT%TZ > "$SCAF/tmp/codex/a5-design-objective.launch.txt"
timeout 3000 codex exec --json --skip-git-repo-check -C "C:/Users/mikes/WebstormProjects" --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$SCAF/tmp/codex/a5-design-objective-last.md" "You hold the OBJECTIVE lane of an adversarial design round. Read and execute the brief at scaffold/tmp/units/a5-design-brief.md exactly, holding the objective perspective in full: correctness, constraints, and what the code and contracts actually permit. Every relative path in the brief resolves from this root (the checkouts' parent): agent/, ollama/, scaffold/. Your final message must be the Output shape the brief specifies, with the first line Lane: objective (analyst, GPT 6 Astra)." < /dev/null > "$SCAF/tmp/codex/a5-design-objective.jsonl" 2> "$SCAF/tmp/codex/a5-design-objective.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a5-design-objective.launch.txt"
for r in agent ollama scaffold; do git -C "$ROOT/$r" status --porcelain > "$SCAF/tmp/codex/a5-design-objective.status-after.$r.txt"; done
date -u +%FT%TZ >> "$SCAF/tmp/codex/a5-design-objective.launch.txt"
