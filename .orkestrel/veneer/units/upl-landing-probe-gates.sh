#!/bin/bash
# upl-landing-probe-gates.sh: after upl-landing-probe-2.sh resolved the UTIL-PLACEMENT patches in the scratch worktree
# probe-land-upl3, copy the unit's owned files from /home/user/veneer-upl in, hard-link node_modules, format the
# touched trees, then typecheck and lint. Runs only when the container is idle (no chain, no unit gates). Log: the
# probe's stdout, kept as upl-landing-probe-gates.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; W=$S/probe-land-upl3
cd $W || exit 1
for f in $(git -C /home/user/veneer-upl status --porcelain | awk '{print $2}'); do mkdir -p "$(dirname $f)"; cp "/home/user/veneer-upl/$f" "$f"; done; echo "--- owned files copied: $(git -C /home/user/veneer-upl status --porcelain | wc -l)"
[ -e node_modules ] || cp -al /home/user/veneer/node_modules node_modules
nice npx oxfmt app tests guides src > /dev/null 2>&1; echo "--- formatted"
echo "=== upl check $(date -u +%H:%M:%S)"; nice npm run check 2>&1 | grep -E "error TS" | head -12; echo "upl check exit=${PIPESTATUS[0]}"
echo "=== upl lint $(date -u +%H:%M:%S)"; nice npm run lint:check 2>&1 | grep -E "error|warning|Found" | head -8; echo "upl lint exit=${PIPESTATUS[0]}"
echo "=== upl format:check $(date -u +%H:%M:%S)"; nice npm run format:check 2>&1 | tail -3; echo "upl format exit=${PIPESTATUS[0]}"
echo "=== done $(date -u +%H:%M:%S)"
