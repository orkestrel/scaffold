#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local suffix="$1"
	git -C "$target" rev-parse HEAD > "$out/head-$suffix.txt"
	git -C "$target" branch --show-current > "$out/branch-$suffix.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
	git -C "$target" ls-files --stage > "$out/index-$suffix.txt"
	git -C "$target" diff HEAD --binary > "$out/diff-$suffix.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-$suffix.sha256"
}

compare() {
	local name="$1"
	shift
	if "$@" > "$out/$name.txt" 2> "$out/$name.stderr.txt"; then
		printf '0\n' > "$out/$name.exit.txt"
		return 0
	else
		status=$?
		printf '%s\n' "$status" > "$out/$name.exit.txt"
		if [ "$status" -gt 1 ]; then
			return "$status"
		fi
		return 0
	fi
}

case "$package" in
	codec) version='0.0.3'; baseline="$SCR/packed/d7n-foundation-codec.eyQ8Pi/orkestrel-codec-0.0.3.tgz" ;;
	contract) version='0.0.17'; baseline="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz" ;;
	msg) version='0.0.10'; baseline="$SCR/packed/d7n-foundation-msg.N3AAAA/orkestrel-msg-0.0.10.tgz" ;;
	sse) version='0.0.7'; baseline="$SCR/packed/d7n-foundation-sse.zb8CDG/orkestrel-sse-0.0.7.tgz" ;;
	test) version='0.0.14'; baseline="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz" ;;
	*) fail 'package must be codec, contract, msg, sse, or test' ;;
esac
test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
target="$FLEET/$package"
out="$SCR/packed/$label"
prepublish="$SCR/d7n-$package-final-prepublish"
archive="$out/orkestrel-$package-$version.tgz"
test -d "$target/.git" || fail "canonical package directory is absent: $target"
test ! -e "$out" || fail "evidence directory exists: $out"
test -f "$baseline" || fail "baseline archive is absent: $baseline"
test -f "$prepublish/action.exit.txt" || fail "prepublish evidence is absent: $prepublish"
test "$(<"$prepublish/action.exit.txt")" = '0' || fail 'prepublish action did not exit zero.'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'target manifest name differs from the selected canonical package.'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version" || fail 'target manifest version differs from the expected pending version.'
test -f "$prepublish/manifests-after.sha256" || fail 'prepublish manifest evidence is absent.'
test -f "$prepublish/diff-after.txt" || fail 'prepublish diff evidence is absent.'
test -f "$prepublish/index-after.txt" || fail 'prepublish index evidence is absent.'
cmp "$prepublish/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$prepublish/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$prepublish/index-after.txt" <(git -C "$target" ls-files --stage)

mkdir -p "$out/extract" "$out/baseline"
capture before
printf '%q ' npm pack --ignore-scripts --pack-destination "$out" > "$out/pack.command.txt"
printf '\n' >> "$out/pack.command.txt"
status=0
if (cd "$target" && timeout --kill-after=15s 120s npm pack --ignore-scripts --pack-destination "$out") > "$out/pack.stdout.txt" 2> "$out/pack.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/pack.exit.txt"
test "$status" -eq 0
test -f "$archive" || fail "expected archive is absent: $archive"
sha256sum "$archive" > "$out/archive.sha256"
tar -tzf "$archive" > "$out/archive-members.txt"
tar -xzf "$archive" -C "$out/extract"
cmp "$out/extract/package/package.json" "$target/package.json"
if diff -r "$out/extract/package/dist" "$target/dist" > "$out/final-dist.diff.txt"; then
	printf '0\n' > "$out/final-dist.exit.txt"
else
	status=$?
	printf '%s\n' "$status" > "$out/final-dist.exit.txt"
	exit "$status"
fi
sha256sum "$baseline" > "$out/baseline.sha256"
tar -xzf "$baseline" -C "$out/baseline"
compare baseline-dist.diff-qr diff -qr "$out/baseline/package/dist/src" "$out/extract/package/dist/src"
compare baseline-dist-without-maps diff -r --exclude='*.map' "$out/baseline/package/dist/src" "$out/extract/package/dist/src"
if [ "$(<"$out/baseline-dist-without-maps.exit.txt")" -ne 0 ]; then
	compare baseline-dist-whitespace diff -r -w -B --exclude='*.map' "$out/baseline/package/dist/src" "$out/extract/package/dist/src"
fi
capture after
cmp "$out/head-before.txt" "$out/head-after.txt"
cmp "$out/branch-before.txt" "$out/branch-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
printf '%s %s %s %s\n' "$out" "$(cut -d ' ' -f 1 "$out/archive.sha256")" "$(<"$out/baseline-dist.diff-qr.exit.txt")" "$(<"$out/baseline-dist-without-maps.exit.txt")"
