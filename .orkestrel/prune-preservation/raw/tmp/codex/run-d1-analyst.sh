#!/usr/bin/env bash
# Objective lane of the D1 audit, on GPT-5.6 Sol through the Codex bench.
# Read-only sandbox: the lane rules from source and from the retained logs, and
# records any proof the sandbox blocks as an observation naming its command.
#
# Cap: 1800s. Sized from comparable read-only audit execs in this campaign,
# which ran under ten minutes over a smaller diff, plus slack for a 20 KB diff
# and the vendored-surface reading this round requires. No gate runs inside it.
# `setsid` is absent on this host, so the harness owns the lifecycle.
set -u
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
mkdir -p tmp/codex

timeout 1800 codex exec --json \
	-C "C:/Users/mikes/WebstormProjects/scaffold" \
	--sandbox read-only \
	--model gpt-5.6-sol \
	-c "model_reasoning_effort=\"high\"" \
	--output-last-message "tmp/codex/d1-analyst-last.md" \
	"Read and execute the brief at tmp/codex/d1-analyst-brief.md exactly. Your final message must be the report it specifies." \
	< /dev/null > "tmp/codex/d1-analyst.jsonl" 2> "tmp/codex/d1-analyst.err.txt"

echo "exec_exit=$?"
echo "journal bytes: $(wc -c < tmp/codex/d1-analyst.jsonl)"
echo "last-message bytes: $(wc -c < tmp/codex/d1-analyst-last.md 2>/dev/null || echo 0)"
