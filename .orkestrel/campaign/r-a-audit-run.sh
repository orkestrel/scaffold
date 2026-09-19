#!/usr/bin/env bash
# Roughnotes unit R-A audit: analyst lane (objective) through the journaled codex CLI, read-only
# sandbox, model gpt-6-astra (the owner's standing substitution for the transport's gpt-5.6-sol
# pin), rooted in the roughnotes checkout. Journal and last message land under its tmp/codex/.
set -u
repo="C:/Users/mikes/WebstormProjects/roughnotes"
cd "$repo" || exit 1
mkdir -p tmp/codex
start=$(date +%s)
codex exec --json -C "$repo" --sandbox read-only --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/r-a-audit-objective-last.md" \
	"Read and execute the brief at tmp/codex/r-a-audit-objective-brief.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "$repo/tmp/codex/r-a-audit-objective.jsonl" 2> "$repo/tmp/codex/r-a-audit-objective.err"
echo "r_a_audit_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/r-a-audit-objective.jsonl"
echo
echo "--- last message size ---"
wc -c "$repo/tmp/codex/r-a-audit-objective-last.md"
echo "--- status ---"
git -C "$repo" status --short | head -40
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/tmp/codex/r-a-audit-objective.err" | tail -5
