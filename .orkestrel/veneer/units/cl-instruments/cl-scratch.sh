#!/usr/bin/env bash
# LEDGER (cl) scratch copy: copies the worktree's tracked files, the owned edits included, to
# tmp/probe/cl-scratch, links the worktree's node_modules, makes the copy its own git root so the
# worktree's `tmp` ignore rule does not hide it from oxfmt and oxlint, and applies cl-shared.patch.
# Usage: bash tmp/units/cl-scratch.sh; then bash tmp/units/cl-gates.sh <label>.
set -eu
root=/home/user/veneer-cl
scratch=$root/tmp/probe/cl-scratch
if [ -e "$scratch" ]; then echo "refusing: $scratch exists" >&2; exit 2; fi
mkdir -p "$scratch"
cd "$root"
git ls-files -z | xargs -0 cp --parents -t "$scratch"
ln -s "$root/node_modules" "$scratch/node_modules"
cd "$scratch"
git init -q .
git apply "$root/tmp/units/cl-shared.patch"
echo "scratch ready: $scratch"
