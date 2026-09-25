#!/usr/bin/env bash
# Runs the round-2 gates in order, each logged under tmp/units with its exit code appended.
cd /home/user/veneer-jf
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
npx vitest run --config vite.config.ts --no-cache --project setup:browser > tmp/units/jf-2-setup-browser.log.txt 2>&1; echo "exit=$?" >> tmp/units/jf-2-setup-browser.log.txt
npx vitest run --config vite.config.ts --no-cache --project app:browser > tmp/units/jf-2-app-browser.log.txt 2>&1; echo "exit=$?" >> tmp/units/jf-2-app-browser.log.txt
npm run format:check > tmp/units/jf-2-format.log.txt 2>&1; echo "exit=$?" >> tmp/units/jf-2-format.log.txt
npm run lint:check > tmp/units/jf-2-lint.log.txt 2>&1; echo "exit=$?" >> tmp/units/jf-2-lint.log.txt
npm run check > tmp/units/jf-2-check.log.txt 2>&1; echo "exit=$?" >> tmp/units/jf-2-check.log.txt
