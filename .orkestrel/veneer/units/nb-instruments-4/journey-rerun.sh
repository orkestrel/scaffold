#!/usr/bin/env bash
# Re-runs the light-390 journey alone in the stage, after its run inside `journey.sh` was killed
# with SIGKILL (exit 137) partway through; that log is kept as `journey-light-390-killed.log.txt`.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
STAGE=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb4/stage
I=/home/user/veneer-nb/tmp/units/nb-instruments-4
LOG=$I/logs/journey-light-390.log.txt
cd "$STAGE" || exit 1
echo '$ npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390' > "$LOG"
npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 > "$I/logs/.journey.out" 2>&1
echo "exit $?" >> "$LOG"
sed 's/\x1b\[[0-9;]*m//g' "$I/logs/.journey.out" | grep -vE '^\s*$|\[vite\]|Port [0-9]+ is in use' >> "$LOG"
rm -f "$I/logs/.journey.out"
