#!/usr/bin/env bash
# Design round, objective lane through the journaled codex CLI, read-only sandbox.
# Form taken from .agents/transports/codex.md. The cap is the Orchestrator's.
# Model: gpt-6-astra, the owner's standing routing for the Codex lanes (asked 2026-09-14 and
# 2026-09-16), recorded in the routing ledger as a substitution against the transport's
# gpt-5.6-sol pin.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
start=$(date +%s)
codex exec --json -C "$repo" --sandbox read-only --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/design-analyst-last.md" \
	"Read and execute the brief at tmp/codex/design-analyst-brief.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "$repo/tmp/codex/design-analyst.jsonl" 2> "$repo/tmp/codex/design-analyst.err"
echo "analyst_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/design-analyst.jsonl"
echo
echo "--- last message size ---"
wc -c "$repo/tmp/codex/design-analyst-last.md"
echo "--- err tail ---"
grep -v "rmcp::transport" "$repo/tmp/codex/design-analyst.err" | tail -5
