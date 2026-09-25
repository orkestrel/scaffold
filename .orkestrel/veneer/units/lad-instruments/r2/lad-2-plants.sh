#!/usr/bin/env bash
# Round 2 plants for LEDGER-ADDITIONS. Each plant backs its file up under tmp/units/lad-2-backups,
# applies one mutation, runs the named projects into tmp/units/lad-2-plant-<name>.log.txt, restores
# the backup, and records cmp against the backup and the diffstat of the planted file against the
# pre-plant reading.
set -u
cd /home/user/veneer-lad
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
BACKUPS=tmp/units/lad-2-backups
mkdir -p "$BACKUPS"
[ -z "$(git diff --stat -- src)" ] || { echo "src differs from the base"; exit 1; }
run_plant() {
	local name=$1 file=$2 projects=$3 old=$4 new=$5
	local log=tmp/units/lad-2-plant-$name.log.txt
	local backup=$BACKUPS/$name.bak
	cp "$file" "$backup" || exit 1
	python3 - "$file" "$old" "$new" <<'PY' || exit 1
import sys
path, old, new = sys.argv[1:4]
text = open(path).read()
assert text.count(old) == 1, (path, old)
open(path, 'w').write(text.replace(old, new))
PY
	{
		echo "plant=$name file=$file"
		diff "$backup" "$file"
		for project in $projects; do
			case $project in
				setup) npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts; echo "exit=$?" ;;
				conformance) npm run test:conformance; echo "exit=$?" ;;
			esac
		done
	} > "$log" 2>&1
	cp "$backup" "$file" || exit 1
	echo "cmp=$(cmp "$backup" "$file" && echo identical)" >> "$log"
	echo "src diffstat: $(git diff --stat -- src)" >> "$log"
}
run_plant where-dropped tests/setupServer.ts "setup conformance" '/:(?:is|where)$/iu' '/:(?:is)$/iu'
run_plant not-read tests/setupServer.ts "setup conformance" '/:(?:is|where)$/iu' '/:(?:is|where|not)$/iu'
run_plant owner-relabel guides/veneer.md "conformance" '| `table`        | `.caption-bottom`      ' '| `btn`          | `.caption-bottom`      '
run_plant layer-clause tests/setupServer.ts "setup" '		!recording.has(block.selector) &&
		(block.layer === undefined || LAYER_COMPONENTS[block.layer] === undefined)' '		!recording.has(block.selector)'
run_plant name-dedupe tests/setupServer.ts "setup" '				name: `${block.selector} { ${property} }`,' '				name:
					property.startsWith("--") && !vocabulary.properties.includes(property)
						? property
						: `${block.selector} { ${property} }`,'
