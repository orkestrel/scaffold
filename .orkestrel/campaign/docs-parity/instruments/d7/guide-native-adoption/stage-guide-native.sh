#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

guide="$FLEET/guide"
out="$SCR/d7n-guide-native-stage"
expected_head='61182c3b727ae9ee410781c48a7008f22da41ff5'
expected_hash='3b2d51b91b978328eb50461f40ec34d4ca5266f4edcc646a4ac26291dcb530b0'
capture="$SCR/d7n-guide-native-authored-gates/diff-final.txt"

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
test "$status" = ' M tests/guides.test.ts' || fail 'Guide status differs from the accepted authored entry.'
actual_hash="$(git -C "$guide" diff --binary | sha256sum | cut -d ' ' -f 1)"
test "$actual_hash" = "$expected_hash" || fail 'Guide unstaged diff differs from the accepted capture.'

mkdir "$out"
git -C "$guide" status --porcelain=v1 > "$out/status-before.txt"
git -C "$guide" diff --binary > "$out/diff-before.txt"
git -C "$guide" add -- tests/guides.test.ts
git -C "$guide" status --porcelain=v1 > "$out/status-after.txt"
git -C "$guide" diff --cached --binary > "$out/diff-after.txt"
cmp "$capture" "$out/diff-after.txt"
printf '%s\n' "$out"
