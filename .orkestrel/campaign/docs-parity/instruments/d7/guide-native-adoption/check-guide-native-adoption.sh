#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

guide="$FLEET/guide"
archive="$SCR/packed/d7n-guide-api-correction"
previous="$archive/extract/package"
installed="$SCAFFOLD/node_modules/@orkestrel/guide"
label=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture_diff() {
	git -C "$guide" diff HEAD > "$1"
}

capture_status() {
	git -C "$guide" status --porcelain=v1 > "$1"
}

capture_index() {
	git -C "$guide" ls-files --stage > "$1"
}

capture_manifests() {
	sha256sum "$guide/package.json" "$guide/package-lock.json" > "$1"
}

check_preservation() {
	local name="$1"
	capture_diff "$out/$name.diff.txt"
	capture_status "$out/$name.status.txt"
	capture_index "$out/$name.index.txt"
	capture_manifests "$out/$name.manifests.sha256"
	cmp "$out/before.diff.txt" "$out/$name.diff.txt"
	cmp "$out/before.status.txt" "$out/$name.status.txt"
	cmp "$out/before.index.txt" "$out/$name.index.txt"
	cmp "$out/before.manifests.sha256" "$out/$name.manifests.sha256"
	if grep -Eq '^wrote' "$out/$name.stderr.txt" "$out/$name.stdout.txt"; then
		fail "rewrite marker found in $name output"
	fi
}

run_guides() {
	local name="$1"
	shift
	local status=0
	if timeout --kill-after=15s 180s npm --prefix "$guide" run test:guides -- "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	printf '%s exit %s\n' "$name" "$status"
	test "$status" -eq 0
	check_preservation "$name"
}

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
out="$SCR/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
test -d "$previous/dist/src" || fail "prior extracted archive is absent: $previous/dist/src"
test -d "$guide/dist/src" || fail "canonical Guide dist is absent: $guide/dist/src"
test -d "$installed/dist/src" || fail "installed Guide dist is absent: $installed/dist/src"
test -f "$archive/orkestrel-guide-0.0.18.tgz" || fail 'prior Guide archive is absent'

mkdir "$out"
sha256sum "$archive/orkestrel-guide-0.0.18.tgz" > "$out/archive.sha256"
git -C "$guide" rev-parse HEAD > "$out/head.txt"
capture_diff "$out/before.diff.txt"
capture_status "$out/before.status.txt"
capture_index "$out/before.index.txt"
capture_manifests "$out/before.manifests.sha256"

run_guides guides
run_guides guides-to-guide --to guide
run_guides guides-to-source --to source

if diff -r "$previous/dist/src" "$guide/dist/src" > "$out/archive-canonical-dist.diff.txt"; then
	printf '0\n' > "$out/archive-canonical-dist.exit.txt"
	else
	status=$?
	printf '%s\n' "$status" > "$out/archive-canonical-dist.exit.txt"
	exit "$status"
fi
if diff -r "$guide/dist/src" "$installed/dist/src" > "$out/canonical-installed-dist.diff.txt"; then
	printf '0\n' > "$out/canonical-installed-dist.exit.txt"
	else
	status=$?
	printf '%s\n' "$status" > "$out/canonical-installed-dist.exit.txt"
	exit "$status"
fi
if diff -u "$previous/README.md" "$guide/README.md" > "$out/archive-canonical-readme.diff.txt"; then
	printf '0\n' > "$out/archive-canonical-readme.exit.txt"
	else
	status=$?
	printf '%s\n' "$status" > "$out/archive-canonical-readme.exit.txt"
	exit "$status"
fi

printf 'guides exit %s\n' "$(<"$out/guides.exit.txt")"
printf 'guides-to-guide exit %s\n' "$(<"$out/guides-to-guide.exit.txt")"
printf 'guides-to-source exit %s\n' "$(<"$out/guides-to-source.exit.txt")"
printf 'evidence %s\n' "$out"
