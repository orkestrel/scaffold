#!/bin/bash
# Runs the named gates in the validation copy, one log per gate under logs/, and appends each exit
# code to logs/summary.txt. Usage: gates.sh GATE... (format lint check build setup styles section
# conformance guides policy app).
W=/home/user/veneer-dd
C=$W/tmp/probe/base
L=$W/tmp/units/dd-instruments-2/logs
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd "$C" || exit 1
run() {
	local name=$1
	shift
	"$@" >"$L/gate-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code" | tee -a "$L/summary.txt"
}
for g in "$@"; do
	case $g in
	format) run format npm run format:check ;;
	lint) run lint npm run lint:check ;;
	check) run check npm run check ;;
	build) run build npm run build:src ;;
	setup) run setup npm run test:setup ;;
	styles) run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/dropdown.test.ts ;;
	section) run section npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/DropdownSection.test.ts ;;
	conformance) run conformance npm run test:conformance ;;
	guides) run guides npm run test:guides ;;
	policy) run policy npm run test:policy ;;
	app) run app npm run test:app ;;
	esac
done
