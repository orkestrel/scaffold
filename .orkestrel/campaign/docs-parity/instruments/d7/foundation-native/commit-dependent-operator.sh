#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
expected=${2-}
out="$SCR/$label"
campaign=.orkestrel/campaign/docs-parity
prompt=prompt.txt
accepted="$SCR/packed/d7n-scaffold-upper-git-final-pack/extract/package"
verdict="$SCAFFOLD/$campaign/d7n-dependent-upload-handoff-verdict.md"
parser="$SCR/d7n-dependent-upload-prompt-parse/parse.exit.txt"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run() {
	local name="$1"
	local status=0
	shift
	if timeout --kill-after=15s 120s "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	return "$status"
}

[[ "$label" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'record label is required'
[[ "$expected" =~ ^[0-9a-f]{64}$ ]] || fail 'prompt digest is unsafe'
test ! -e "$out" || fail 'checkpoint evidence exists'
test "$(git -C "$SCAFFOLD" branch --show-current)" = main || fail 'Scaffold must be on main'
test ! -e "$SCAFFOLD/publish.txt" || fail 'publish file must be absent'
test -f "$SCAFFOLD/$prompt" || fail 'prompt file must be present'
test -f "$verdict" || fail 'handoff verdict is absent'
test "$(awk '{ sub(/\r$/, ""); if (NF) verdict=$0 } END { print verdict }' "$verdict")" = 'VERDICT: PASS' || fail 'handoff verdict does not pass'
test "$(tr -d '\r\357\273\277' < "$parser")" = 0 || fail 'prompt parser did not pass'
test "$(sha256sum "$SCAFFOLD/$prompt" | awk '{print $1}')" = "$expected" || fail 'prompt digest differs'
git -C "$SCAFFOLD" diff --cached --quiet || fail 'index is not empty'
mkdir "$out"
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > "$out/status-before.txt"
while IFS= read -r entry; do
	path="${entry:3}"
	case "$path" in
		"$prompt"|"$campaign"/*) ;;
		*) fail "unrelated change: $path" ;;
	esac
done < "$out/status-before.txt"
run confirm-before bash "$SCR/confirm-dependent-layer.sh" "$label-before"
run fetch git -C "$SCAFFOLD" fetch origin
run ancestry git -C "$SCAFFOLD" merge-base --is-ancestor origin/main HEAD
run check git -C "$SCAFFOLD" diff --check
cmp "$accepted/package.json" "$SCAFFOLD/package.json"
diff -r "$accepted/dist" "$SCAFFOLD/dist" > "$out/scaffold-dist-before.diff.txt"
git -C "$SCAFFOLD" add -- "$campaign" "$prompt"
run commit git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Record dependent operator handoff: $label" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
run push git -C "$SCAFFOLD" push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
for pair in 'origin-main origin/main' 'origin-campaign origin/claude/orkestrel-npm-audit-deps-14ibta' 'origin-docs origin/claude/docs-parity-windows-01a0810d'; do
	set -- $pair
	run "$1" git -C "$SCAFFOLD" rev-parse "$2"
	test "$(<"$out/$1.stdout.txt")" = "$(git -C "$SCAFFOLD" rev-parse HEAD)" || fail "remote ref differs: $1"
done
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > "$out/status-after.txt"
test ! -s "$out/status-after.txt" || fail 'Scaffold is not clean'
cmp "$accepted/package.json" "$SCAFFOLD/package.json"
diff -r "$accepted/dist" "$SCAFFOLD/dist" > "$out/scaffold-dist-after.diff.txt"
run confirm-after bash "$SCR/confirm-dependent-layer.sh" "$label-after"
printf '%s\n' "$out"
