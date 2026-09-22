#!/bin/bash
# F5c TOKENS-TRUTH fix-round audit, claim 2 host control: mutate the guide's subtle-tier dark cell from 15% to 16%,
# run the § Reference map value gate (tokens.test.ts, styles project) at baseline, mutated, and restored.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f5c-claim2-control.log.txt
: > "$LOG"
cd /home/user/veneer-f5c || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
F=guides/veneer.md
echo "=== before: $(sha256sum $F)" >> "$LOG"
cp "$F" "$SCR/f5c-veneer.md.bak"
run() { echo "=== $1: npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/tokens.test.ts ($(date -u +%H:%M:%S))" >> "$LOG"; npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/tokens.test.ts >> "$LOG" 2>&1; echo "=== $1 exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"; }
run baseline
python3 - >> "$LOG" 2>&1 <<'PY'
p = 'guides/veneer.md'
s = open(p).read()
needle = '| `color-mix(in oklab, {fill} 15%, var(--vn-surface-body-base))` | `--bs-{role}-bg-subtle`'
assert s.count(needle) == 1, s.count(needle)
s = s.replace(needle, needle.replace('15%', '16%'))
open(p, 'w').write(s)
print('mutation applied: subtle-tier dark cell 15% -> 16%')
PY
run mutated
grep -o 'drift[^\n]\{0,160\}' "$LOG" | head -3 >> "$LOG"
cp "$SCR/f5c-veneer.md.bak" "$F"
echo "=== after: $(sha256sum $F)" >> "$LOG"
run restored
echo "=== control done" >> "$LOG"
