#!/usr/bin/env bash
# Successor to probe-codex.sh. What changed: the first run refused with "Not inside a trusted
# directory" because the scratchpad is no git checkout; this run sets -C to the scaffold checkout,
# which is the working directory every real Sol unit runs under, and keeps the read-only sandbox.
set -u
here="$(cd "$(dirname "$0")" && pwd)"
repo="C:/Users/mikes/WebstormProjects/scaffold"
echo "codex: $(codex --version 2>&1 | head -1)"
start=$(date +%s)
timeout 240 codex exec --json -C "$repo" --sandbox read-only --model gpt-5.6-sol \
	-c 'model_reasoning_effort="low"' \
	--output-last-message "$here/codex-probe-2-last.md" \
	"Reply with exactly the single word: ready" < /dev/null > "$here/codex-probe-2.jsonl" 2> "$here/codex-probe-2.err"
echo "codex_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- last message ---"
cat "$here/codex-probe-2-last.md" 2>/dev/null
echo
echo "--- journal head ---"
head -c 700 "$here/codex-probe-2.jsonl"
echo
echo "--- err tail ---"
tail -5 "$here/codex-probe-2.err"
