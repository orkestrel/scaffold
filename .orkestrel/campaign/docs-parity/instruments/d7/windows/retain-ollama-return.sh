#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
record="$SCAFFOLD/.orkestrel/campaign/docs-parity"
report="$record/d7n-ollama-converge-fix-report.md"
diff="$record/d7n-ollama-converge-fix-return.diff.txt"
status="$record/d7n-ollama-converge-fix-return.status.txt"
result="$record/d7n-ollama-converge-fix-host-result.json"
test ! -e "$report"
test ! -e "$diff"
test ! -e "$status"
test ! -e "$result"
node "$SCR/assert-journal.mjs" "$SCAFFOLD/tmp/claude/d7n-ollama-converge-fix-host.jsonl"
cp "$SCAFFOLD/tmp/units/d7n-ollama-converge-fix-report.md" "$report"
git -C "$FLEET/ollama" diff --binary HEAD > "$diff"
git -C "$FLEET/ollama" status --short > "$status"
node "$SCR/read-journal.mjs" "$SCAFFOLD/tmp/claude/d7n-ollama-converge-fix-host.jsonl" result > "$result"
