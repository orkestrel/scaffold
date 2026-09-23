#!/usr/bin/env bash
# Builds the landing copy at tmp/probe/land: every tracked file at e4e6a40, committed as the base of
# a fresh git repository, then the worktree's owned files copied over it (left untracked there), then
# the round-1 shared patch applied with `git apply`, and a hard-linked node_modules. The round-2
# shared edits are made in the copy afterwards; `git diff` there produces the returned patch.
set -euo pipefail
root=/home/user/veneer-ud
land=$root/tmp/probe/land
if [ -e "$land" ]; then echo "landing copy exists: $land" >&2; exit 1; fi
mkdir -p "$land"
(cd "$root" && git ls-files -z | xargs -0 cp --parents -t "$land")
cd "$land"
git init -q
git config user.email probe@localhost
git config user.name probe
git add -A
git commit -q -m 'e4e6a40 tracked files'
echo "base commit: $(git rev-parse HEAD)"
bash "$root/tmp/units/ud-instruments-2/tools/sync.sh"
git apply "$root/tmp/units/ud-shared.patch"
cp -al "$root/node_modules" "$land/node_modules"
git status --porcelain
