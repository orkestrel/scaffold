#!/usr/bin/env bash
# Unit R2 audit, objective lane — Codex bench exec, read-only, gpt-6-astra.
# Journal: tmp/codex/r2-audit-objective.jsonl
# Final answer: tmp/codex/r2-audit-objective-last.md
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/codex
timeout 2700 codex exec --json \
	-C "C:/Users/mikes/WebstormProjects/roughnotes" \
	--sandbox read-only \
	--model gpt-6-astra \
	-c model_reasoning_effort="high" \
	--output-last-message "tmp/codex/r2-audit-objective-last.md" \
	"You are the objective audit lane and you are already the bench: do the audit yourself in this session and launch no codex command. Read tmp/audit/r2-audit-claims.md and rule on every claim from the objective lane — correctness, constraints, and what the code and the installed declarations permit. Argue against the change. You may read C:/Users/mikes/WebstormProjects/scaffold for the ported bodies but never write there. Do not run any script under tmp/units/, and do not run a build or a fixing lint. Your final message is the report: per-claim verdicts with evidence, findings with severity, a ruling per item under 'Where to look hardest', then one terminal line, VERDICT: ACCEPT or VERDICT: REJECT, and nothing after it. No process diary." \
	< /dev/null > tmp/codex/r2-audit-objective.jsonl 2> tmp/codex/r2-audit-objective.err.txt
echo "EXIT=$?" >> tmp/codex/r2-audit-objective.err.txt
