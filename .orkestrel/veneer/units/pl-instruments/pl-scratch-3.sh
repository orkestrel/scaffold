#!/usr/bin/env bash
# PREFLIGHT-HOST (pl) round 3 scratch copy: the worktree's tracked files as they stand, node_modules linked,
# dist copied, and pl-shared-3.patch applied (supersedes pl-scratch.sh) to the guide. Created at tmp/probe/pl-scratch, which this
# unit alone creates and removes.
set -eu
W=/home/user/veneer-pl
S=$W/tmp/probe/pl-scratch
rm -rf "$S"
mkdir -p "$S"
cd "$W"
git ls-files -z | xargs -0 cp --parents -t "$S"
ln -s "$W/node_modules" "$S/node_modules"
cp -a "$W/dist" "$S/dist"
cd "$S"
patch -p1 --no-backup-if-mismatch < "$W/tmp/units/pl-shared-3.patch"
cmp "$S/guides/veneer.md" "$W/tmp/probe/pl-guide-patched-3.md"
echo "scratch ready"
