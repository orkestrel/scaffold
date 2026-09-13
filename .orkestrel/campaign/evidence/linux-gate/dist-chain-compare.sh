#!/usr/bin/env bash
# dist-chain-compare.sh — U-fix-2 audit claim 11, second conjunct: build the predecessor tip
# 9e21cd7 in a system temporary tree and compare its dist/src and dist/bin against the checkout's
# dist built at 9a250bb (by final-verify3.sh). Material content only: maps excluded, whitespace
# ignored. The checkout is never edited.
set -u
base="${1:-9e21cd7}"
root=$(mktemp -d)
git -C /home/user/scaffold archive "$base" | tar -x -C "$root"
ln -s /home/user/scaffold/node_modules "$root/node_modules"
echo "== build $base in $root"
( cd "$root" && npm run build >/dev/null 2>&1; echo "build exit=$?" )
for d in src bin; do
  echo "== dist/$d: $base vs checkout (maps excluded, whitespace ignored)"
  diff -r -w -B -x '*.map' "$root/dist/$d" "/home/user/scaffold/dist/$d" > "$root/$d.diff"; echo "diff exit=$? lines=$(wc -l < "$root/$d.diff")"
  cat "$root/$d.diff" | head -40
done
rm -rf "$root"
