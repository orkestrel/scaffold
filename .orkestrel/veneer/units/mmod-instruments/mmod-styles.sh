#!/usr/bin/env bash
# Builds the styles bundle and runs the named styles files; usage: mmod-styles.sh LOG FILES...
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
log=$1; shift
{ npm run build:src:styles >/dev/null 2>&1; echo "build=$?"; npx vitest run --config configs/src/vite.styles.config.ts "$@"; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
grep -E "✓|×|FAIL|AssertionError|Test Files|Tests |exit=|^[0-9.]+ [0-9.]+ " "$log" | grep -v "✓" | head -60
