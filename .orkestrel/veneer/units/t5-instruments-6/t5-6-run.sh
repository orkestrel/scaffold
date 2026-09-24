#!/bin/bash
# Runs retained mutation files, tmp/units/t5-6-mutations/<name>.json, against the final test file, whole.
# Each file applies exact text edits to src/browser/helpers.ts, each of which must match once. Each
# run logs to tmp/units/t5-6-mut-<name>.log.txt and restores the final source from
# tmp/units/t5-6-helpers-final.ts.txt, checked with cmp. The test file's SHA-256 digest is written to
# tmp/units/t5-6-digest.log.txt before the first run and checked after the last.
cd /home/user/test-tf
export PATH=/opt/node22/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
{ echo "before:"; sha256sum tests/src/browser/helpers.test.ts; } > tmp/units/t5-6-digest.log.txt
sha256sum tests/src/browser/helpers.test.ts > tmp/units/t5-6-test-final.sha256.txt
for name in "$@"; do
	python3 - "$name" <<'PY' || { cp tmp/units/t5-6-helpers-final.ts.txt src/browser/helpers.ts; echo "$name: did not apply"; continue; }
import json, sys
m = json.load(open(f'tmp/units/t5-6-mutations/{sys.argv[1]}.json'))
s = open(m['file']).read()
for e in m['edits']:
    assert s.count(e['from']) == 1, 'mutation site not unique: ' + e['from'][:60]
    s = s.replace(e['from'], e['to'])
open(m['file'], 'w').write(s)
PY
	npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts > tmp/units/t5-6-mut-$name.log.txt 2>&1
	echo "$name exit $?"
	grep -E "^ FAIL|Tests  " tmp/units/t5-6-mut-$name.log.txt | sed 's/.*helpers.test.ts:[0-9:]* > //'
	cp tmp/units/t5-6-helpers-final.ts.txt src/browser/helpers.ts
	cmp -s tmp/units/t5-6-helpers-final.ts.txt src/browser/helpers.ts && echo restored
done
{ echo "after:"; sha256sum -c tmp/units/t5-6-test-final.sha256.txt; echo "check exit $?"; } >> tmp/units/t5-6-digest.log.txt
