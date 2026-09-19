import io
import os
import shutil
import sys

FILES = [
	'src/core/helpers.ts',
	'src/browser/helpers.ts',
	'src/browser/factories.ts',
]
BACKUP = 'tmp/probe/backup2'

PAIRS = [
	# T1-C1 pressKeys happy path: send nothing.
	('src/browser/helpers.ts',
	 """	await userEvent.keyboard(keys)
}""",
	 """	await Promise.resolve()
}"""),
	# T1-C2 waitForState: satisfy the poll on the first reading, and pin the control once.
	('src/browser/helpers.ts',
	 """				return observed.includes(state) !== absent""",
	 """				return true"""),
	# T1-C3 waitForAnimations: report settled before reading anything.
	('src/browser/helpers.ts',
	 """			if (running.length === 0) return""",
	 """			if (running.length >= 0) return"""),
	# T1-C4 readRefusal: answer with a message of its own rather than the resolver's.
	('src/browser/helpers.ts',
	 """	if (isError(thrown)) return thrown.message""",
	 """	if (isError(thrown)) return 'refused'"""),
	# T1-C6 readCensus: drop the root from the population and leave the tokens unsorted.
	('src/browser/helpers.ts',
	 """	const elements = (root instanceof Element ? 1 : 0) + root.querySelectorAll('*').length""",
	 """	const elements = root.querySelectorAll('*').length"""),
	('src/browser/helpers.ts',
	 """	const tokens = [...readClasses(root)].sort()""",
	 """	const tokens = [...readClasses(root)]"""),
	# T1-C6 buildCensus: put the second token somewhere a class reading never looks.
	('src/browser/helpers.ts',
	 """	glyph.setAttribute('class', mark)""",
	 """	glyph.setAttribute('data-mark', mark)"""),
	# T1-C7 buildContrast: write the stack down instead of searching for the bar.
	('src/browser/helpers.ts',
	 """	if (refusedChannel === undefined || acceptedChannel === undefined) {
		throw new Error(`Contrast control cannot straddle the bar ${bar}`)
	}""",
	 """	if (refusedChannel === undefined || acceptedChannel === undefined) {
		throw new Error(`Contrast control cannot straddle the bar ${bar}`)
	}
	refusedChannel = 150
	acceptedChannel = 0"""),
	# T1-C8 buildEscapes: mount the root, so an embedded sheet reaches the cascade.
	('src/browser/helpers.ts',
	 """	root.append(inline, embedded, exempt)
	return Object.freeze({ root, inline, embedded, permitted: exempt })""",
	 """	root.append(inline, embedded, exempt)
	mount(root)
	return Object.freeze({ root, inline, embedded, permitted: exempt })"""),
	# buildDenial: spell the refusal some other way.
	('src/browser/helpers.ts',
	 """		`Access is denied for ${operation}${key === undefined ? '' : ` "${key}"`}`,""",
	 """		`Storage is unavailable for ${operation}`,"""),
	# T1-C5 createStorage: answer nothing from the seed, and permit every read.
	('src/browser/factories.ts',
	 """			if (!reads) throw buildDenial('getItem', key)
			return values.get(key) ?? null""",
	 """			return values.get(key) ?? null"""),
	# waitForText: drop the exactness switch and answer with the expectation rather than the reading.
	('src/core/helpers.ts',
	 """			const carries = exact ? reading === text : reading.includes(text)""",
	 """			const carries = reading.includes(text)"""),
	('src/core/helpers.ts',
	 """	return reading
}""",
	 """	return text
}"""),
]


def backup():
	os.makedirs(BACKUP, exist_ok=True)
	for path in FILES:
		shutil.copyfile(path, os.path.join(BACKUP, path.replace('/', '__')))
	print('backed up')


def restore():
	for path in FILES:
		shutil.copyfile(os.path.join(BACKUP, path.replace('/', '__')), path)
	print('restored')


command = sys.argv[1]
if command == 'backup':
	backup()
elif command == 'restore':
	restore()
elif command == 'apply':
	for path, old, new in PAIRS:
		text = io.open(path, encoding='utf-8').read()
		assert old in text, (path, old[:70])
		assert text.count(old) == 1, ('ambiguous', path, old[:70])
		io.open(path, 'w', encoding='utf-8', newline='\n').write(text.replace(old, new, 1))
	print('applied ' + str(len(PAIRS)) + ' edits')
else:
	raise SystemExit('unknown command')
