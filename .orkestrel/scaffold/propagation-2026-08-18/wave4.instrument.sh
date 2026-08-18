#!/usr/bin/env bash
# Fleet wave 4: propagate the Fork-A host (setup project + rule rows) to all 44 targets.
#
# Trees are committed clean after wave 3, so no --dirty waiver: a refusal is a finding.
#
# Repos are disjoint directories, so slices run in parallel; each repo is serial.
# Records one status line per target. Never pushes, never commits.
set -u
HOST=/home/user/scaffold/dist/host
BIN=/home/user/scaffold/dist/bin/main.js
OUT=/home/user/scaffold/tmp/fleet4
mkdir -p "$OUT"

visit() {
	repo="$1"
	dir="/workspace/$repo"
	log="$OUT/$repo.log"
	: > "$log"
	{
		cd "$dir" || { echo "RESULT $repo NODIR"; return; }
		if ! node "$BIN" overwrite --from "$HOST" --target "$dir" > "$OUT/$repo.overwrite.log" 2>&1; then
			echo "RESULT $repo OVERWRITE_FAIL"
			return
		fi
		if ! npm install > "$OUT/$repo.install.log" 2>&1; then
			echo "RESULT $repo INSTALL_FAIL"
			return
		fi
		for g in format:check lint:check check; do
			if ! npm run "$g" > "$OUT/$repo.$g.log" 2>&1; then
				echo "RESULT $repo GATE_FAIL:$g"
				return
			fi
		done
		if ! npm test > "$OUT/$repo.test.log" 2>&1; then
			echo "RESULT $repo TEST_FAIL"
			return
		fi
		echo "RESULT $repo PASS"
	} >> "$log" 2>&1
	tail -1 "$log"
}

# Runtime-dependency layer order. supervisor is excluded by the user; scaffold is the source.
L0="contract sse test"
L1="abort budget csv emitter html indexeddb ndjson sqlite timeout tool"
L2="console database form markdown middleware pool reason router sea table template websocket"
L3="browser guide interpret mcp qualifier queue rater relation server terminal workspace"
L4="brief program worker workflow"
L5="agent msg"
L6="ollama toolbox"

for layer_name in L0 L1 L2 L3 L4 L5 L6; do
	eval "layer=\$$layer_name"
	echo "===== $layer_name ====="
	slice=0
	for repo in $layer; do
		visit "$repo" &
		slice=$((slice + 1))
		if [ "$slice" -ge 4 ]; then
			wait
			slice=0
		fi
	done
	wait
done
echo "===== SUMMARY ====="
grep -h "^RESULT" "$OUT"/*.log 2>/dev/null | sort -k3
grep -h "^RESULT" "$OUT"/*.log 2>/dev/null | awk '{print $3}' | sort | uniq -c
df -h /home/user | tail -1
