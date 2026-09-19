#!/usr/bin/env bash
# Scaffold units S1, S2, S3 audit: analyst lane (subjective, swapped) through the journaled codex CLI,
# read-only sandbox, model gpt-6-astra (the owner's standing substitution for the transport's
# gpt-5.6-sol pin). Journal and last message land beside the brief under tmp/codex/.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
start=$(date +%s)
codex exec --json -C "$repo" --sandbox read-only --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/s-audit-subjective-last.md" \
	"Read and execute the brief at tmp/codex/s-audit-subjective-brief.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "$repo/tmp/codex/s-audit-subjective.jsonl" 2> "$repo/tmp/codex/s-audit-subjective.err"
echo "s_audit_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/s-audit-subjective.jsonl"
echo
echo "--- last message size ---"
wc -c "$repo/tmp/codex/s-audit-subjective-last.md"
echo "--- status ---"
git -C "$repo" status --short | grep -v "^?? tmp/\|^?? .orkestrel/" | head -40
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/tmp/codex/s-audit-subjective.err" | tail -5
