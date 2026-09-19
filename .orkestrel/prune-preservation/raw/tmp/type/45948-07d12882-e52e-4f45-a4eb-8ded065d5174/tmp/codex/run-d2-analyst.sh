#!/usr/bin/env bash
# Objective lane of the D2 audit, on GPT-5.6 Sol through the Codex bench.
#
# Cap: 2400s. The D1 lane ran about ten minutes over a 20 KB diff on 2026-09-17.
# This round's diff is roughly twice that and spans four files plus a vendored
# import-closure question, so the cap is the observed high mark doubled plus
# slack. No gate runs inside it; the sandbox is read-only.
# `setsid` is absent on this host, so the harness owns the lifecycle.
set -u
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
mkdir -p tmp/codex

timeout 2400 codex exec --json \
	-C "C:/Users/mikes/WebstormProjects/scaffold" \
	--sandbox read-only \
	--model gpt-5.6-sol \
	-c "model_reasoning_effort=\"high\"" \
	--output-last-message "tmp/codex/d2-analyst-last.md" \
	"Read and execute the brief at tmp/codex/d2-analyst-brief.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "tmp/codex/d2-analyst.jsonl" 2> "tmp/codex/d2-analyst.err.txt"

echo "exec_exit=$?"
echo "journal bytes: $(wc -c < tmp/codex/d2-analyst.jsonl)"
echo "last-message bytes: $(wc -c < tmp/codex/d2-analyst-last.md 2>/dev/null || echo 0)"
