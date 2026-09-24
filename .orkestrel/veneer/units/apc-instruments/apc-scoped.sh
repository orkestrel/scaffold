#!/bin/bash
# AP-COLOR scoped styles run: rebuilds the styles bundle, then runs the owned style test files through the src:styles project.
# Usage: apc-scoped.sh <log-name> [test files...]; defaults to every file this unit touches.
cd /home/user/veneer-apc || exit 1
NAME=$1; shift
FILES=("$@")
if [ ${#FILES[@]} -eq 0 ]; then FILES=(tests/src/styles/utilities/color.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/components/button.test.ts tests/src/styles/components/validation.test.ts tests/src/styles/elements/a.test.ts tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts); fi
/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh "$NAME" bash -c "npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot ${FILES[*]}"
