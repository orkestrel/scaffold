#!/usr/bin/env bash
# Unit S2: Sol implementation unit through the journaled codex CLI, workspace-write sandbox,
# model gpt-6-astra (the owner's standing substitution for the transport's gpt-5.6-sol pin).
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
start=$(date +%s)
codex exec --json -C "$repo" --sandbox workspace-write --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/s2-3-last.md" \
	"Read and execute the brief at tmp/codex/s2-brief-3.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "$repo/tmp/codex/s2-3.jsonl" 2> "$repo/tmp/codex/s2-3.err"
echo "s2_3_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/s2-3.jsonl"
echo
echo "--- last message size ---"
wc -c "$repo/tmp/codex/s2-3-last.md"
echo "--- status ---"
git -C "$repo" status --short | grep -v "^?? tmp/\|^?? .orkestrel/" | head -40
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/tmp/codex/s2-3.err" | tail -5
