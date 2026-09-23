#!/bin/bash
# nb-landing-probe-gates.sh: after nb-landing-probe-2.sh resolved the NAVBAR patches in the scratch worktree
# probe-land-nb (the owned files already copied in), hard-link node_modules, format the
# touched trees, then typecheck and lint. Runs only when the container is idle (no chain, no unit gates). Log: the
# probe's stdout, kept as nb-landing-probe-gates.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; W=$S/probe-land-nb
cd $W || exit 1
[ -e node_modules ] || cp -al /home/user/veneer/node_modules node_modules
nice npx oxfmt app tests guides src > /dev/null 2>&1; echo "--- formatted"
echo "=== nb check $(date -u +%H:%M:%S)"; nice npm run check 2>&1 | grep -E "error TS" | head -12; echo "nb check exit=${PIPESTATUS[0]}"
echo "=== nb lint $(date -u +%H:%M:%S)"; nice npm run lint:check 2>&1 | grep -E "error|warning|Found" | head -8; echo "nb lint exit=${PIPESTATUS[0]}"
echo "=== nb format:check $(date -u +%H:%M:%S)"; nice npm run format:check 2>&1 | tail -3; echo "nb format exit=${PIPESTATUS[0]}"
echo "=== done $(date -u +%H:%M:%S)"
