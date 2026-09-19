#!/usr/bin/env bash
# Unit S4: sol writing lane through the journaled codex CLI, workspace-write sandbox, model
# gpt-6-astra (the owner's standing substitution for the transport's gpt-5.6-sol pin). Journal and
# last message land beside the brief under tmp/codex/.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
echo "baseline: $(git log --oneline -1)"
echo "dirty before: $(git status --short | grep -v '^?? tmp/\|^?? .orkestrel/' | wc -l)"
start=$(date +%s)
codex exec --json -C "$repo" --sandbox workspace-write --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/s4-report.md" \
	"Read and execute the brief at tmp/codex/s4-brief.md exactly. Before acting, read AGENTS.md, .agents/orchestration.md section Deviation protocol, and the rule files the brief names, in that order after the brief. Your final message must be the report the brief's Output section specifies." \
	< /dev/null > "$repo/tmp/codex/s4.jsonl" 2> "$repo/tmp/codex/s4.err"
echo "s4_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/s4.jsonl"
echo
echo "--- report size ---"
wc -c "$repo/tmp/codex/s4-report.md"
echo "--- status ---"
git -C "$repo" status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "--- diffstat ---"
git -C "$repo" diff --stat | tail -20
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/tmp/codex/s4.err" | tail -5
