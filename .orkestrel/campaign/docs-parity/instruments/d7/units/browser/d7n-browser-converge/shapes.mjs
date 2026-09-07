// Renders every exported interface and type alias of a types file into the
// fleet's one `Shape` idiom, for review before the cells land.
import { readFileSync } from 'node:fs'

/** Strips a generic parameter list from a declaration head. */
function stripGenerics(name) {
	const at = name.indexOf('<')
	return at === -1 ? name : name.slice(0, at)
}

/** Escapes a union bar the way a Markdown cell needs it. */
function escapeBars(text) {
	return text.replaceAll('|', '\\|')
}

/** Counts how far one line opens or closes brackets. */
function readDepth(line) {
	let depth = 0
	for (const ch of line) {
		if ('([{'.includes(ch)) depth += 1
		if (')]}'.includes(ch)) depth -= 1
	}
	return depth
}

/** Reads one member line into its bare name, marking an optional member. */
function readMember(line) {
	const text = line.trim()
	if (text.length === 0 || text.startsWith('//') || text.startsWith('*') || text.startsWith('/*')) {
		return undefined
	}
	const body = text.startsWith('readonly ') ? text.slice(9) : text
	const call = /^([A-Za-z_$][\w$]*|\[[^\]]+\])(\??)(<[^(]*>)?\(/.exec(body)
	if (call !== null) return { name: call[1], optional: call[2] === '?', call: true }
	const data = /^([A-Za-z_$][\w$]*|\[[^\]]+\])(\??):/.exec(body)
	if (data !== null) return { name: data[1], optional: data[2] === '?', call: false }
	return undefined
}

const file = process.argv[2]
const lines = readFileSync(file, 'utf8').split('\n')
const out = []
for (let at = 0; at < lines.length; at += 1) {
	const line = lines[at]
	const iface = /^export interface ([\w<>, =\[\]']+?)(?: extends ([^{]+))? \{$/.exec(line)
	if (iface !== null) {
		const data = []
		const calls = []
		let depth = 0
		let cursor = at + 1
		for (; cursor < lines.length && !(depth === 0 && lines[cursor] === '}'); cursor += 1) {
			if (depth === 0) {
				const member = readMember(lines[cursor])
				if (member !== undefined) {
					const label = `${member.name}${member.optional ? '?' : ''}`
					if (member.call) calls.push(label)
					else data.push(label)
				}
			}
			depth += readDepth(lines[cursor])
		}
		const braces = `{ ${data.join(', ')} }`
		const head = data.length === 0 ? '{}' : braces
		const shape = calls.length === 0 ? head : `${head} plus ${calls.join(', ')}`
		out.push({
			name: stripGenerics(iface[1]),
			kind: 'interface',
			extends: iface[2] === undefined ? undefined : iface[2].trim(),
			shape: escapeBars(shape),
		})
		at = cursor
		continue
	}
	const alias = /^export type ([\w<>, =]+?) =\s?(.*)$/.exec(line)
	if (alias !== null) {
		let cursor = at
		let value = alias[2]
		while (value.length === 0) {
			cursor += 1
			value = lines[cursor].trim()
		}
		if (value.endsWith('{') && readDepth(value) === 1) {
			const data = []
			cursor = at + 1
			let depth = 0
			for (; cursor < lines.length && !(depth === 0 && lines[cursor] === '}'); cursor += 1) {
				if (depth === 0) {
					const member = readMember(lines[cursor])
					if (member !== undefined) data.push(`${member.name}${member.optional ? '?' : ''}`)
				}
				depth += readDepth(lines[cursor])
			}
			value = `{ ${data.join(', ')} }`
		} else {
			let depth = readDepth(value)
			while (
				depth !== 0 ||
				value.trimEnd().endsWith('|') ||
				value.trimEnd().endsWith('=>') ||
				(lines[cursor + 1] ?? '').startsWith('\t| ')
			) {
				cursor += 1
				value += ` ${lines[cursor].trim()}`
				depth += readDepth(lines[cursor])
			}
			value = value.replace(/\s+/g, ' ').trim()
		}
		at = cursor
		out.push({ name: stripGenerics(alias[1]), kind: 'type', shape: escapeBars(value) })
	}
}
for (const one of out) {
	process.stdout.write(`${one.name}\t${one.kind}\t${one.extends ?? ''}\t\`${one.shape}\`\n`)
}
