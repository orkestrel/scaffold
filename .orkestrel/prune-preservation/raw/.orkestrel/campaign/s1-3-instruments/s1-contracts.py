from pathlib import Path

def edit(path, old, new):
    target = Path(path)
    value = target.read_text(encoding='utf-8')
    if old not in value:
        raise RuntimeError(f'Missing text in {path}: {old}')
    target.write_text(value.replace(old, new), encoding='utf-8', newline='\n')

edit('src/core/validators.ts', 'setup: isBoolean,', "setup: andOf(isCollection, arrayOf(literalOf('node', 'browser'))),")
edit('src/core/validators.ts', 'showcase: isBoolean,', 'showcase: isBoolean,\n\t\tjourney: isBoolean,')
edit('src/core/factories.ts', 'setup: input?.setup ?? false,', 'setup: input?.setup ?? [],')
edit('src/core/factories.ts', 'showcase: input?.showcase ?? false,', 'showcase: input?.showcase ?? false,\n\t\tjourney: input?.journey ?? false,')
paths = [Path('tests/setup.ts'), *Path('tests/src').rglob('*.ts')]
for path in paths:
    value = path.read_text(encoding='utf-8')
    changed = value.replace('setup: true', "setup: ['node']").replace('setup: false', 'setup: []')
    if str(path).replace('\\', '/') == 'tests/setup.ts':
        changed = changed.replace('showcase: false,', 'showcase: false,\n\t\tjourney: false,')
    if changed != value:
        path.write_text(changed, encoding='utf-8', newline='\n')

edit('src/core/types.ts', '* `vendors`, `global`, and `showcase` are structural facts: each is', '* `vendors`, `global`, `showcase`, and `journey` are structural facts: each is')
edit('src/core/types.ts', '* `showcase` projects only a browser `app`.', '* `setup` lists the runtimes required by root setup proofs: `node` for generic\n * and server proofs, and `browser` for `tests/setupBrowser.test.ts`.\n * `journey` selects the birth-owned variant wrapper for a browser application.\n * `showcase` projects only a browser `app`.')
