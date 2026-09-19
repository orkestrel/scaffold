"""Mutates `createHarness` so each T2 control has to redden, then puts the file back.

Usage: python tmp/probe/mutate.py backup | apply1 | apply2 | restore

Every edit is on the implementation, never on an assertion. `backup` copies the file; `restore`
copies it back. No git command is involved.
"""

import io
import shutil
import sys

SOURCE = 'src/browser/factories.ts'
BACKUP = 'tmp/probe/factories.ts.backup'

# Pass 1: the ordering, the carry-on, the empty refusal, and the pause.
PASS_ONE = [
	# M1 — idle is written before the rows are rendered, so `pending` never covers the inventory.
	(
		"\tfor (const row of table) rows.append(row.element)\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.total, String(table.length))\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.passed, '0')\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.failed, '0')\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.status, 'idle')\n",
		"\troot.setAttribute(STATECHART_ATTRIBUTES.status, 'idle')\n"
		"\tfor (const row of table) rows.append(row.element)\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.total, String(table.length))\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.passed, '0')\n"
		"\troot.setAttribute(STATECHART_ATTRIBUTES.failed, '0')\n",
	),
	# M2 — the run stops at the first failing row instead of carrying on.
	(
				"\t\t\t\tif (refusal === undefined) passed += 1\n"
		"\t\t\t\telse failed += 1\n",
		"\t\t\t\tif (refusal === undefined) passed += 1\n"
		"\t\t\t\telse failed += 1\n"
		"\t\t\t\tif (refusal !== undefined) break\n",
	),
	# M3 — an empty table mounts instead of being refused.
	(
		"\tif (scenarios.length === 0) throw new Error('Statechart harness mounted no transition')\n",
		"",
	),
	# M4 — the declared pause between rows is never awaited.
	(
		"\t\t\t\tif (options.pause !== undefined && index < table.length - 1) {\n"
		"\t\t\t\t\tawait waitForDelay(options.pause)\n"
		"\t\t\t\t}\n",
		"\t\t\t\tif (options.pause !== undefined && index < 0) {\n"
		"\t\t\t\t\tawait waitForDelay(options.pause)\n"
		"\t\t\t\t}\n",
	),
]

# Pass 2: the running status, the fresh tally, the state element, and the failures derivation.
PASS_TWO = [
	# M5 — the run never announces itself, so `running` is unobservable.
	(
		"\t\t\troot.setAttribute(STATECHART_ATTRIBUTES.status, 'running')\n",
		"",
	),
	# M6 — a second run counts on from where the first one stopped.
	(
		"\t\t\tfor (const row of table) row.element.removeAttribute(STATECHART_ATTRIBUTES.result)\n"
		"\t\t\tlet passed = 0\n"
		"\t\t\tlet failed = 0\n"
		"\t\t\troot.setAttribute(STATECHART_ATTRIBUTES.passed, '0')\n"
		"\t\t\troot.setAttribute(STATECHART_ATTRIBUTES.failed, '0')\n",
		"\t\t\tlet passed = Number(root.getAttribute(STATECHART_ATTRIBUTES.passed))\n"
		"\t\t\tlet failed = Number(root.getAttribute(STATECHART_ATTRIBUTES.failed))\n",
	),
	# M7 — the state element never takes the entity's reading.
	(
		"\t\t\t\t\tconst current = options.state(context)\n"
		"\t\t\t\t\tstate.setAttribute(STATECHART_ATTRIBUTES.state, current)\n"
		"\t\t\t\t\tstate.textContent = current\n",
		"",
	),
	# M8 — the failure list names every row rather than the failing ones.
	(
		"\t\t\t\tif (row.element.getAttribute(STATECHART_ATTRIBUTES.result) !== 'failed') continue\n",
		"",
	),
]

# Pass 3: the two claims the guide makes about the state reader.
PASS_THREE = [
	# M9 — the state element carries a reading before any row has built an entity.
	(
		"\tconst state = build('p')\n",
		"\tconst state = build('p', { attributes: { [STATECHART_ATTRIBUTES.state]: '' } })\n",
	),
	# M10 — a state reader that throws is swallowed instead of coming out of the run.
	(
		"\t\t\t\t\tconst current = options.state(context)\n",
		"\t\t\t\t\tlet current: TState | undefined\n"
		"\t\t\t\t\ttry {\n"
		"\t\t\t\t\t\tcurrent = options.state(context)\n"
		"\t\t\t\t\t} catch {\n"
		"\t\t\t\t\t\tcurrent = undefined\n"
		"\t\t\t\t\t}\n"
		"\t\t\t\t\tif (current === undefined) continue\n",
	),
]


def read():
	return io.open(SOURCE, encoding='utf-8').read()


def write(text):
	io.open(SOURCE, 'w', encoding='utf-8', newline='\n').write(text)


def apply(edits):
	text = read()
	for old, new in edits:
		found = text.count(old)
		if found != 1:
			raise SystemExit('anchor matched %d times:\n%s' % (found, old))
		text = text.replace(old, new)
	write(text)
	print('applied %d edits' % len(edits))


command = sys.argv[1]
if command == 'backup':
	shutil.copyfile(SOURCE, BACKUP)
	print('backed up')
elif command == 'restore':
	shutil.copyfile(BACKUP, SOURCE)
	print('restored')
elif command == 'apply1':
	apply(PASS_ONE)
elif command == 'apply2':
	apply(PASS_TWO)
elif command == 'apply3':
	apply(PASS_THREE)
else:
	raise SystemExit('unknown command: %s' % command)
