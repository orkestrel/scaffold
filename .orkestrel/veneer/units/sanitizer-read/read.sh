#!/bin/bash
# Chromium 141 reading of Veneer main b1d314d (J-SANITIZER landed) for the engine session: src:browser, app:browser,
# and setup:browser in the detached worktree /home/user/veneer-read. Logs to this folder as <project>.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
cd /home/user/veneer-read || exit 1
echo "head $(git rev-parse --short HEAD)"
for p in test:src:browser test:app test:setup:browser; do
	log="$S/sanitizer-read/${p//:/-}.log.txt"
	npm run "$p" > "$log" 2>&1
	echo "$p exit=$?"
done
echo done
