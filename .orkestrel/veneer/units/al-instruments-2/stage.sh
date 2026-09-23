#!/usr/bin/env bash
# Stages round 2 on the validation copy tmp/probe/base, which holds c3ac297 (built with
# `git archive c3ac297 | tar -x`, `cp -al node_modules`, and a `base` commit): applies the shared
# patch and copies the four owned files over it, then prints the copy's status.
set -e
root=/home/user/veneer-al
base=$root/tmp/probe/base
git -C "$base" apply "$root/tmp/units/al-shared-2.patch"
for file in src/styles/components/_alert.scss tests/src/styles/components/alert.test.ts app/browser/sections/AlertSection.ts tests/app/browser/sections/AlertSection.test.ts; do
	cp "$root/$file" "$base/$file"
done
git -C "$base" status --porcelain
