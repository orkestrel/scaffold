#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

label=${1-}
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'output label must be safe'
test "$#" = 1 || fail 'output label is required'
out="$SCR/$label"
test ! -e "$out" || fail 'output exists'

target="$FLEET/markdown"
old="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
packed="$SCR/packed/d7n-markdown-following-final-pack"
final="$packed/orkestrel-markdown-0.0.14.tgz"
test -d "$target/.git" || fail 'canonical target is absent'
test -f "$old" || fail 'old archive is absent'
test -f "$final" || fail 'final archive is absent'

mkdir "$out"
printf '%s  %s\n' '02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3' "$old" | sha256sum --check > "$out/old-archive-check.txt"
sha256sum --check "$packed/archive.sha256" > "$out/final-archive-check.txt"
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
tar -xzf "$old" -C "$out" package/dist

status=0
diff -r "$out/package/dist" "$target/dist" > "$out/raw.diff.txt" || status=$?
printf '%s\n' "$status" > "$out/raw.exit.txt"
test "$status" = 0 || test "$status" = 1

status=0
diff -r --exclude='*.map' "$out/package/dist" "$target/dist" > "$out/no-map.diff.txt" || status=$?
printf '%s\n' "$status" > "$out/no-map.exit.txt"
test "$status" = 0 || test "$status" = 1

status=0
diff -r -w --exclude='*.map' "$out/package/dist" "$target/dist" > "$out/no-map-whitespace.diff.txt" || status=$?
printf '%s\n' "$status" > "$out/no-map-whitespace.exit.txt"
test "$status" = 0 || test "$status" = 1

status=0
diff -r "$packed/extract/package/dist" "$target/dist" > "$out/final.diff.txt" || status=$?
printf '%s\n' "$status" > "$out/final.exit.txt"
test "$status" = 0

git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/head-before.txt" "$out/head-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
printf '0\n' > "$out/comparison.exit.txt"
