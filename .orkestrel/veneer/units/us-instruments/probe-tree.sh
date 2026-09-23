#!/usr/bin/env bash
# Builds the probe copy at tmp/probe/tree: the 87ff1d0 tree, the worktree's changed files over it,
# the revised shared files from tmp/probe/shared/tree over those, and a hard-linked node_modules.
# Run from the worktree root. Writes only under tmp/probe/.
set -euo pipefail
root="$(pwd)"
tree="$root/tmp/probe/tree"
rm -rf "$tree"
mkdir -p "$tree"
git -C "$root" archive 87ff1d0 | tar -x -C "$tree"
git -C "$root" diff --name-only 87ff1d0 | while read -r path; do
	mkdir -p "$tree/$(dirname "$path")"
	cp "$root/$path" "$tree/$path"
done
cp -R "$root/tmp/probe/shared/tree/." "$tree/"
cp -al "$root/node_modules" "$tree/node_modules"
echo "probe tree ready: $tree"
