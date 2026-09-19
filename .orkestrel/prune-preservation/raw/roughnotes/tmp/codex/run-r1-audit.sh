#!/usr/bin/env bash
# Unit R1 audit, objective lane — Codex bench exec, read-only, gpt-6-astra.
# Journal: tmp/codex/r1-audit-objective.jsonl
# Final answer: tmp/codex/r1-audit-objective-last.md
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/codex
timeout 2700 codex exec --json \
	-C "C:/Users/mikes/WebstormProjects/roughnotes" \
	--sandbox read-only \
	--model gpt-6-astra \
	-c model_reasoning_effort="high" \
	--output-last-message "tmp/codex/r1-audit-objective-last.md" \
	"You are the objective audit lane and you are already the bench: do the audit yourself in this session and launch no codex command. Read tmp/audit/r1-audit-objective-brief.md and execute it exactly. Your final message must be the report it specifies." \
	< /dev/null > tmp/codex/r1-audit-objective.jsonl 2> tmp/codex/r1-audit-objective.err.txt
echo "EXIT=$?" >> tmp/codex/r1-audit-objective.err.txt
