import { readFileSync } from 'node:fs'

const targets = {
	'src/core/types.ts': ['TextWaitOptions', 'JourneyVariant'],
	'src/core/helpers.ts': ['waitForText'],
	'src/browser/types.ts': [
		'CaptureVariant',
		'StateOptions',
		'StorageOptions',
		'WebStorageInterface',
		'CensusReading',
		'ContrastFixture',
		'EscapeFixture',
		'CensusFixture',
	],
	'src/browser/helpers.ts': [
		'pressKeys',
		'waitForState',
		'waitForAnimations',
		'readRefusal',
		'readCensus',
		'buildDenial',
		'buildContrast',
		'buildEscapes',
		'buildCensus',
	],
	'src/browser/factories.ts': ['createStorage'],
}

const heads = ['export function ', 'export async function ', 'export interface ']

for (const [path, names] of Object.entries(targets)) {
	const lines = readFileSync(path, 'utf8').split('\n').map((line) => line.replace(/\r$/, ''))
	for (const name of names) {
		const index = lines.findIndex((line) =>
			heads.some((head) => line.startsWith(head + name + ' ') || line.startsWith(head + name + '(')),
		)
		if (index === -1) {
			console.log(name + ': NOT FOUND')
			continue
		}
		let end = index - 1
		while (end >= 0 && !lines[end].trim().startsWith('*/')) end -= 1
		let start = end
		while (start >= 0 && !lines[start].trim().startsWith('/**')) start -= 1
		const paragraph = []
		for (const raw of lines.slice(start + 1, end)) {
			const line = raw.replace(/^\s*\*\s?/, '').trim()
			if (line.startsWith('@')) break
			if (line === '') {
				if (paragraph.length > 0) break
				continue
			}
			paragraph.push(line)
		}
		console.log(name + '\t' + paragraph.join(' '))
	}
}
