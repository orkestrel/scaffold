# Checks that every mutation in mutations.py matches its source text the expected number of times,
# without writing a file or running a test.
import pathlib

HERE = pathlib.Path(__file__).parent
source = (HERE / 'mutations-3.py').read_text(encoding='utf-8')
namespace = {}
exec(source.replace('\nmain()\n', '\n'), namespace)
root = namespace['ROOT']
bad = 0
for label, test, named, edits in namespace['MUTATIONS']:
    texts = {}
    for edit in edits:
        path, old = edit[0], edit[1]
        count = edit[3] if len(edit) > 3 else 1
        text = texts.get(path) or (root / path).read_text(encoding='utf-8')
        found = text.count(old)
        if found != count:
            bad += 1
            print(f'MISMATCH | {label} | {path} | expected {count}, found {found}')
        texts[path] = text.replace(old, edit[2])
    test_text = (root / test).read_text(encoding='utf-8')
    if named not in test_text:
        bad += 1
        print(f'NO CASE | {label} | {named}')
print(f'{len(namespace["MUTATIONS"])} mutations checked, {bad} problems')
