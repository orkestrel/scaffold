#!/usr/bin/env bash
# Builds the validation copy at tmp/probe/base: the tree at a658879, the worktree's node_modules
# hard-linked in, a base commit, the round-1 shared patch applied, and the owned files copied over it.
set -euo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
WT=/home/user/veneer-ac
BASE="$WT/tmp/probe/base"
test ! -e "$BASE" || { echo "stage exists: $BASE"; exit 2; }
mkdir -p "$BASE"
git -C "$WT" archive a658879 | tar -x -C "$BASE"
cp -al "$WT/node_modules" "$BASE/node_modules"
cd "$BASE"
git init -q
git add -A
git -c user.name=stage -c user.email=stage@localhost commit -q -m base
git apply "$WT/tmp/units/ac-shared.patch"
for file in src/styles/components/_accordion.scss tests/src/styles/components/accordion.test.ts app/browser/sections/AccordionSection.ts tests/app/browser/sections/AccordionSection.test.ts; do
	cp "$WT/$file" "$BASE/$file"
done
git status --porcelain
