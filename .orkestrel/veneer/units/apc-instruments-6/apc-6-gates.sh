#!/bin/bash
# AP-COLOR round-6 gates, successor to apc-5-final.sh: the scoped color proof, then format:check, lint:check, and check,
# each logged as tmp/units/apc-6-<gate>.log.txt through tmp/units/apc-run.sh.
cd /home/user/veneer-apc || exit 1
unset CAPTURE
tmp/units/apc-run.sh apc-6-scoped-color bash -c "npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/color.test.ts"
echo "scoped-color exit=$?"
for g in format:check lint:check check; do
	tmp/units/apc-run.sh "apc-6-${g//:/-}" npm run "$g"
	echo "$g exit=$?"
done
