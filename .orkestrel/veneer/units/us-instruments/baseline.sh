#!/usr/bin/env bash
# Builds a baseline cascade for the compare.mjs instrument, from the 87ff1d0 tree with an optional
# overlay of style sources, through the same `build:src:styles` script the worktree builds with.
#   baseline.sh base                      -> tmp/probe/base/index.css   (87ff1d0 as committed)
#   baseline.sh round1 tmp/probe/round1-src -> tmp/probe/round1/index.css (round-1 style sources)
# Run from the worktree root. Writes only under tmp/probe/.
set -euo pipefail
name="$1"
overlay="${2:-}"
root="$(pwd)"
tree="$root/tmp/probe/$name-tree"
rm -rf "$tree"
mkdir -p "$tree" "$root/tmp/probe/$name"
git -C "$root" archive 87ff1d0 | tar -x -C "$tree"
if [ -n "$overlay" ]; then
	cp -R "$root/$overlay/." "$tree/"
fi
ln -s "$root/node_modules" "$tree/node_modules"
(cd "$tree" && npm run build:src:styles >"$root/tmp/probe/$name/build.log.txt" 2>&1)
cp "$tree/dist/src/styles/index.css" "$root/tmp/probe/$name/index.css"
sha256sum "$root/tmp/probe/$name/index.css"
rm -rf "$tree"
