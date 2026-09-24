#!/usr/bin/env bash
# FRAME-HELPERS round 2, P1: the pixel-check mutation over the outline-painting focus cases, then
# the same filter unmutated. The mutation makes the focus method read no outline anywhere.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
FILTER='reveals the focusable container|drives a link of each link specimen|drives one list-group action|drives one menu item|reveals the skip link'
file=tests/setupBrowser.ts
before="readStyle(worn, 'outline-style') === 'none'"
after="readStyle(worn, 'outline-style') !== '' || worn === worn"
python3 - "$file" "$before" "$after" <<'PY'
import sys
p, a, b = sys.argv[1:]
s = open(p).read()
assert s.count(a) == 1
open(p, 'w').write(s.replace(a, b))
PY
npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "$FILTER" > tmp/units/fh2-p1-red.log.txt 2>&1
echo "exit $?" >> tmp/units/fh2-p1-red.log.txt
python3 - "$file" "$after" "$before" <<'PY'
import sys
p, a, b = sys.argv[1:]
s = open(p).read()
assert s.count(a) == 1
open(p, 'w').write(s.replace(a, b))
PY
npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "$FILTER" > tmp/units/fh2-p1-green.log.txt 2>&1
echo "exit $?" >> tmp/units/fh2-p1-green.log.txt
