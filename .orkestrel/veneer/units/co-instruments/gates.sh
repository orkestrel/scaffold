#!/bin/bash
# Runs the unit's gates in the validation copy, cheap first, one log per gate under the tools directory.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
C=$S/co-unit-check; T=$S/co-unit-tools; L=$T/logs; mkdir -p $L
export PATH="$S/npm11/node_modules/.bin:$PATH"
cd $C || exit 1
run() { local name=$1; shift; "$@" > "$L/$name.log.txt" 2>&1; local code=$?; echo "$name exit=$code" | tee -a "$L/summary.txt"; }
: > "$L/summary.txt"
for g in "$@"; do
	case $g in
		format) run format npm run format:check ;;
		lint) run lint npm run lint:check ;;
		check) run check npm run check ;;
		build) run build npm run build:src ;;
		styles) run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/collapse.test.ts ;;
		section) run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CollapseSection.test.ts ;;
		app) run app npm run test:app ;;
		setup) run setup npm run test:setup ;;
		conformance) run conformance npm run test:conformance ;;
		guides) run guides npm run test:guides ;;
		policy) run policy npm run test:policy ;;
		service) run service npm run test:service ;;
		stylesall) run stylesall npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot ;;
	esac
done
