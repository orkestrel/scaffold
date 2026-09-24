#!/bin/bash
# merge-main-3.sh: merges Veneer origin/main (the engine session's J-TESTPIN, f22f02c) into the session branch with a
# merge commit, installs from the merged lockfile with npm ci --ignore-scripts, writes the lockfile marker, and runs the
# fast gates and the browser setup proof J-TESTPIN touched. Stops on a conflict. Log: merge-main-3.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; LOG=$R/merge-main-3.log.txt; : > "$LOG"
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
{
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty"; exit 2; }
git fetch -q origin main && echo "=== origin/main $(git rev-parse --short origin/main); session head $(git rev-parse --short HEAD)"
N="$(git log -1 --format=%an)"; M="$(git log -1 --format=%ae)"
git -c user.name="$N" -c user.email="$M" -c merge.conflictStyle=diff3 merge --no-ff -m "Merge Veneer main (J-TESTPIN) into the session branch

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" origin/main; echo "=== merge exit=$?"
c=$(git diff --name-only --diff-filter=U); [ -z "$c" ] || { echo "=== CONFLICTS: $(echo $c)"; exit 4; }
echo "=== merged $(git rev-parse --short HEAD)"
npm ci --ignore-scripts > /dev/null 2>&1; echo "=== npm ci exit=$?"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256 && echo "=== marker $(cat node_modules/.orkestrel-lock.sha256)"
npm run check > /dev/null 2>&1; echo "=== check exit=$?"
npm run lint:check > /dev/null 2>&1; echo "=== lint:check exit=$?"
echo "command: npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/setupBrowser.test.ts"
npx vitest run --config vite.config.ts --no-cache --reporter=dot tests/setupBrowser.test.ts 2>&1 | grep -E "Tests |FAIL|No test" | head -5; echo "=== setupBrowser proof exit=${PIPESTATUS[0]}"
git status --porcelain
} >> "$LOG" 2>&1
grep -E '^===|Tests ' "$LOG"
