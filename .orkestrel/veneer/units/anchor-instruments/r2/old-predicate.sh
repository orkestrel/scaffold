#!/usr/bin/env bash
# Item 3 of E-ID-ANCHOR round 2: runs the button-reboot case of tests/src/styles/mixins.test.ts with its
# population predicate set back to round 1's base form over the built cascade, then restores the file
# byte-identically from a backup and compares SHA-256 digests.
source /home/user/veneer-anchor/tmp/units/r2/env.sh
file=tests/src/styles/mixins.test.ts
backup=tmp/units/r2/mixins.test.ts.old-predicate.bak
log=tmp/units/r2/anchor-old-predicate.log.txt
sha=tmp/units/r2/anchor-old-predicate-sha.txt
cp "$file" "$backup"
sha256sum "$file" > "$sha"
python3 - "$file" <<'PY'
import pathlib, sys
path = pathlib.Path(sys.argv[1])
text = path.read_text()
before = "rule instanceof CSSStyleRule && WHOLE_GROUP.test(rule.selectorText) ? [rule] : [],"
after = "rule instanceof CSSStyleRule && rule.selectorText.startsWith(':where(') ? [rule] : [],"
if text.count(before) != 1:
    sys.exit('reboot predicate not found once')
path.write_text(text.replace(before, after))
PY
{
	echo "\$ diff $backup $file (the round-2 file against the planted predicate)"
	diff "$backup" "$file"
	echo "\$ npm run test:src:styles -- $file -t 'writes the button reboot back on every longhand'"
	npm run test:src:styles -- "$file" -t 'writes the button reboot back on every longhand'
	echo "exit=$?"
} > "$log" 2>&1
cp "$backup" "$file"
sha256sum "$file" >> "$sha"
cat "$sha"
grep -E '^exit=|Tests  |AssertionError|FAIL' "$log"
