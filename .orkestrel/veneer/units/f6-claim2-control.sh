#!/bin/bash
# F6 FOUNDATION fix-round audit, claim 2 host control: mutate the Delegate acquisition branch to refuse a host
# already carrying the `disabled` class, run the complete Delegate test file at baseline, mutated, and restored.
# Log: f6-claim2-control.log.txt. The mutation is applied by exact replacement and restored from a byte copy.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f6-claim2-control.log.txt  # retained as .orkestrel/veneer/units/f6-claim2-control.log.txt
: > "$LOG"
cd /home/user/veneer-f6 || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
F=src/browser/Delegate.ts
echo "=== before: $(sha256sum $F)" >> "$LOG"
cp "$F" "$SCR/f6-Delegate.ts.bak"
run() { echo "=== $1: npm run test:src:browser -- --reporter=default tests/src/browser/Delegate.test.ts ($(date -u +%H:%M:%S))" >> "$LOG"; npm run test:src:browser -- --reporter=default tests/src/browser/Delegate.test.ts >> "$LOG" 2>&1; echo "=== $1 exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"; }
run baseline
python3 - >> "$LOG" 2>&1 <<'PY'
p = 'src/browser/Delegate.ts'
s = open(p).read()
needle = "\t\tif (!button) {\n\t\t\ttry {\n"
assert s.count(needle) == 1, s.count(needle)
s = s.replace(needle, "\t\tif (!button) {\n\t\t\tif (host.classList.contains('disabled')) return\n\t\t\ttry {\n")
open(p, 'w').write(s)
print('mutation applied')
PY
grep -n "classList.contains('disabled')) return" "$F" >> "$LOG"
run mutated
cp "$SCR/f6-Delegate.ts.bak" "$F"
echo "=== after: $(sha256sum $F)" >> "$LOG"
run restored
echo "=== control done" >> "$LOG"
