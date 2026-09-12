#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
ollama="$FLEET/ollama"
toolbox="$FLEET/toolbox"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local package="$1"
	local target="$2"

	git -C "$target" rev-parse HEAD > "$out/$package.head.txt"
	git -C "$target" branch --show-current > "$out/$package.branch.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/$package.status.txt"
	git -C "$target" diff HEAD --binary > "$out/$package.diff.txt"
	git -C "$target" ls-files --stage > "$out/$package.index.txt"
}

compare() {
	local predecessor="$1"
	local successor="$2"
	local status=0

	if diff -u "$SCR/$predecessor" "$SCR/$successor" > "$out/$successor.patch"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$successor.exit.txt"
	if [ "$status" -gt 1 ]; then
		fail "comparison failed: $successor"
	fi
}

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
out="$SCR/$label"
test -d "$ollama/.git" || fail "Ollama package directory is absent: $ollama"
test -d "$toolbox/.git" || fail "Toolbox package directory is absent: $toolbox"
test ! -e "$out" || fail "evidence directory exists: $out"

mkdir "$out"
capture ollama "$ollama"
capture toolbox "$toolbox"
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > "$out/scaffold.status.txt"

compare install-agent-probe-tooling.sh install-ollama-toolbox-tooling.sh
compare prepare-agent-probe-registry-supported.sh prepare-ollama-toolbox-registry-supported.sh
compare pack-agent-probe-final-verified.sh pack-ollama-toolbox-final-verified.sh
compare commit-agent-probe-native-entry.sh commit-ollama-toolbox-native-entry.sh
compare close-agent-probe-registry-supported-release.sh close-ollama-toolbox-registry-supported-release.sh

sha256sum "$SCR/install-ollama-toolbox-tooling.sh" > "$out/install-ollama-toolbox-tooling.sh.sha256"
sha256sum "$SCR/prepare-ollama-toolbox-registry-supported.sh" > "$out/prepare-ollama-toolbox-registry-supported.sh.sha256"
sha256sum "$SCR/pack-ollama-toolbox-final-verified.sh" > "$out/pack-ollama-toolbox-final-verified.sh.sha256"
sha256sum "$SCR/commit-ollama-toolbox-native-entry.sh" > "$out/commit-ollama-toolbox-native-entry.sh.sha256"
sha256sum "$SCR/close-ollama-toolbox-registry-supported-release.sh" > "$out/close-ollama-toolbox-registry-supported-release.sh.sha256"

printf '%s\n' "$out"
