#!/usr/bin/env bash
# TIP round 3: apply tp-shared-3.patch to a fresh 2a3f223 extract and compare every file it touches
# with the validation copy.
set -uo pipefail
W=/home/user/veneer-tp
P=$W/tmp/probe
F=$P/tp-fresh
mkdir -p "$F"
git -C "$W" archive 2a3f223 | tar -x -C "$F"
cd "$F"
GIT_CEILING_DIRECTORIES="$P" git apply --check "$W/tmp/units/tp-shared-3.patch"
echo "apply-check exit $?"
GIT_CEILING_DIRECTORIES="$P" git apply "$W/tmp/units/tp-shared-3.patch"
echo "apply exit $?"
status=0
for f in $(grep -E '^\+\+\+ b/' "$W/tmp/units/tp-shared-3.patch" | sed 's#^+++ b/##'); do
	cmp -s "$F/$f" "$P/base/$f" || { echo "differs: $f"; status=1; }
done
echo "byte-compare exit $status"
