#!/usr/bin/env bash
# Run every target's distribution proof the way prepublishOnly runs it: --mode release,
# where an unreachable registry or an unlaunchable browser fails rather than skips.
for T in "$@"; do
  N="$(basename "$T")"; cd "$T" || continue
  if ! node -p "require('./package.json').scripts['test:distribution']?1:0" 2>/dev/null | grep -q 1; then
    echo "$N | no test:distribution declared"; continue
  fi
  OUT="$(npm run test:distribution -- --mode release 2>&1)"; CODE=$?
  LINE="$(printf '%s' "$OUT" | grep -E '^ +Tests +' | tail -1 | tr -s ' ')"
  DUR="$(printf '%s' "$OUT" | grep -E '^ +Duration' | tail -1 | tr -s ' ')"
  if [ $CODE -eq 0 ]; then echo "$N | RELEASE PASS |$LINE |$DUR"
  else
    echo "$N | RELEASE FAIL (exit $CODE)"
    printf '%s\n' "$OUT" | grep -E "AssertionError|Error:|FAIL|✕|×" | head -6 | sed "s/^/    $N > /"
  fi
done
echo "RELEASE SWEEP COMPLETE"
