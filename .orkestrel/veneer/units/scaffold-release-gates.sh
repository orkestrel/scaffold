#!/usr/bin/env bash
# Prepare the 0.0.76 layer outside the upload window: the package's own prepublishOnly chain, run
# by the Orchestrator so the upload can use --ignore-scripts inside the one-time code's life.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/scaffold-release-gates.log.txt.txt"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) gates start $(git log --oneline -1)" > "$LOG"
for step in "format:check" "lint:check" "check" "build" "test"; do
  echo "== npm run $step" >> "$LOG"
  npm run "$step" >> "$LOG" 2>&1
  echo "exit[$step]=$?" >> "$LOG"
done
echo "== npm run test:distribution -- --mode release" >> "$LOG"
npm run test:distribution -- --mode release >> "$LOG" 2>&1
echo "exit[test:distribution]=$?" >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) gates end" >> "$LOG"
grep "^exit\[" "$LOG"
