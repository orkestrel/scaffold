# ER-MECH round 2 planted controls. Each plant applies one or more exact edits to owned files,
# runs one gate through its npm script, writes tmp/units/erm-2-plant-<name>.log.txt, restores every
# edited file from a byte copy, and appends the restore check (SHA-256 before and after) per file.
# A plant marked `expect=0` is a pass control: the gate must pass with the plant in place.
import hashlib
import os
import shutil
import subprocess
import sys

ROOT = '/home/user/veneer-erm'
SCRATCH = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
GUIDE = os.path.join(ROOT, 'guides/veneer.md')
DISTRIBUTION = os.path.join(ROOT, 'tests/distribution.test.ts')
SETUP = os.path.join(ROOT, 'tests/setupServer.ts')
GUIDES_TEST = os.path.join(ROOT, 'tests/guides.test.ts')
ENV = dict(os.environ)
ENV['PATH'] = f'{SCRATCH}/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'

RECEIPTS_RULE = '| ---- | -------- | ------- | ----- | -------- | ------ | ---- | --- | -------- | ------ |\n'
ROW = '| 2026-09-25 | 873f715 | `chromium` | 141.0.7390.37 | `linux` | 6.18.44-fc-v37 | 22.22.2 | 11.19.1 | `test:guides` | Fail |\n'
MATCH = '| 2026-09-25 | 873f715 | `chromium` | 141.0.7390.37 | `linux` | 6.18.44-fc-v37 | 22.22.2 | 11.19.1 | `test:distribution` | Pass |\n'

GUIDES = ['npm', 'run', 'test:guides']
SETUP_READERS = ['npm', 'run', 'test:setup', '--', 'tests/setupServer.test.ts', '-t', 'Hosts subsection']
SETUP_RUNTIME = ['npm', 'run', 'test:setup', '--', 'tests/setupServer.test.ts', '-t', 'readRuntime']
SETUP_PATTERN = ['npm', 'run', 'test:setup', '--', 'tests/setupServer.test.ts', '-t', 'BUILD_PATTERN']
SETUP_MATCH = ['npm', 'run', 'test:setup', '--', 'tests/setupServer.test.ts', '-t', 'matchesReceipt']
RELEASE_HOST = ['npm', 'run', 'test:distribution', '--', '--reporter=verbose', '-t', 'release host']
PACKED_PAGE = ['npm', 'run', 'test:distribution', '--', '--reporter=verbose', '-t', 'packed-CSS page']

RELEASE_ON = (DISTRIBUTION, "const RELEASE = import.meta.env.MODE === 'release'", 'const RELEASE = true')
MATCHING_RECEIPT = (GUIDE, RECEIPTS_RULE, RECEIPTS_RULE + MATCH)

COMMANDS_CHECK = """			const spans = commandColumn === undefined ? [] : (row[commandColumn] ?? [])
			if (
				spans.length % 2 === 0 ||
				spans.some((span, index) =>
					index % 2 === 0
						? span.element !== 'codeSpan' || span.value.trim() === ''
						: span.element !== 'text' || span.value.trim() !== ',',
				)
			)
				throw new Error(`${label}: invalid Commands ${listed}`)
			const commands = spans.flatMap((span) => (span.element === 'codeSpan' ? [span.value] : []))
"""
ROUND_ONE_COMMANDS_CHECK = """			const spans = commandColumn === undefined ? [] : (row[commandColumn] ?? [])
			const commands = spans.flatMap((span) => (span.element === 'codeSpan' ? [span.value] : []))
			if (
				commands.length === 0 ||
				commands.some((command) => command.trim() === '') ||
				spans.some(
					(span) =>
						span.element !== 'codeSpan' && (span.element !== 'text' || /[^\\s,]/u.test(span.value)),
				)
			)
				throw new Error(`${label}: invalid Commands ${listed}`)
"""

# name: (command, expected exit, [(file, old, new), ...])
PLANTS = {
    'guide-commands': (GUIDES, 1, [(GUIDE, RECEIPTS_RULE, RECEIPTS_RULE + ROW.replace('`test:guides`', '`test:guides` `test:distribution`'))]),
    'guide-platform': (GUIDES, 1, [(GUIDE, '| `chromium` | `linux`  | ER-LINUX  |', '| `chromium` | `Linux`  | ER-LINUX  |')]),
    'reader-commands': (SETUP_READERS, 1, [(SETUP, COMMANDS_CHECK, ROUND_ONE_COMMANDS_CHECK)]),
    'reader-platform': (SETUP_READERS, 1, [(
        SETUP,
        """			if (platform !== ABSENT_CELL && !NODE_PLATFORMS.some((value) => value === platform))
				throw new Error(`Supported host row ${String(position + 1)}: invalid Platform ${platform}`)
""",
        '',
    )]),
    'floor-npm': (GUIDES, 1, [(GUIDE, RECEIPTS_RULE, RECEIPTS_RULE + ROW.replace('| 11.19.1 |', '| 11.5.0 |'))]),
    'floor-form': (GUIDES, 1, [(
        GUIDES_TEST,
        'const node = isRecord(manifest.engines) ? manifest.engines.node : undefined',
        "const node = isRecord(manifest.engines) ? '^22.18.0' : undefined",
    )]),
    'runtime-build-refusal': (SETUP_RUNTIME, 1, [(
        SETUP,
        '	if (!BUILD_PATTERN.test(build)) throw new Error(`Runtime: invalid build ${build}`)\n',
        '',
    )]),
    'build-pattern': (SETUP_PATTERN, 1, [(
        SETUP,
        'export const BUILD_PATTERN = /^\\d+\\.\\d+\\.\\d+\\.\\d+$/u',
        'export const BUILD_PATTERN = /^\\d+\\.\\d+\\.\\d+(?:\\.\\d+)?$/u',
    )]),
    'matcher-false': (SETUP_MATCH, 1, [(
        SETUP,
        """	return (
		receipt.passed &&
		receipt.channel === runtime.channel &&""",
        """	return (
		false &&
		receipt.passed &&
		receipt.channel === runtime.channel &&""",
    )]),
    'release': (RELEASE_HOST, 1, [RELEASE_ON]),
    'release-match': (RELEASE_HOST, 0, [RELEASE_ON, MATCHING_RECEIPT]),
    'release-match-false': (RELEASE_HOST, 1, [
        RELEASE_ON,
        MATCHING_RECEIPT,
        (
            DISTRIBUTION,
            'const recorded = readReceipts().some((receipt) => matchesReceipt(receipt, runtime))',
            'const recorded = readReceipts().some(() => false)',
        ),
    ]),
    'link-swatch-rgb': (PACKED_PAGE, 1, [(
        DISTRIBUTION,
        'style="color: rgb(from var(--vn-color-primary-emphasis) r g b / var(--bs-link-opacity, 1))"',
        'style="color: rgba(var(--vn-color-primary-rgb), var(--bs-link-opacity, 1))"',
    )]),
}


def digest(path):
    with open(path, 'rb') as handle:
        return hashlib.sha256(handle.read()).hexdigest()


def plant(name):
    command, expected, edits = PLANTS[name]
    files = sorted({path for path, _, _ in edits})
    backups = {}
    before = {}
    for path in files:
        backups[path] = os.path.join(SCRATCH, f'erm-2-plant-{name}-{os.path.basename(path)}.bak')
        shutil.copyfile(path, backups[path])
        before[path] = digest(path)
    log = os.path.join(ROOT, f'tmp/units/erm-2-plant-{name}.log.txt')
    code = None
    try:
        for path, old, new in edits:
            with open(path, encoding='utf-8') as handle:
                text = handle.read()
            if text.count(old) != 1:
                raise SystemExit(f'{name}: anchor occurs {text.count(old)} times in {path}')
            with open(path, 'w', encoding='utf-8') as handle:
                handle.write(text.replace(old, new))
        with open(log, 'w', encoding='utf-8') as out:
            out.write(f'plant={name} files={",".join(os.path.relpath(path, ROOT) for path in files)} expect={expected}\n')
            out.write(f'command={" ".join(command)}\n')
            out.flush()
            code = subprocess.run(command, cwd=ROOT, env=ENV, stdout=out, stderr=subprocess.STDOUT).returncode
            out.write(f'exit={code}\n')
    finally:
        with open(log, 'a', encoding='utf-8') as out:
            for path in files:
                shutil.copyfile(backups[path], path)
                after = digest(path)
                out.write(f'restore {os.path.relpath(path, ROOT)} before={before[path]} after={after} equal={before[path] == after}\n')
    print(name, 'exit', code, 'expected', expected, 'restored', all(digest(path) == before[path] for path in files))


for name in sys.argv[1:] or PLANTS:
    plant(name)
