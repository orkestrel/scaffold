#!/usr/bin/env bash
# Runs the E-ID-CODE round-4 gates in order, one log per gate under tmp/units/logs/r4-gate-<name>.log.txt, appends
# each exit code to its log as exit=<code>, and prints it. The Content gate runs the app:browser section suite alone:
# that project excludes tests/app/browser/integration.test.ts.
cd /home/user/veneer-eic
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
run() { name=$1; shift; log="tmp/units/logs/r4-gate-$name.log.txt"; "$@" > "$log" 2>&1; echo "exit=$?" >> "$log"; echo "$name $(tail -1 "$log")"; }
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run owned-styles tmp/units/eic-run.sh tmp/units/logs/r4-gate-owned-styles-run.log.txt tests/src/styles/index.test.ts tests/src/styles/elements/code.test.ts tests/src/styles/elements/pre.test.ts tests/src/styles/elements/kbd.test.ts tests/src/styles/elements/samp.test.ts tests/src/styles/elements/var.test.ts
run test-src-styles npm run test:src:styles
run test-setup npm run test:setup
run test-conformance npm run test:conformance
run test-guides npm run test:guides
run app-content npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/ContentSection.test.ts
