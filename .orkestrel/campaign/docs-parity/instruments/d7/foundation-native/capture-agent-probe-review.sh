#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
agent="$FLEET/agent"
probe="$FLEET/probe"

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
test -d "$agent/.git" || fail "Agent package directory is absent: $agent"
test -d "$probe/.git" || fail "Probe package directory is absent: $probe"
test ! -e "$out" || fail "evidence directory exists: $out"

mkdir "$out"
capture agent "$agent"
capture probe "$probe"
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > "$out/scaffold.status.txt"

compare install-dependent-tooling.sh install-agent-probe-tooling.sh
compare prepare-dependent-registry-supported.sh prepare-agent-probe-registry-supported.sh
compare pack-dependent-final-verified.sh pack-agent-probe-final-verified.sh
compare commit-dependent-native-entry.sh commit-agent-probe-native-entry.sh
compare close-dependent-registry-supported-release.sh close-agent-probe-registry-supported-release.sh

sha256sum "$SCR/install-agent-probe-tooling.sh" > "$out/install-agent-probe-tooling.sh.sha256"
sha256sum "$SCR/prepare-agent-probe-registry-supported.sh" > "$out/prepare-agent-probe-registry-supported.sh.sha256"
sha256sum "$SCR/pack-agent-probe-final-verified.sh" > "$out/pack-agent-probe-final-verified.sh.sha256"
sha256sum "$SCR/commit-agent-probe-native-entry.sh" > "$out/commit-agent-probe-native-entry.sh.sha256"
sha256sum "$SCR/close-agent-probe-registry-supported-release.sh" > "$out/close-agent-probe-registry-supported-release.sh.sha256"

printf '%s\n' "$out"
