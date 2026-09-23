#!/usr/bin/env bash
# Runs the mutation the per-case matrix found missing: no recorded mutation reddened the sizing
# proof's density-and-dark-island case, which reads the `.w-75` and `.h-50` steps, so this one
# writes the `75` step as a length of the same number.
set -uo pipefail
M="python3 /home/user/veneer-upl/tmp/units/upl-instruments-2/tools/mutate.py"
STYLES="npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts"
$M step-75-length src/styles/utilities/_sizing.scss "75: 75%," "75: 75px," --build -- $STYLES
