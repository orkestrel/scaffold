import { readFileSync, writeFileSync } from 'node:fs'

const control = process.argv[2]
if (control === 'differ') {
	const path = 'tests/fixtures/oracle/button.json'
	const fixture = JSON.parse(readFileSync(path, 'utf8'))
	fixture.steps.find((step) => step.name === 'button.click.toggle').after.attributes['aria-pressed'] = 'false'
	writeFileSync(path, `${JSON.stringify(fixture, undefined, '\t')}\n`)
} else {
	const path = 'guides/veneer.md'
	const text = readFileSync(path, 'utf8')
	const section = text.indexOf('## Compatibility')
	const insertion = text.indexOf('| btn ', section)
	if (section < 0 || insertion < 0) throw new Error('Compatibility table is absent')
	const row = control === 'accepted'
		? '| alert | variable | Ships the official alert vocabulary. | — | shipped |\n'
		: '| btn | event | Dispatches invented.bs.button | button.click.toggle | accepted |\n'
	writeFileSync(path, text.slice(0, insertion) + row + text.slice(insertion))
}
