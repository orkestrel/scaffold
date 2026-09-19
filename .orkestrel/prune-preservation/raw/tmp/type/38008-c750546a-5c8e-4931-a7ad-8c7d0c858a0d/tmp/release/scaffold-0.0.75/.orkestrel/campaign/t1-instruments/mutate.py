import io
import os
import shutil
import sys

FILES = [
	'src/core/helpers.ts',
	'src/core/types.ts',
	'src/browser/helpers.ts',
	'src/browser/factories.ts',
	'tests/src/browser/helpers.test.ts',
]
BACKUP = 'tmp/probe/backup'

RUNTIME = [
	# T1-C1 pressKeys: drop the nothing-focused refusal.
	('src/browser/helpers.ts',
	 """	const focused = document.activeElement
	if (focused === null || focused === document.body) {
		throw new Error(`Key sequence "${keys}" was sent with nothing focused`)
	}
	await userEvent.keyboard(keys)""",
	 """	await userEvent.keyboard(keys)"""),
	# T1-C2 waitForState: drop the direction switch and the last-states augmentation.
	('src/browser/helpers.ts',
	 """				return observed.includes(state) !== absent""",
	 """				return observed.includes(state)"""),
	('src/browser/helpers.ts',
	 """		if (isError(cause) && cause.message.startsWith(`Condition "${description}" did not hold`)) {
			throw new Error(`${cause.message} (last states: ${JSON.stringify(observed)})`, { cause })
		}
		throw cause""",
	 """		throw cause"""),
	# T1-C3 waitForAnimations: stop excluding an infinite animation, and stop refusing a detached subject.
	('src/browser/helpers.ts',
	 """	if (!element.isConnected) throw new Error('Animation subject is not connected')""",
	 """	if (!element.isConnected) return"""),
	('src/browser/helpers.ts',
	 """				return animation.playState === 'running' && Number.isFinite(iterations)""",
	 """				return animation.playState === 'running' && iterations !== 0"""),
	# T1-C4 readRefusal: render a non-Error instead of rethrowing it.
	('src/browser/helpers.ts',
	 """	if (isError(thrown)) return thrown.message
	throw thrown""",
	 """	if (isError(thrown)) return thrown.message
	return String(thrown)"""),
	# T1-C6 readCensus: stop refusing an empty walk.
	('src/browser/helpers.ts',
	 """	if (elements === 0) throw new Error('Class census walked no element')""",
	 """	if (elements < 0) throw new Error('Class census walked no element')"""),
	# T1-C7 buildContrast: stop demanding that the flat reading disagree.
	('src/browser/helpers.ts',
	 """		if (refusedChannel === undefined && composited < bar && flat >= bar) refusedChannel = channel
		if (acceptedChannel === undefined && composited >= bar && flat < bar) acceptedChannel = channel""",
	 """		if (refusedChannel === undefined && composited < bar) refusedChannel = channel
		if (acceptedChannel === undefined && composited >= bar) acceptedChannel = channel"""),
	# T1-C8 buildEscapes: drop the exempt sheet.
	('src/browser/helpers.ts',
	 """	root.append(inline, embedded, exempt)""",
	 """	root.append(inline, embedded)"""),
	# T1-C9 shadow boundary: refuse every subject inside a shadow tree.
	('src/browser/helpers.ts',
	 """export function isRendered(element: Element): boolean {
	if (element.closest('[aria-hidden="true"]') !== null) return false""",
	 """export function isRendered(element: Element): boolean {
	if (element.getRootNode() !== element.ownerDocument) return false
	if (element.closest('[aria-hidden="true"]') !== null) return false"""),
	('src/browser/helpers.ts',
	 """	const rectangle = element.getBoundingClientRect()
	return (
		element.isConnected &&""",
	 """	const rectangle = element.getBoundingClientRect()
	return (
		element.getRootNode() === element.ownerDocument &&
		element.isConnected &&"""),
	# T1-C5 createStorage: replenish the quota on permit.
	('src/browser/factories.ts',
	 """		permit() {
			reads = true
			writes = true
		},""",
	 """		permit() {
			reads = true
			writes = true
			room = quota
		},"""),
	# waitForText: drop the departure arm and the empty-expectation refusal.
	('src/core/helpers.ts',
	 """	if (text.length === 0) throw new Error('Text expectation must not be empty')
	const absent = options?.absent
	if (absent !== undefined && absent.length === 0) {
		throw new Error('Text expectation must not be empty')
	}""",
	 """	const absent = options?.absent"""),
	('src/core/helpers.ts',
	 """			return carries && (absent === undefined || !reading.includes(absent))""",
	 """			return carries"""),
]

RESOLUTION = [
	# T1-C10: the root entry stops publishing JourneyVariant.
	('src/core/types.ts',
	 """export interface JourneyVariant {""",
	 """interface JourneyVariantWithdrawn {"""),
	('src/core/types.ts',
	 """	/** Holds the variant's name, which is the second half of every filename a capture run writes. */
	readonly name: string
	/** Holds the viewport width in pixels. */
	readonly width: number
	/** Holds the viewport height in pixels. */
	readonly height: number
}""",
	 """	readonly name: string
	readonly width: number
	readonly height: number
}
export type JourneyVariant = JourneyVariantWithdrawn['name']"""),
	# T1-C11: the barrel case asks for a name the environment does not publish.
	('tests/src/browser/helpers.test.ts',
	 """			browser.buildCensus,
			browser.createStorage,""",
	 """			browser.buildCensus,
			browser.createStorage,
			readProperty(browser, 'buildUnpublished'),"""),
	('tests/src/browser/helpers.test.ts',
	 """import { createRecorder, createTeardown, requireValue } from '@src/core'""",
	 """import { createRecorder, createTeardown, readProperty, requireValue } from '@src/core'"""),
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


def apply(pairs):
	for path, old, new in pairs:
		text = io.open(path, encoding='utf-8').read()
		assert old in text, (path, old[:70])
		assert text.count(old) == 1, ('ambiguous', path, old[:70])
		io.open(path, 'w', encoding='utf-8', newline='\n').write(text.replace(old, new, 1))
	print('applied ' + str(len(pairs)) + ' edits')


command = sys.argv[1]
if command == 'backup':
	backup()
elif command == 'restore':
	restore()
elif command == 'runtime':
	apply(RUNTIME)
elif command == 'resolution':
	apply(RESOLUTION)
else:
	raise SystemExit('unknown command')
