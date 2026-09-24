#!/bin/bash
# Runs one retained mutation file, tmp/units/t5-3-mutations/<name>.json, against the final test file.
# A file either replaces src/browser/helpers.ts with a saved copy ("replace") or applies exact text
# edits ("edits"), each of which must match once. The run logs to tmp/units/t5-3-mut-<name>.log.txt,
# and the final source is restored from tmp/units/t5-3-helpers-final.ts.txt and checked with cmp.
cd /home/user/test-tf
export PATH=/opt/node22/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
name=$1
filter=$(python3 - "$name" <<'PY'
import json, sys
m = json.load(open(f'tmp/units/t5-3-mutations/{sys.argv[1]}.json'))
path = m['file']
if 'replace' in m:
    open(path, 'w').write(open(m['replace']).read())
else:
    s = open(path).read()
    for e in m['edits']:
        assert s.count(e['from']) == 1, 'mutation site not unique: ' + e['from'][:60]
        s = s.replace(e['from'], e['to'])
    open(path, 'w').write(s)
print(m.get('filter', 'captureFrame|readFrame'))
PY
) || { cp tmp/units/t5-3-helpers-final.ts.txt src/browser/helpers.ts; echo "$name: mutation did not apply"; exit 2; }
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "$filter" > tmp/units/t5-3-mut-$name.log.txt 2>&1
echo "$name exit $?"
grep -E "^ FAIL|Tests  " tmp/units/t5-3-mut-$name.log.txt | sed 's/.*helpers.test.ts:[0-9:]* > //'
cp tmp/units/t5-3-helpers-final.ts.txt src/browser/helpers.ts
cmp -s tmp/units/t5-3-helpers-final.ts.txt src/browser/helpers.ts && echo restored
