#!/usr/bin/env bash
# Plants one retired declaration back into src/styles/_mixins.scss, rebuilds the cascade, runs the
# owned style proofs, and restores the partial from its backup byte for byte.
# Usage: tret-plant.sh NAME OLD NEW   (OLD must occur exactly once in the partial)
cd /home/user/veneer-tret || exit 1
. tmp/units/tret-env.sh
name=$1
log=tmp/units/tret-plant-$name.log.txt
target=src/styles/_mixins.scss
backup=tmp/units/backup/_mixins.scss.$name
cp "$target" "$backup"
{
	echo "\$ plant $name in $target"
	python3 - "$target" "$2" "$3" <<'PY'
import sys
path, old, new = sys.argv[1], sys.argv[2].encode().decode('unicode_escape'), sys.argv[3].encode().decode('unicode_escape')
text = open(path).read()
assert text.count(old) == 1, f'expected one occurrence of {old!r}'
open(path, 'w').write(text.replace(old, new))
PY
	diff -u "$backup" "$target"
	echo '$ npm run build:src:styles'
	npm run build:src:styles 2>&1 | tail -3
	echo '$ npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts tests/src/styles/mixins.test.ts'
	npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts tests/src/styles/mixins.test.ts 2>&1 | grep -v externalized
	echo "vitest exit=${PIPESTATUS[0]}"
	cp "$backup" "$target"
	echo '$ restore and compare with the pre-plant bytes'
	cmp "$backup" "$target" && echo 'restored identical'
	git diff --stat -- "$target"
	echo '$ npm run build:src:styles (restored)'
	npm run build:src:styles 2>&1 | tail -1
} > "$log" 2>&1
echo "$name done"
