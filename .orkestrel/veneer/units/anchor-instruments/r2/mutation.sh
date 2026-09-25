#!/usr/bin/env bash
# Execution step 3 of E-ID-ANCHOR round 2: round 1's mutation over the round-2 tree. Deletes the
# `position-visibility: anchors-visible;` declaration the `anchor-visibility` mixin writes into each of
# the dropdown, tooltip, and popover partials, rebuilds the styles, runs the owned styles files and the
# conformance project, then restores the mixin byte-identically from a backup, rebuilds, and compares
# SHA-256 digests.
source /home/user/veneer-anchor/tmp/units/r2/env.sh
file=src/styles/_mixins.scss
backup=tmp/units/r2/_mixins.scss.mutation.bak
sha=tmp/units/r2/anchor-mutation-sha.txt
styles=tmp/units/r2/anchor-mutation-styles.log.txt
conformance=tmp/units/r2/anchor-mutation-conformance.log.txt
cp "$file" "$backup"
sha256sum "$file" > "$sha"
python3 - "$file" <<'PY'
import pathlib, sys
path = pathlib.Path(sys.argv[1])
text = path.read_text()
line = '\t\tposition-visibility: anchors-visible;\n'
if text.count(line) != 1:
    sys.exit('declaration not found once')
path.write_text(text.replace(line, ''))
PY
{
	echo "\$ diff $backup $file (the round-2 mixin against the mutation)"
	diff "$backup" "$file"
	echo '$ npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts'
	npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts
	echo "exit=$?"
	echo '$ grep -c position-visibility dist/src/styles/index.css'
	grep -c position-visibility dist/src/styles/index.css
} > "$styles" 2>&1
{
	echo '$ npm run test:conformance (over the mutated build)'
	npm run test:conformance
	echo "exit=$?"
} > "$conformance" 2>&1
cp "$backup" "$file"
sha256sum "$file" >> "$sha"
npm run build:src:styles > tmp/units/r2/anchor-mutation-rebuild.log.txt 2>&1
echo "rebuild exit=$?" >> tmp/units/r2/anchor-mutation-rebuild.log.txt
cat "$sha"
tail -1 tmp/units/r2/anchor-mutation-rebuild.log.txt
grep -E '^exit=|Tests  | FAIL |AssertionError' "$styles" "$conformance"
