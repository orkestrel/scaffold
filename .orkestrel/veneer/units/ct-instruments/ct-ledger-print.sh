#!/usr/bin/env bash
# Prints the theme ledger rows the way the conformance gates print them: removes every `theme` row
# from the scratch copy's guide (the `#### theme` table and the theme Additions rows), runs
# `npm run test:conformance`, restores the guide from its saved original, checks the restored
# digest, and extracts each row the ledger gates name as unrecorded into ct-ledger-print.txt.
set -u
ROOT=/home/user/veneer-ct
COPY=$ROOT/tmp/probe/ct-copy
OUT=$ROOT/tmp/units
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$COPY" || exit 2
cp guides/veneer.md "$OUT/ct-ledger-print-guide.orig"
before=$(sha256sum guides/veneer.md | cut -d' ' -f1)
grep -v '^| `theme` ' "$OUT/ct-ledger-print-guide.orig" > guides/veneer.md
removed=$(( $(wc -l < "$OUT/ct-ledger-print-guide.orig") - $(wc -l < guides/veneer.md) ))
npm run test:conformance > "$OUT/ct-ledger-print.log.txt" 2>&1
code=$?
cp "$OUT/ct-ledger-print-guide.orig" guides/veneer.md
after=$(sha256sum guides/veneer.md | cut -d' ' -f1)
rm "$OUT/ct-ledger-print-guide.orig"
# Each row is taken from the failures of the departure and addition recording cases alone, and each
# JSON-escaped quotation mark is written back as the quotation mark the row carries.
python3 - "$OUT" <<'PY'
import re, sys
out_dir = sys.argv[1]
text = re.sub(r'\x1b\[[0-9;]*m', '', open(f'{out_dir}/ct-ledger-print.log.txt').read())
rows = []
for title in ['records every measured value difference in the guide ledger', 'records every emitted name the official inventory lacks']:
    start = text.index('FAIL  |conformance| tests/conformance.test.ts > cascade ledger > ' + title)
    end = text.index('⎯⎯⎯', start)
    for line in text[start:end].split('\n'):
        match = re.match(r'^\+\s+"(theme \|.*)",?$', line)
        if match:
            rows.append(match.group(1).replace('\\"', '"'))
open(f'{out_dir}/ct-ledger-print.txt', 'w').write('\n'.join(rows) + '\n')
PY
{
	echo "removed guide lines: $removed"
	echo "command: npm run test:conformance"
	echo "exit: $code"
	echo "summary: $(sed 's/\x1b\[[0-9;]*m//g' "$OUT/ct-ledger-print.log.txt" | grep -E '^ +Tests ' | tail -1 | sed 's/^ *//')"
	echo "printed rows: $(wc -l < "$OUT/ct-ledger-print.txt")"
	echo "restored: $([ "$before" = "$after" ] && echo identical || echo DIFFERENT)"
} > "$OUT/ct-ledger-print-summary.txt"
