#!/usr/bin/env bash
# Scaffold fix round S4 and S5 audit: analyst lane (subjective, swapped) through the journaled codex
# CLI, read-only sandbox, model gpt-6-astra (the owner's standing substitution for the transport's
# gpt-5.6-sol pin). Journal and last message land beside the brief under tmp/codex/.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
start=$(date +%s)
codex exec --json -C "$repo" --sandbox read-only --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/.orkestrel/campaign/s-fix-audit-subjective-last.md" \
	"Read and execute the brief at .orkestrel/campaign/s-fix-audit-subjective-brief.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "$repo/.orkestrel/campaign/s-fix-audit-subjective.jsonl" 2> "$repo/.orkestrel/campaign/s-fix-audit-subjective.err"
echo "s_fix_audit_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/.orkestrel/campaign/s-fix-audit-subjective.jsonl"
echo
echo "--- last message size ---"
wc -c "$repo/.orkestrel/campaign/s-fix-audit-subjective-last.md"
echo "--- status ---"
git -C "$repo" status --short | grep -v "^?? tmp/\|^?? .orkestrel/" | head -40
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/.orkestrel/campaign/s-fix-audit-subjective.err" | tail -5
