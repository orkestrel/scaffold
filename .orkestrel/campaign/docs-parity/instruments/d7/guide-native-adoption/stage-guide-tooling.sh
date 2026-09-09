#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

guide="$FLEET/guide"
out="$SCR/d7n-guide-tooling-stage"
expected_head='a4f3cd93647ceb44d723cec2315a383e60d24f47'
expected_hash='4526dc75e766a00c1e5005475dc722b96c9710827a55ee7db15fe4e15cae6568'
capture="$SCR/d7n-guide-native-tooling-gates/diff-final.txt"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

test ! -e "$out" || fail "evidence directory exists: $out"
test -f "$capture" || fail "accepted diff capture is absent: $capture"
test "$(git -C "$guide" branch --show-current)" = 'claude/orkestrel-npm-audit-deps-14ibta' || fail 'Guide branch differs from the accepted branch.'
test "$(git -C "$guide" rev-parse HEAD)" = "$expected_head" || fail 'Guide HEAD differs from the accepted commit.'
git -C "$guide" diff --cached --quiet || fail 'Guide has a staged diff.'
status="$(git -C "$guide" status --porcelain=v1)"
test "$status" = $' M package.json\n D scripts/docs.ts' || fail 'Guide status differs from the accepted tooling delta.'
actual_hash="$(git -C "$guide" diff --binary | sha256sum | cut -d ' ' -f 1)"
test "$actual_hash" = "$expected_hash" || fail 'Guide unstaged diff differs from the accepted capture.'

mkdir "$out"
git -C "$guide" status --porcelain=v1 > "$out/status-before.txt"
git -C "$guide" diff --binary > "$out/diff-before.txt"
git -C "$guide" add -- package.json scripts/docs.ts
git -C "$guide" status --porcelain=v1 > "$out/status-after.txt"
git -C "$guide" diff --cached --binary > "$out/diff-after.txt"
cmp "$capture" "$out/diff-after.txt"
printf '%s\n' "$out"
