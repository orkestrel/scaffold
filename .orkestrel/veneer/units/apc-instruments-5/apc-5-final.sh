#!/bin/bash
# AP-COLOR round-5 evidence, successor to apc-4-final.sh: the scoped color proof first (styles bundle rebuilt through
# `npm run build:src:styles`, then the color proof alone), then the four gates the round-4 brief named. Each step logs
# to tmp/units/apc-5-<name>.log.txt through tmp/units/apc-run.sh.
cd /home/user/veneer-apc || exit 1
unset CAPTURE
tmp/units/apc-run.sh apc-5-scoped-color bash -c "npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/color.test.ts"
echo "scoped color exit=$?"
for g in format:check lint:check check test:src:styles; do
	tmp/units/apc-run.sh "apc-5-final-${g//:/-}" npm run "$g"
	echo "$g exit=$?"
done
