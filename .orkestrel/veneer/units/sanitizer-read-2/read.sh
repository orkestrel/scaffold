#!/bin/bash
# Chromium 141 re-read of Veneer main 6d27028 (J-SANITIZER-CONTEXT landed) for the engine session: ConfigSanitizer.test.ts
# alone, then src:browser, in the detached worktree /home/user/veneer-read. Successor to sanitizer-read/read.sh (b1d314d).
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
cd /home/user/veneer-read || exit 1
git checkout -q --detach 6d27028 || exit 1
rm -rf node_modules/.vite
echo "head $(git rev-parse --short HEAD) chromium $(/opt/pw-browsers/chromium-1194/chrome-linux/chrome --version 2>/dev/null)"
f=$(git ls-files 'tests/src/browser/**/ConfigSanitizer.test.ts' | head -1)
echo "file $f"
npx vitest run --config vite.config.ts --no-cache --project src:browser "$f" > "$S/sanitizer-read-2/configsanitizer-alone.log.txt" 2>&1
echo "ConfigSanitizer alone exit=$?"
npm run test:src:browser > "$S/sanitizer-read-2/test-src-browser.log.txt" 2>&1
echo "test:src:browser exit=$?"
echo done
