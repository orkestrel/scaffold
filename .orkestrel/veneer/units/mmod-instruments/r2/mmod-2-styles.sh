#!/usr/bin/env bash
# Round 2 of E-ID-MOTION-MODAL. Builds the styles bundle and runs the named styles files.
# usage: mmod-2-styles.sh LOG FILES...
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
log=$1; shift
{ echo "+ npm run build:src:styles"; npm run build:src:styles >/dev/null 2>&1; echo "build=$?"
  echo "+ npx vitest run --config configs/src/vite.styles.config.ts $*"
  npx vitest run --config configs/src/vite.styles.config.ts "$@"; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
grep -E "×|FAIL|AssertionError|Error:|Test Files|Tests |exit=|build=|^[0-9.]+ [0-9.]+ " "$log" | head -60
