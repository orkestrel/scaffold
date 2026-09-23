"""Proves the binding case over the moved tables can fail: each control edits one table in the
landing copy's tests/setupStyles.ts, runs tests/setupStyles.test.ts under the setup project, and
restores the file byte for byte. One log per run under logs/setup/, the unmutated run included."""
import hashlib, os, re, subprocess, sys

ROOT = '/home/user/veneer-ud'
LAND = f'{ROOT}/tmp/probe/land'
LOGS = f'{ROOT}/tmp/units/ud-instruments-3/logs/setup'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
FILE = 'tests/setupStyles.ts'
COMMAND = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'setup', 'tests/setupStyles.test.ts']
CONTROLS = {
    'control': lambda t: t,
    'display-values-reordered': lambda t: t.replace("\t'inline',\n\t'inline-block',\n", "\t'inline-block',\n\t'inline',\n", 1),
    'align-value-dropped': lambda t: t.replace("\t'text-bottom',\n\t'text-top',\n])", "\t'text-bottom',\n])", 1),
    'flex-entry-value-changed': lambda t: t.replace("key: 'fill', value: '1 1 auto'", "key: 'fill', value: '1 1 0%'", 1),
    'flex-resting-written': lambda t: t.replace("flex: Object.freeze({ declared: 'none'", "flex: Object.freeze({ declared: '1 1 auto'", 1),
    'flex-table-unfrozen': lambda t: t.replace("export const FLEX_ENTRY_CASES = Object.freeze([", "export const FLEX_ENTRY_CASES = ([", 1),
    'flex-prefix-omitted': lambda t: t.replace(
        "\tObject.freeze({\n\t\tprefix: 'order',\n\t\tproperty: 'order',\n\t\tvalues: Object.freeze([\n"
        "\t\t\tObject.freeze({ key: 'first', value: '-1' }),\n"
        "\t\t\tObject.freeze({ key: '0', value: '0' }),\n"
        "\t\t\tObject.freeze({ key: '1', value: '1' }),\n"
        "\t\t\tObject.freeze({ key: '2', value: '2' }),\n"
        "\t\t\tObject.freeze({ key: '3', value: '3' }),\n"
        "\t\t\tObject.freeze({ key: '4', value: '4' }),\n"
        "\t\t\tObject.freeze({ key: '5', value: '5' }),\n"
        "\t\t\tObject.freeze({ key: 'last', value: '6' }),\n"
        "\t\t]),\n\t}),\n",
        '',
        1,
    ),
}
os.makedirs(LOGS, exist_ok=True)
full = os.path.join(LAND, FILE)
for name in sys.argv[1:] or CONTROLS:
    original = open(full, 'rb').read()
    mutated = CONTROLS[name](original.decode())
    if name != 'control' and mutated == original.decode():
        print(f'{name}: DID NOT APPLY'); continue
    try:
        open(full, 'w').write(mutated)
        run = subprocess.run(COMMAND, cwd=LAND, env=ENV, capture_output=True, text=True)
        out = re.sub(r'\x1b\[[0-9;]*m', '', run.stdout + run.stderr)
    finally:
        open(full, 'wb').write(original)
    restored = open(full, 'rb').read()
    tests = re.search(r'^\s*Tests\s+.*$', out, re.M)
    red = sorted(set(re.findall(r'^\s*[×✗] (.*?)(?: \d+ms)?$', out, re.M)))
    summary = [f'run: {name}', f'copy: {LAND}', f'file: {FILE} sha256-before={hashlib.sha256(original).hexdigest()} sha256-after={hashlib.sha256(restored).hexdigest()} equal={restored == original}', f'command: {" ".join(COMMAND)}', f'exit={run.returncode} | {tests.group(0).strip() if tests else "?"}', *[f'  red: {t}' for t in red]]
    open(f'{LOGS}/{name}.log.txt', 'w').write('\n'.join(summary) + '\n\n' + out)
    print('\n'.join(summary[4:]) and f'{name}: ' + '\n'.join(summary[4:]))
