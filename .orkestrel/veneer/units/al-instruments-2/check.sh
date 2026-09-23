#!/usr/bin/env bash
# Writes the shared patch from the validation copy's tracked changes, returns the copy to c3ac297 by
# reversing that patch and removing the owned files, proves the tree equals c3ac297's tree, and runs
# `git apply --check` against it. stage.sh re-stages the copy afterwards.
root=/home/user/veneer-al
base=$root/tmp/probe/base
patch=$root/tmp/units/al-shared-2.patch
git -C "$base" diff > "$patch"
echo "$ git -C tmp/probe/base diff --stat"
git -C "$base" diff --stat
echo "$ git -C tmp/probe/base apply -R tmp/units/al-shared-2.patch"
git -C "$base" apply -R "$patch"
echo "exit=$?"
for file in src/styles/components/_alert.scss tests/src/styles/components/alert.test.ts app/browser/sections/AlertSection.ts tests/app/browser/sections/AlertSection.test.ts; do
	rm "$base/$file"
done
echo "$ git -C tmp/probe/base status --porcelain"
git -C "$base" status --porcelain
echo "(end of status)"
echo "$ git -C tmp/probe/base rev-parse HEAD^{tree}; git -C /home/user/veneer-al rev-parse c3ac297^{tree}"
git -C "$base" rev-parse 'HEAD^{tree}'
git -C "$root" rev-parse 'c3ac297^{tree}'
echo "$ git -C tmp/probe/base apply --check tmp/units/al-shared-2.patch"
git -C "$base" apply --check "$patch"
echo "exit=$?"
echo "$ files in the patch"
grep '^+++ b/' "$patch" | sed 's|^+++ b/||' | sort
