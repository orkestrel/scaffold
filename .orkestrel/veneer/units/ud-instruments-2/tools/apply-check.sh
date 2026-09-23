#!/usr/bin/env bash
# Returns the landing copy to e4e6a40 (reverses the returned patch and removes the copied owned
# files), shows that its tracked tree equals the base commit, and checks that the patch applies.
set -uo pipefail
root=/home/user/veneer-ud
land=$root/tmp/probe/land
patch=$root/tmp/units/ud-shared-2.patch
cd "$land"
echo "copy: $land"
echo "patch sha256=$(sha256sum "$patch" | cut -d' ' -f1)"
git apply -R "$patch"; echo "git apply -R exit=$?"
for f in $(cd "$root" && git status --porcelain | awk '$1=="??"{print $2}'); do rm "$land/$f"; done
echo "git status --porcelain (untracked and modified, ignored files excluded):"; git status --porcelain
git diff --quiet HEAD; echo "git diff --quiet HEAD exit=$?"
echo "base commit tree equals e4e6a40 tree: $([ "$(git rev-parse HEAD^{tree})" = "$(git -C "$root" rev-parse e4e6a40^{tree})" ] && echo true || echo false)"
echo "command: git -C tmp/probe/land apply --check tmp/units/ud-shared-2.patch"
git -C "$land" apply --check "$patch"; echo "git apply --check exit=$?"
echo "index lines: $(grep -c '^index ' "$patch"); diff headers: $(grep -c '^diff --git' "$patch")"
