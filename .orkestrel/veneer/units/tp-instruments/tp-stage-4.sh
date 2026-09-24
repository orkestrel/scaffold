#!/usr/bin/env bash
# TIP round 4: rebuild the validation copy tmp/probe/base from 2a3f223, the owned files, and the
# round-2 shared patch, plus a pristine extract tmp/probe/tp-orig for the patch diff.
set -euo pipefail
W=/home/user/veneer-tp
P=$W/tmp/probe
mkdir -p "$P/base" "$P/tp-orig"
git -C "$W" archive 2a3f223 | tar -x -C "$P/base"
git -C "$W" archive 2a3f223 | tar -x -C "$P/tp-orig"
cp -al "$W/node_modules" "$P/base/node_modules"
cd "$W"
git status --porcelain | sed -n 's/^?? //p' | while read -r f; do
	mkdir -p "$P/base/$(dirname "$f")"
	cp "$f" "$P/base/$f"
done
cd "$P/base"
GIT_CEILING_DIRECTORIES="$P" git apply --verbose "$W/tmp/units/tp-shared-3.patch"
: > "$P/tp-empty.ignore"
echo "stage exit 0"
