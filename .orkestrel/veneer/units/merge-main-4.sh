#!/bin/bash
# merge-main-4.sh: merges Veneer origin/main (the engine session's J-SNAPSHOT, c21fd17) into the session branch after
# chain-main-5 read the session head green but for the engine's Placement case, then runs the fast gates and the
# projects the merge reaches (src:browser, where J-SNAPSHOT lives; setup:browser; guides). Stops on a conflict.
# Log: merge-main-4.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; LOG=$R/merge-main-4.log.txt; : > "$LOG"
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
{
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty"; exit 2; }
git fetch -q origin main && echo "=== origin/main $(git rev-parse --short origin/main); session head $(git rev-parse --short HEAD)"
N="$(git log -1 --format=%an)"; M="$(git log -1 --format=%ae)"
git -c user.name="$N" -c user.email="$M" -c merge.conflictStyle=diff3 merge --no-ff -m "Merge Veneer main (J-SNAPSHOT) into the session branch

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" origin/main; echo "=== merge exit=$?"
c=$(git diff --name-only --diff-filter=U); [ -z "$c" ] || { echo "=== CONFLICTS: $(echo $c)"; exit 4; }
echo "=== merged $(git rev-parse --short HEAD)"
npm run format:check > /dev/null 2>&1; echo "=== format:check exit=$?"
npm run lint:check > /dev/null 2>&1; echo "=== lint:check exit=$?"
npm run check > /dev/null 2>&1; echo "=== check exit=$?"
npm run test:src:browser 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |^ FAIL " | head -5; echo "=== src:browser exit=${PIPESTATUS[0]}"
npm run test:setup:browser 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests " ; echo "=== setup:browser exit=${PIPESTATUS[0]}"
npm run test:guides 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests "; echo "=== guides exit=${PIPESTATUS[0]}"
git status --porcelain
} >> "$LOG" 2>&1
grep -E '^===|Tests |FAIL' "$LOG"
