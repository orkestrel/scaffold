#!/usr/bin/env bash
# T1+T2 audit, objective lane: analyst on gpt-6-astra, read-only, rooted in the test checkout.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
subject="C:/Users/mikes/WebstormProjects/test"
cd "$subject" || exit 1
start=$(date +%s)
codex exec --json -C "$subject" --sandbox read-only --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/t-audit-objective-last.md" \
	"Read and execute the brief at $repo/tmp/codex/t-audit-objective-brief.md exactly. Your final message must be the verdict it specifies." \
	< /dev/null > "$repo/tmp/codex/t-audit-objective.jsonl" 2> "$repo/tmp/codex/t-audit-objective.err"
echo "t_audit_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/t-audit-objective.jsonl"
echo
echo "--- last message size ---"
wc -c "$repo/tmp/codex/t-audit-objective-last.md"
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/tmp/codex/t-audit-objective.err" | tail -5
