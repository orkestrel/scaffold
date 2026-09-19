#!/usr/bin/env python3
"""Unit T3 mutation instrument.

Each pass names one load-bearing edit this unit made, reverts it in place, and is restored
afterwards. `backup` copies every touched file, `restore` puts them back, and a named pass applies
its own edits. Every edit asserts its match count first, so a pass that no longer applies fails
loudly instead of reporting a green run against an unmutated tree.

Usage: python tmp/probe/mutate3.py backup | restore | <pass>
"""

import io
import os
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BACKUP = os.path.join(ROOT, 'tmp', 'probe', 'backup3')

FILES = [
	'src/core/helpers.ts',
	'src/core/constants.ts',
	'src/browser/helpers.ts',
	'src/browser/factories.ts',
	'tests/src/browser/factories.test.ts',
	'tests/src/core/helpers.test.ts',
	'README.md',
]

# Each pass is a list of (path, old, new, expected occurrences).
PASSES = {
	# Item 1: the phases run on the context's value again rather than on the builder returning.
	'context': [(
		'src/browser/factories.ts',
		'\t\t\t\t\tif (built !== undefined) {',
		'\t\t\t\t\tif (built !== undefined && built.context !== undefined) {',
		1,
	)],
	# Item 2: the exceptional exit writes no terminal status.
	'terminal': [(
		'src/browser/factories.ts',
		"\t\t\t\troot.setAttribute(STATECHART_ATTRIBUTES.status, 'failed')\n"
		'\t\t\t\tannouncer.textContent = `Statechart harness failed, ${passed} passed and ${failed} failed of ${table.length}.`\n'
		'\t\t\t\tthrow cause',
		'\t\t\t\tthrow cause',
		1,
	)],
	# Item 3: a re-run leaves the rendered state where the run before it left it.
	'rerun': [(
		'src/browser/factories.ts',
		'\t\t\tstate.removeAttribute(STATECHART_ATTRIBUTES.state)\n\t\t\tstate.textContent = \'\'\n',
		'',
		1,
	)],
	# Item 4: the store intercepts named-property access, which is what the bound says it does not.
	'proxy': [(
		'src/browser/factories.ts',
		'\tlet room = quota\n\treturn {',
		'\tlet room = quota\n\treturn new Proxy({',
		1,
	), (
		'src/browser/factories.ts',
		'\t\t\tvalues.set(key, value)\n\t\t},\n\t}\n}',
		'\t\t\tvalues.set(key, value)\n\t\t},\n\t}, { get: (target, key) => Reflect.get(target, key) ?? values.get(String(key)) })\n}',
		1,
	)],
	# Item 5: the quota accepts any integer again.
	'quota': [(
		'src/browser/factories.ts',
		'!Number.isSafeInteger(quota)',
		'!Number.isInteger(quota)',
		1,
	)],
	# Item 6: the refusal reader routes through `captureError` again.
	'refusal': [(
		'src/browser/helpers.ts',
		"import { checkBounds, waitForAbort, waitForCondition } from '@src/core'",
		"import { captureError, checkBounds, waitForAbort, waitForCondition } from '@src/core'",
		1,
	), (
		'src/browser/helpers.ts',
		'\ttry {\n'
		'\t\tresolveRendered(first, second)\n'
		'\t} catch (thrown) {\n'
		'\t\t// The `catch` is local rather than routed through `captureError`, which returns the thrown\n'
		'\t\t// value and therefore reads a hostile `throw undefined` as a resolver that returned.\n'
		'\t\tif (isError(thrown)) return thrown.message\n'
		'\t\tthrow thrown\n'
		'\t}\n'
		'\treturn undefined',
		'\tconst thrown = captureError(() => resolveRendered(first, second))\n'
		'\tif (thrown === undefined) return undefined\n'
		'\tif (isError(thrown)) return thrown.message\n'
		'\tthrow thrown',
		1,
	)],
	# Item 7: the unsatisfiable departure is not refused before the readings.
	'departure': [(
		'src/core/helpers.ts',
		"\tif (absent !== undefined && text.includes(absent)) {\n\t\tthrow new Error('Text departure must not appear in the text expectation')\n\t}\n",
		'',
		1,
	)],
	# Item 8: the guide fence's elided shape, with the phases the fence used to omit.
	'elided': [(
		'tests/src/browser/factories.test.ts',
		"\t\t\tname: 'the summary leaves it closed',\n\t\t\tfrom: 'closed',\n\t\t\tevent: 'toggle',\n\t\t\tto: 'closed',\n\t\t},\n\t\tarrange: arrangeDisclosure,\n\t\tact: actOnDisclosure,\n\t\tassert: assertDisclosure,",
		"\t\t\tname: 'the summary leaves it closed',\n\t\t\tfrom: 'closed',\n\t\t\tevent: 'toggle',\n\t\t\tto: 'closed',\n\t\t},",
		1,
	)],
	# Item 9: the README ships the pre-T1 dependency shape again.
	'readme': [(
		'README.md',
		"the whole environment imports `vitest/browser`, DOM globals, this\npackage's own core, and the `@orkestrel/contract` guards it narrows with, with `vitest` declared as\na peer dependency.",
		'the whole environment imports `vitest/browser` and DOM globals and\nnothing else, with `vitest` declared as a peer dependency.',
		1,
	)],
	# Item 11: the paused and filled animations count as running again.
	'playstate': [(
		'src/browser/helpers.ts',
		"return animation.playState === 'running' && Number.isFinite(iterations)",
		'return Number.isFinite(iterations)',
		1,
	)],
	# Item 12: the harness respells the refused-build sentence.
	'spelling': [(
		'src/browser/factories.ts',
		'buildRefusal(row.scenario.transition.name, cause).message',
		'`${row.scenario.transition.name}: build was refused`',
		1,
	)],
	# Item 13a: the between-row pause goes away.
	'pause': [(
		'src/browser/factories.ts',
		'\t\t\t\t\tif (options.pause !== undefined && index < table.length - 1) {\n\t\t\t\t\t\tawait waitForDelay(options.pause)\n\t\t\t\t\t}\n',
		'',
		1,
	)],
	# Item 13b: the status leaves `pending` before the row count is written.
	'order': [(
		'src/browser/factories.ts',
		"\troot.setAttribute(STATECHART_ATTRIBUTES.total, String(table.length))\n\troot.setAttribute(STATECHART_ATTRIBUTES.passed, '0')\n\troot.setAttribute(STATECHART_ATTRIBUTES.failed, '0')\n\troot.setAttribute(STATECHART_ATTRIBUTES.status, 'idle')",
		"\troot.setAttribute(STATECHART_ATTRIBUTES.status, 'idle')\n\troot.setAttribute(STATECHART_ATTRIBUTES.total, String(table.length))\n\troot.setAttribute(STATECHART_ATTRIBUTES.passed, '0')\n\troot.setAttribute(STATECHART_ATTRIBUTES.failed, '0')",
		1,
	)],
	# Item 14: the augmentation keys on another module's message prefix again.
	'augment': [(
		'src/browser/helpers.ts',
		'\t\tif (refused !== undefined && cause === refused.thrown) throw cause\n\t\tif (cause === options?.signal?.reason) throw cause\n\t\tif (readings === 0) throw cause\n\t\tif (!isError(cause)) throw cause\n\t\tthrow new Error(`${cause.message} (last states: ${JSON.stringify(observed)})`, { cause })',
		'\t\tif (isError(cause) && cause.message.startsWith(`Condition "${description}" did not hold`)) {\n\t\t\tthrow new Error(`${cause.message} (last states: ${JSON.stringify(observed)})`, { cause })\n\t\t}\n\t\tthrow cause',
		1,
	)],
	# Item 15: the census tokens are fixed literals a cascade could declare in advance.
	'census': [(
		'src/browser/helpers.ts',
		"\tconst suffix = crypto.getRandomValues(new Uint32Array(1)).join('')\n\tconst token = `census-authored-token-${suffix}`\n\tconst mark = `census-authored-mark-${suffix}`",
		"\tconst token = 'census-authored-token'\n\tconst mark = 'census-authored-mark'",
		1,
	)],
	# Item 16: the transcribed set names a status the union does not carry, which the typecheck refuses.
	'byname': [(
		'tests/src/core/helpers.test.ts',
		"const terminal = new Set<StatechartStatus>(['passed', 'failed'])",
		"const terminal = new Set<StatechartStatus>(['passed', 'stalled'])",
		1,
	)],
}


def backup() -> None:
	if os.path.isdir(BACKUP):
		shutil.rmtree(BACKUP)
	for relative in FILES:
		target = os.path.join(BACKUP, relative)
		os.makedirs(os.path.dirname(target), exist_ok=True)
		shutil.copyfile(os.path.join(ROOT, relative), target)
	print('backed up %d files' % len(FILES))


def restore() -> None:
	for relative in FILES:
		shutil.copyfile(os.path.join(BACKUP, relative), os.path.join(ROOT, relative))
	print('restored %d files' % len(FILES))


def apply(name: str) -> None:
	edits = PASSES[name]
	for relative, old, new, expected in edits:
		path = os.path.join(ROOT, relative)
		text = io.open(path, encoding='utf-8', newline='').read()
		found = text.count(old)
		if found != expected:
			raise SystemExit('%s: %s expected %d matches, found %d' % (name, relative, expected, found))
		io.open(path, 'w', encoding='utf-8', newline='').write(text.replace(old, new))
		print('%s: %s mutated' % (name, relative))


if __name__ == '__main__':
	command = sys.argv[1]
	if command == 'backup':
		backup()
	elif command == 'restore':
		restore()
	else:
		apply(command)
