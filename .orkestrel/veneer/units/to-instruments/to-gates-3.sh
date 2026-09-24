#!/usr/bin/env bash
# Round 3: runs the unit gates on the validation copy and prints each command's exit and result line.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
B=/home/user/veneer-to/tmp/probe/base
L=/home/user/veneer-to/tmp/units/to-logs-3
mkdir -p "$L"
cd "$B"
run() { local name=$1; shift; "$@" > "$L/$name.txt" 2>&1; local code=$?; echo "== $name exit $code :: $*"; grep -E "Tests +[0-9]|Test Files|passed|failed|error|✓ built|Found [0-9]+ (warning|error)" "$L/$name.txt" | grep -v externalized | tail -3; }
for g in "$@"; do
case $g in
 check) run check npm run check ;;
 lint) run lint npx oxlint --config .oxlintrc.json --deny-warnings src/styles/index.scss tests/setupStyles.ts tests/setupStyles.test.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts tests/src/styles/components/toast.test.ts app/browser/sections/ToastSection.ts tests/app/browser/sections/ToastSection.test.ts ;;
 fmt) run fmt npx oxfmt --config .oxfmtrc.json --check src/styles/index.scss tests/setupStyles.ts tests/setupStyles.test.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts guides/veneer.md src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts app/browser/sections/ToastSection.ts tests/app/browser/sections/ToastSection.test.ts ;;
 build) run build npm run build:src ;;
 styles) run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/toast.test.ts tests/src/styles/components/close.test.ts ;;
 section) run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ToastSection.test.ts ;;
 app) run app npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts ;;
 setup) run setup npm run test:setup ;;
 setupstyles) run setupstyles npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts ;;
 conformance) run conformance npm run test:conformance ;;
 guides) run guides npm run test:guides ;;
 policy) run policy npm run test:policy ;;
 config) run config npm run test:config ;;
esac
done
