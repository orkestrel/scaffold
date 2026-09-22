#!/bin/bash
# Land VALIDATION on the session branch: repad the merged guide table, finish the cherry-pick, fold the
# unit's ledger rows into the guide's § Tokens (D14), then run the refresh loop. Log: land-bfv.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/land-bfv.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer || exit 1
npx oxfmt --config .oxfmtrc.json --write guides/veneer.md >> "$LOG" 2>&1; echo "=== oxfmt guide exit=$?" >> "$LOG"
git add guides/veneer.md && GIT_EDITOR=true git cherry-pick --continue >> "$LOG" 2>&1; echo "=== cherry-pick continue exit=$? $(git rev-parse --short HEAD)" >> "$LOG"
python3 $S/ledger-merge.py /home/user/veneer-bfv --apply >> "$LOG" 2>&1; echo "=== ledger-merge exit=$?" >> "$LOG"
npx oxfmt --config .oxfmtrc.json --write guides/veneer.md >> "$LOG" 2>&1; echo "=== oxfmt guide 2 exit=$?" >> "$LOG"
npm run build:src >> "$LOG" 2>&1; echo "=== build:src exit=$?" >> "$LOG"
npm run test:conformance >> "$LOG" 2>&1; echo "=== test:conformance exit=$?" >> "$LOG"
git status --porcelain >> "$LOG"; echo "=== done $(date -u +%H:%M:%S)" >> "$LOG"
