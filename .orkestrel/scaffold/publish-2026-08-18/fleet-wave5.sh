#!/usr/bin/env bash
# Fleet wave 5: the canonical release-wave visit.
#
# Re-pin the target's @orkestrel/scaffold devDependency and install FIRST, then run
# `overwrite` from the INSTALLED package rather than from a local path. That is what the
# release-wave law prescribes, and it proves the PUBLISHED artifact works rather than a
# local build that only resembles it.
#
# 0.0.41 ships peer externalization, the conditional setup project, the vendored-set
# self-hosting fix, and the writing rules. The guide paragraph landed after 0.0.41 was
# cut, so it rides scaffold's next release; propagating the published host keeps every
# target byte-consistent with the version it installs.
#
# Trees are committed clean, so no --dirty waiver: a refusal is a finding.
set -u
OUT=/home/user/scaffold/tmp/fleet5
PIN='^0.0.41'
mkdir -p "$OUT"

visit() {
	repo="$1"
	dir="/workspace/$repo"
	log="$OUT/$repo.log"
	: > "$log"
	{
		cd "$dir" || { echo "RESULT $repo NODIR"; return; }
		# Assert the tree is clean BEFORE re-pinning. The re-pin and its install dirty
		# package.json and package-lock.json, so `overwrite` would refuse its own input.
		# Checking first keeps the later --dirty waiver bounded to dirt this wave caused,
		# and a genuinely dirty tree still reports as a finding rather than being waived.
		if [ -n "$(git status --porcelain)" ]; then
			git status --porcelain > "$OUT/$repo.predirty.log" 2>&1
			echo "RESULT $repo PRE_DIRTY"
			return
		fi
		if ! node -e "
const fs = require('node:fs');
const p = '$dir/package.json';
const m = JSON.parse(fs.readFileSync(p, 'utf8'));
if (!m.devDependencies || !m.devDependencies['@orkestrel/scaffold']) { console.error('no scaffold devDependency'); process.exit(1) }
m.devDependencies['@orkestrel/scaffold'] = '$PIN';
fs.writeFileSync(p, JSON.stringify(m, null, '\t') + '\n');
" > "$OUT/$repo.repin.log" 2>&1; then
			echo "RESULT $repo REPIN_FAIL"
			return
		fi
		if ! npm install > "$OUT/$repo.install.log" 2>&1; then
			echo "RESULT $repo INSTALL_FAIL"
			return
		fi
		BIN="$dir/node_modules/@orkestrel/scaffold/dist/bin/main.js"
		if [ ! -f "$BIN" ]; then echo "RESULT $repo NO_INSTALLED_BIN"; return; fi
		if ! node "$BIN" overwrite --dirty --target "$dir" > "$OUT/$repo.overwrite.log" 2>&1; then
			echo "RESULT $repo OVERWRITE_FAIL"
			return
		fi
		if ! npm install > "$OUT/$repo.install2.log" 2>&1; then
			echo "RESULT $repo INSTALL2_FAIL"
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
		if [ "$slice" -ge 4 ]; then wait; slice=0; fi
	done
	wait
done
echo "===== SUMMARY ====="
grep -h "^RESULT" "$OUT"/*.log 2>/dev/null | sort -k3
grep -h "^RESULT" "$OUT"/*.log 2>/dev/null | awk '{print $3}' | sort | uniq -c
df -h /home/user | tail -1
