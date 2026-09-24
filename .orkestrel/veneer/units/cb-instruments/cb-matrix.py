# Diffs the before and after form readings into the coverage matrix rows.
import json, re
def load(side):
    text = open(f'tmp/units/cb-forms-{side}.log.txt', encoding='utf-8').read()
    m = re.search(r'CB-FORMS (\{.*?\})\n', text)
    return json.loads(m.group(1))
before, after = load('before'), load('after')
for form in before:
    changed = [(k, before[form][k], after[form][k]) for k in before[form] if before[form][k] != after[form][k]]
    print(f'## {form}')
    for k, b, a in changed:
        print(f'  {k}: {b[:60]} -> {a[:60]}')
