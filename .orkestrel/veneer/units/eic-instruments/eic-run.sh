#!/usr/bin/env bash
# Rebuilds the styles cascade and runs the named styles test files; usage: eic-run.sh <log> <file>...
set -o pipefail
cd /home/user/veneer-eic
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
log=$1; shift
{ npm run build:src:styles >/dev/null 2>&1 || { echo BUILD FAILED; exit 9; }
  npx vitest run --config configs/src/vite.styles.config.ts --no-cache "$@"; echo "exit $?"; } > "$log" 2>&1
tail -12 "$log"
