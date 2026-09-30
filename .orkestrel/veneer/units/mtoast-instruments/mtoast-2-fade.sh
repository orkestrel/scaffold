#!/usr/bin/env bash
# Runs the fade proof after a styles build into the log named by $1, echoing the command first.
cd /home/user/veneer-mtoast || exit 1
. tmp/units/mtoast-env.sh
cmd="npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/fade.test.ts"
{
	echo "# toast transitions entry: $(grep -A4 "component: 'toast'" tests/setupStyles.ts | grep transitions)"
	echo "\$ npm run build:src:styles && $cmd"
	npm run build:src:styles > /dev/null 2>&1
	echo "build exit=$?"
	$cmd
	echo "exit=$?"
	cat /proc/loadavg
} > "$1" 2>&1
