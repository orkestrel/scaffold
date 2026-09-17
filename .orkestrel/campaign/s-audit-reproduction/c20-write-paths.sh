#!/usr/bin/env bash
# Orchestrator reproduction for audit claim 20: which Codex write path round-trips a line carrying
# U+96EA and U+00D7 through cp1252 on this Windows host. Run A edits through the exec's own patch
# tool alone; run B edits through a PowerShell shell command alone. Each run gets its own copy of
# the fixture; the dump prints every code point on every line before and after.
set -u
root="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/u96ea"
cd "$root" || exit 1
echo "== fixture =="
node dump.mjs fixture.txt
run() {
	local label="$1" prompt="$2"
	mkdir -p "$root/$label"
	cp "$root/fixture.txt" "$root/$label/fixture.txt"
	local start=$(date +%s)
	codex exec --json -C "$root/$label" --skip-git-repo-check --sandbox workspace-write --model gpt-6-astra \
		--output-last-message "$root/$label/last.txt" "$prompt" < /dev/null > "$root/$label/journal.jsonl" 2> "$root/$label/err.txt"
	echo "${label}_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
	echo "last: $(cat "$root/$label/last.txt" 2>/dev/null | head -c 300)"
	echo "-- $label after --"
	node dump.mjs "$root/$label/fixture.txt"
	grep -o '"type":"command_execution"[^}]\{0,200\}' "$root/$label/journal.jsonl" | head -3
	grep -c '"type":"file_change"' "$root/$label/journal.jsonl"
}
run patch "In fixture.txt, change the word alpha on line 1 to gamma and change nothing else. Use only your apply_patch tool to make the edit. Do not run any shell command at all, not even to read the file. Reply with the single word done."
run shell "In fixture.txt, change the word alpha on line 1 to gamma and change nothing else. Make the edit only by running a PowerShell shell command that rewrites the file (for example Get-Content piped to a -replace and Set-Content). Do not use apply_patch. Reply with the single word done."
echo "(end)"
