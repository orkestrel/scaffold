#!/usr/bin/env bash
# Re-runs the M6-registry-rule mutation of ct-mutations.sh alone, because its first run also timed out
# the Playwright-driven oracle case under host load, and appends the run to ct-mutations.log.txt.
# The functions are ct-mutations.sh's, copied here unchanged apart from the log reset.
set -u
ROOT=/home/user/veneer-ct
COPY=$ROOT/tmp/probe/ct-copy
OUT=$ROOT/tmp/units
LOG=$OUT/ct-mutations.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$COPY" || exit 2
echo "=== re-run alone after the controls, load average $(cut -d' ' -f1-3 /proc/loadavg)" >> "$LOG"
id=M6-registry-rule-2
file=tests/setupServer.ts
saved=$OUT/ct-mutation-$id.orig
cp "$file" "$saved"
before=$(sha256sum "$file" | cut -d' ' -f1)
python3 "$OUT/ct-mutate.py" M6-registry-rule "$file" || exit 3
{ echo "=== $id"; echo "site: $file"; diff -u "$saved" "$file" | sed '1,2d'; } >> "$LOG"
npm run test:setup > "$OUT/ct-mutation-$id.log.txt" 2>&1
code=$?
cp "$saved" "$file"
after=$(sha256sum "$file" | cut -d' ' -f1)
rm "$saved"
{
	echo "command: npm run test:setup"
	echo "build exit: skipped"
	echo "test exit: $code"
	echo "summary: $(sed 's/\x1b\[[0-9;]*m//g' "$OUT/ct-mutation-$id.log.txt" | grep -E '^ +Tests ' | tail -1 | sed 's/^ *//')"
	echo "failing:"
	sed 's/\x1b\[[0-9;]*m//g' "$OUT/ct-mutation-$id.log.txt" | grep -E '^ +(×|FAIL) ' | sed 's/^ *//' | sort -u
	echo "restored: $([ "$before" = "$after" ] && echo identical || echo DIFFERENT)"
	echo
} >> "$LOG"
