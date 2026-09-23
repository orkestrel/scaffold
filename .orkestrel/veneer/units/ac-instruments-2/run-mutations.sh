#!/usr/bin/env bash
# Re-runs every round-1 mutation against the round-2 validation copy, one at a time, and logs each
# result line to logs/mutations-round-1-set.log.txt.
HERE="$(cd "$(dirname "$0")" && pwd)"
python3 "$HERE/mutate.py" $(cat "$HERE/mutation-names.txt") > "$HERE/logs/mutations-round-1-set.log.txt" 2>&1
echo "mutate exit=$?"
