#!/bin/bash
# F4 audit claim 5, the Orchestrator's independent negative control (2026-09-22): run the restoration matrix
# with the three engine additions reverted, then restored. Log beside this script. The engine file is copied
# to the scratchpad before the revert and restored from that copy byte for byte; git diff --exit-code on the
# file against the copy proves the restoration.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f4-claim5-control.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
cp src/browser/Button.ts $SCR/Button.ts.f4
python3 - <<'PY' >> "$LOG" 2>&1
import pathlib
p=pathlib.Path('src/browser/Button.ts'); t=p.read_text()
for line in ["\treadonly #classified: boolean\n","\t\tthis.#classified = host.hasAttribute('class')\n","\t\tif (!this.#classified && this.#host.classList.length === 0) this.#host.removeAttribute('class')\n"]:
    assert t.count(line)==1, line
    t=t.replace(line,'')
p.write_text(t); print('=== engine additions reverted (three lines)')
PY
echo "=== matrix on the reverted engine ($(date -u +%H:%M:%S))" >> "$LOG"
timeout 900 npm run test:src:browser -- -t "restores original membership and attribute presence" >> "$LOG" 2>&1
echo "=== reverted exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
cp $SCR/Button.ts.f4 src/browser/Button.ts
cmp src/browser/Button.ts $SCR/Button.ts.f4 && echo "=== engine restored byte for byte" >> "$LOG"
echo "=== matrix on the restored engine ($(date -u +%H:%M:%S))" >> "$LOG"
timeout 900 npm run test:src:browser -- -t "restores original membership and attribute presence" >> "$LOG" 2>&1
echo "=== restored exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
echo "=== control done" >> "$LOG"
