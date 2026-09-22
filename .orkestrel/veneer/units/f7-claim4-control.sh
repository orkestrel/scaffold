#!/bin/bash
# F7 CAPTURE brief 3 control: with the tightened tree assertions in place, force describeSubject's tree half to its
# fallback and run the setup-browser and journey projects at baseline, mutated, and restored. Log: f7-claim4-control.log.txt.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f7-claim4-control.log.txt
: > "$LOG"
cd /home/user/veneer-f7 || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
F=tests/setupBrowser.ts
echo "=== before: $(sha256sum $F)" >> "$LOG"
cp "$F" "$SCR/f7-setupBrowser.ts.bak"
run() { for gate in test:setup:browser test:journey; do echo "=== $1 $gate ($(date -u +%H:%M:%S))" >> "$LOG"; npm run "$gate" >> "$LOG" 2>&1; echo "=== $1 $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"; done; }
run baseline
python3 - >> "$LOG" 2>&1 <<'PY'
p = 'tests/setupBrowser.ts'
s = open(p).read()
needle = "tree.length > 0 ? tree : 'No element in this subject carries a role.'"
assert s.count(needle) == 1, s.count(needle)
s = s.replace(needle, "'No element in this subject carries a role.'")
open(p, 'w').write(s)
print('mutation applied: the tree half always reads its fallback')
PY
run mutated
cp "$SCR/f7-setupBrowser.ts.bak" "$F"
echo "=== after: $(sha256sum $F)" >> "$LOG"
run restored
echo "=== control done" >> "$LOG"
