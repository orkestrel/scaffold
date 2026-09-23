#!/usr/bin/env bash
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/test
echo "== oxfmt"; npx oxfmt --write src/browser/helpers.ts tests/setupBrowser.ts tests/src/browser/helpers.test.ts guides/test.md 2>&1 | tail -2; echo "exit=${PIPESTATUS[0]}"
echo "== format:check"; npm run format:check 2>&1 | tail -2; echo "exit=${PIPESTATUS[0]}"
echo "== lint:check"; npm run lint:check 2>&1 | tail -3; echo "exit=${PIPESTATUS[0]}"
echo "== check"; npm run check > /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/t4r3/check.log.txt 2>&1; echo "exit=$?"; grep -c "error TS" /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/t4r3/check.log.txt
echo "== scoped"; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "clipsOverflow|readClipEdge|readClipMargin|measureContent" 2>&1 | grep -E "Test Files|Tests |FAIL"; echo "exit=${PIPESTATUS[0]}"
echo "== guides"; npm run test:guides 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Test Files|Tests "; echo "exit=${PIPESTATUS[0]}"
echo "== status"; git status --porcelain
