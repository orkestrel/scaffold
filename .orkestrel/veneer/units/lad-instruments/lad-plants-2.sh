#!/usr/bin/env bash
# Successor of lad-plants.sh. Run 1 backed up into a scratch path another unit had already made a
# directory, so its restore failed and the second plant ran over the first. This run backs up into
# its own directory, stops if the backup fails, and refuses to start while src differs from the base.
# Each plant: back up the partial, plant, run the conformance project into the plant's log, restore
# the backup byte for byte, and record the restoring diffstat over src.
set -u
cd /home/user/veneer-lad
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
SCRATCH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/lad-plants
mkdir -p "$SCRATCH"
[ -z "$(git diff --stat -- src)" ] || { echo "src differs from the base"; exit 1; }
run_plant() {
	local name=$1 file=$2 program=$3
	local log=tmp/units/lad-plant-$name.log.txt
	local backup=$SCRATCH/$name.scss
	cp "$file" "$backup" || exit 1
	python3 -c "$program" "$file" || exit 1
	{
		echo "plant=$name file=$file"
		git diff -- "$file"
		npm run test:conformance
		echo "exit=$?"
	} > "$log" 2>&1
	cp "$backup" "$file" || exit 1
	{
		echo "restored: git diff --stat -- src"
		git diff --stat -- src
		echo "cmp=$(cmp "$backup" "$file" && echo identical)"
	} >> "$log" 2>&1
}
run_plant blockquote src/styles/elements/_blockquote.scss "
import sys
p=sys.argv[1]; s=open(p).read()
old='border-left: var(--vn-space-2) solid currentColor;'
assert s.count(old)==1
open(p,'w').write(s.replace(old,'border-left: 97px solid currentColor;'))
"
run_plant unattributed src/styles/components/_table.scss "
import sys
p=sys.argv[1]; s=open(p).read()
open(p,'w').write(s+'\n@layer components { .audit-unrecorded { color: red } }\n')
"
