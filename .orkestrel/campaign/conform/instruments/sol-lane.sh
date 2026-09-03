#!/bin/bash
# Read-only Sol lane on the Cursor bench: bash tmp/work/sol-lane.sh <unit> <brief> <cwd> [lock]
export BENCH_LOCK=${4:-.bench-sol.lock}
export CURSOR_GROK_MODEL=gpt-5.6-sol-high
bash /home/user/scaffold/tmp/work/grok5.sh "$1" "$2" "$3"
