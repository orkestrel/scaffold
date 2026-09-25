#!/usr/bin/env bash
# Builds the styles and runs the four owned styles test files, logged to the file named by $1.
source /home/user/veneer-anchor/tmp/units/r2/env.sh
log="tmp/units/r2/$1"
{
	echo '$ npm run build:src:styles'
	npm run build:src:styles
	echo "exit=$?"
	echo '$ npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts'
	npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts
	echo "exit=$?"
} > "$log" 2>&1
grep -E '^exit=|Tests  ' "$log"
