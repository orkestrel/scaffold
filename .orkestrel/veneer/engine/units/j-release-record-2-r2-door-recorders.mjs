// Round 2: makes each door case read every mutation record its observer delivered, not only the ones
// still pending after the awaited call. A delivery empties the observer's queue, so `takeRecords`
// alone after an `await` reads nothing whatever was written.
import { readFileSync, writeFileSync } from 'node:fs'

const cases = {
	'tests/src/browser/Collapse.test.ts': [
		'writes no shown token after a reaction to its host token write destroys it',
		'removes no shown token after a reaction to its host token removal destroys it',
	],
	'tests/src/browser/Toast.test.ts': [
		'writes no transition token after a reaction to its shown token write destroys it',
		'removes no shown token after a reaction to its transition token removal destroys it',
	],
	'tests/src/browser/Tab.test.ts': [
		'removes no shown token from the sibling pane after a reaction to its active token removal',
	],
	'tests/src/browser/Carousel.test.ts': [
		'writes nothing more after a reaction to its incoming direction removal destroys it',
		'writes nothing more after a reaction to its outgoing active removal destroys it',
	],
}
const observer = 'const observer = new MutationObserver(() => undefined)'
const recorded =
	'const writes = createRecorder<readonly [readonly MutationRecord[]]>()\n\t\tconst observer = new MutationObserver((records) => writes.handler(records))'
const pending = 'expect(observer.takeRecords()).toEqual([])'
const delivered = 'expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])'
for (const [path, titles] of Object.entries(cases)) {
	let text = readFileSync(path, 'utf8')
	for (const title of titles) {
		const start = text.indexOf(title)
		const end = text.indexOf('\n\t})\n', start)
		if (start < 0 || end < 0) throw new Error(`Case not found: ${title}`)
		const body = text.slice(start, end)
		if (!body.includes(observer) || !body.includes(pending)) {
			throw new Error(`Case lacks the observer lines: ${title}`)
		}
		text = text.slice(0, start) + body.replace(observer, recorded).replace(pending, delivered) + text.slice(end)
	}
	writeFileSync(path, text)
	console.log(`${path}: ${titles.length} cases`)
}
