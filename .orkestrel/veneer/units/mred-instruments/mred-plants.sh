#!/usr/bin/env bash
# Runs each plant against the landed partials: applies it, rebuilds the styles, runs the placeholder
# and spinner proofs, restores the landed bytes, and checks the restore is byte-identical.
# Each plant logs to tmp/units/mred-plant-<name>.log.txt. The `base` plant is the failing-first
# reading of the final proofs against the 21c821a partials.
set -u
cd /home/user/veneer-mred || exit 2
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
PARTIALS='src/styles/components/_spinner.scss src/styles/components/_placeholder.scss'
mkdir -p tmp/units/landed
cp src/styles/components/_spinner.scss src/styles/components/_placeholder.scss tmp/units/landed/
before=$(sha256sum $PARTIALS)
for name in "$@"; do
	log="tmp/units/mred-plant-$name.log.txt"
	{
		echo "plant=$name"
		cat /proc/loadavg
		python3 tmp/units/mred-plant.py "$name" || { echo "plant-apply-failed"; exit 3; }
		git diff --no-color -- $PARTIALS
		npm run build:src:styles >/dev/null 2>&1
		echo "build-exit=$?"
		npx vitest run --config configs/src/vite.styles.config.ts \
			tests/src/styles/components/placeholder.test.ts tests/src/styles/components/spinner.test.ts
		echo "exit=$?"
	} > "$log" 2>&1
	cp tmp/units/landed/_spinner.scss src/styles/components/_spinner.scss
	cp tmp/units/landed/_placeholder.scss src/styles/components/_placeholder.scss
	after=$(sha256sum $PARTIALS)
	if [ "$before" = "$after" ]; then echo "restore=byte-identical" >> "$log"; else echo "restore=DIFFERS" >> "$log"; fi
	echo "$after" >> "$log"
done
npm run build:src:styles > tmp/units/mred-build-final.log.txt 2>&1
echo "exit=$?" >> tmp/units/mred-build-final.log.txt
