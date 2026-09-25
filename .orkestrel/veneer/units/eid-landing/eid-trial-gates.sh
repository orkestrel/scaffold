#!/bin/bash
# Rehearses the E-ID landing gates on the trial integration in $S/eid-trial (node_modules linked from /home/user/veneer):
# oxfmt on the changed files, then format:check, lint:check, check, build:src, test:conformance, test:guides,
# test:src:styles, and test:setup, each logged under $S/eid-trial-logs/. Runs every gate; reports each exit.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
L=$S/eid-trial-logs; rm -rf $L; mkdir -p $L; cd $S/eid-trial || exit 1
[ -e node_modules ] || ln -s /home/user/veneer/node_modules node_modules
./node_modules/.bin/oxfmt --config .oxfmtrc.json $(git diff --name-only) > $L/oxfmt.log.txt 2>&1; echo "oxfmt exit=$?"
for g in format:check lint:check check build:src test:conformance test:guides test:src:styles test:setup; do
  npm run $g > $L/${g//:/-}.log.txt 2>&1; echo "$g exit=$? $(grep -E '^ +Tests ' $L/${g//:/-}.log.txt | tail -1)"
done
