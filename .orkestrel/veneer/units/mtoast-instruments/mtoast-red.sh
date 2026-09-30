#!/usr/bin/env bash
# Reads the final toast proofs red against the base partial (6586b11) and green against the final
# partial, restoring the final partial byte for byte. Logs to tmp/units/mtoast-red.log.txt and
# tmp/units/mtoast-green.log.txt.
cd /home/user/veneer-mtoast || exit 1
. tmp/units/mtoast-env.sh
partial=src/styles/components/_toast.scss
cmd="npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/toast.test.ts"
cp "$partial" tmp/units/backup/_toast.scss.final
final=$(sha256sum "$partial" | cut -d' ' -f1)
git show 6586b11:"$partial" > "$partial"
{
	echo "# base partial: git show 6586b11:$partial ($(sha256sum "$partial" | cut -d' ' -f1)); final test file"
	echo "\$ npm run build:src:styles && $cmd"
	npm run build:src:styles > /dev/null 2>&1
	echo "build exit=$?"
	$cmd
	echo "exit=$?"
	cat /proc/loadavg
} > tmp/units/mtoast-red.log.txt 2>&1
cp tmp/units/backup/_toast.scss.final "$partial"
[ "$(sha256sum "$partial" | cut -d' ' -f1)" = "$final" ] && echo "final partial restored identical"
{
	echo "# final partial ($final); final test file"
	echo "\$ npm run build:src:styles && $cmd"
	npm run build:src:styles > /dev/null 2>&1
	echo "build exit=$?"
	$cmd
	echo "exit=$?"
	cat /proc/loadavg
} > tmp/units/mtoast-green.log.txt 2>&1
