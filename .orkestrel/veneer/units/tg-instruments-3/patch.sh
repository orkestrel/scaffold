#!/bin/bash
# Round 3 of the TOGGLES unit. Writes tmp/units/tg-shared-3.patch: one unified diff against a658879
# over every shared file the validation copy changes, each file with its index line. The pristine
# side is tmp/probe/orig (a658879 extracted with git archive); the changed side is tmp/probe/base.
# `git diff --no-index` writes the index lines from the blobs' own hashes; the sed rewrites the
# orig/ and base/ prefixes to the repository paths. Changed from round 2: the output path only.
cd /home/user/veneer-tg/tmp/probe || exit 1
out=/home/user/veneer-tg/tmp/units/tg-shared-3.patch
: > "$out"
for f in app/browser/constants.ts guides/veneer.md tests/setup.ts tests/setupStyles.test.ts tests/setupStyles.ts; do
	git diff --no-index --full-index "orig/$f" "base/$f" | sed -e "s#^diff --git a/orig/$f b/base/$f#diff --git a/$f b/$f#" -e "s#^--- a/orig/$f#--- a/$f#" -e "s#^+++ b/base/$f#+++ b/$f#" >> "$out"
done
grep -c '^diff --git' "$out"
