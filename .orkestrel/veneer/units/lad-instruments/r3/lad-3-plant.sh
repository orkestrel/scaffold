#!/usr/bin/env bash
# Round 3 plant for LEDGER-ADDITIONS: restores the raw-spelling recognition in the class reader,
# runs the setup project into tmp/units/lad-3-plant-escaped.log.txt, restores the backup, and
# records cmp against the backup and the src diffstat.
set -u
cd /home/user/veneer-lad
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
FILE=tests/setupServer.ts
BACKUP=tmp/units/lad-3-backups/plant-escaped.bak
LOG=tmp/units/lad-3-plant-escaped.log.txt
cp "$FILE" "$BACKUP" || exit 1
python3 - "$FILE" <<'PY' || exit 1
import sys
path = sys.argv[1]
text = open(path).read()
old = "\t\t\t\t\tname?.end === step.index &&\n\t\t\t\t\t['is', 'where'].includes(name.text.toLowerCase()),\n"
new = "\t\t\t\t\t/:(?:is|where)$/iu.test(selector.slice(0, step.index)),\n"
assert text.count(old) == 1, old
open(path, 'w').write(text.replace(old, new))
PY
{
	echo "plant=escaped file=$FILE"
	diff "$BACKUP" "$FILE"
	echo "load=$(cat /proc/loadavg)"
	npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts
	echo "exit=$?"
} > "$LOG" 2>&1
cp "$BACKUP" "$FILE" || exit 1
echo "cmp=$(cmp "$BACKUP" "$FILE" && echo identical)" >> "$LOG"
echo "src diffstat: $(git diff --stat -- src)" >> "$LOG"
