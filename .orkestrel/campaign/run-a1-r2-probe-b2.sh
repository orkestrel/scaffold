#!/usr/bin/env bash
# Corrected probe for A1-R2 referral (b), in the isolated worktree at 573ba71.
WT=/c/Users/mikes/WebstormProjects/agent-audit
OUT=/c/Users/mikes/WebstormProjects/scaffold/tmp/units/a1-r2-probe-b2.log.txt
: > "$OUT"
if [ ! -e "$WT/node_modules" ]; then
	powershell.exe -NoProfile -Command "New-Item -ItemType Junction -Path 'C:\\Users\\mikes\\WebstormProjects\\agent-audit\\node_modules' -Target 'C:\\Users\\mikes\\WebstormProjects\\agent\\node_modules' | Out-Null" >> "$OUT" 2>&1
fi
ls -d "$WT/node_modules" >> "$OUT" 2>&1 || { echo "junction missing"; cat "$OUT"; exit 1; }
cd "$WT" || exit 9
echo "=== control: whole helpers.test.ts at 573ba71" | tee -a "$OUT"
npm run test:src:core -- tests/src/core/helpers.test.ts >> "$OUT" 2>&1
echo "control exit=$? (expected 0)" | tee -a "$OUT"
echo "=== mutation: neutralize listener removal (cleanup.abort) in both readers" | tee -a "$OUT"
sed -i -E 's/^(\t+)cleanup\.abort\(\)$/\1void cleanup/' src/core/helpers.ts
echo "mutated lines: $(grep -c 'void cleanup' src/core/helpers.ts)" | tee -a "$OUT"
npm run test:src:core -- tests/src/core/helpers.test.ts >> "$OUT" 2>&1
echo "mutant exit=$? (expected non-zero if the listener assertions can fail)" | tee -a "$OUT"
grep -E "^ (FAIL|×)|✗|AssertionError|Tests " "$OUT" | tail -12
git -C "$WT" checkout -- src/core/helpers.ts
echo "restored: $(git -C "$WT" status --porcelain | wc -l) dirty paths (expected 0)" | tee -a "$OUT"
