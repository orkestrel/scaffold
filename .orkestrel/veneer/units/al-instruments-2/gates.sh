#!/usr/bin/env bash
# Runs the unit's gates on the validation copy tmp/probe/base (c3ac297 with the shared patch and the
# owned files staged by stage.sh), cheap first, one log per gate under logs/, and prints each exit
# with the log's result lines.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-al/tmp/probe/base
logs=/home/user/veneer-al/tmp/units/al-instruments-2/logs
gate() {
	local name=$1
	shift
	"$@" > "$logs/$name.log.txt" 2>&1
	echo "$name exit=$? :: $(grep -E 'Tests |Test Files|All matched|Found [0-9]+ warning|error' "$logs/$name.log.txt" | tr -s ' ' | tr '\n' ' ' | cut -c1-300)"
}
gate format npm run format:check
gate lint npm run lint:check
gate check npm run check
gate build npm run build:src
gate styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/alert.test.ts tests/src/styles/components/close.test.ts
gate section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/CloseSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
gate guides npm run test:guides
gate policy npm run test:policy
gate setup npm run test:setup
gate conformance npm run test:conformance
