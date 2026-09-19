#!/usr/bin/env bash
# Unit S4-3: successor to s4-run-2.sh — the pointer names the round-3 brief; journal, report, and
# err files carry the -3 suffix. Everything else is unchanged.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
echo "baseline: $(git log --oneline -1)"
echo "dirty before: $(git status --short | grep -v '^?? tmp/\|^?? .orkestrel/' | wc -l)"
start=$(date +%s)
codex exec --json -C "$repo" --sandbox workspace-write --model gpt-6-astra \
	-c 'model_reasoning_effort="high"' \
	--output-last-message "$repo/tmp/codex/s4-report-3.md" \
	"Read and execute the successor brief at .orkestrel/campaign/s4-brief-3.md exactly; it binds .orkestrel/campaign/s4-brief.md and .orkestrel/campaign/s4-brief-2.md with the changes it names. Before acting, read AGENTS.md, .agents/orchestration.md section Deviation protocol, and the rule files the briefs name, in that order after the three briefs. Your final message must be the report the brief's Output section specifies." \
	< /dev/null > "$repo/tmp/codex/s4-3.jsonl" 2> "$repo/tmp/codex/s4-3.err"
echo "s4_3_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- thread ---"
head -c 200 "$repo/tmp/codex/s4-3.jsonl"
echo
echo "--- report size ---"
wc -c "$repo/tmp/codex/s4-report-3.md"
echo "--- status ---"
git -C "$repo" status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "--- diffstat ---"
git -C "$repo" diff --stat | tail -16
echo "--- err (non-rmcp) ---"
grep -v "rmcp::transport" "$repo/tmp/codex/s4-3.err" | tail -5
