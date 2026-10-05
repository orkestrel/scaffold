// Ports the code/string/comment lexer in prior rewrite.ts:62-130; literal calls retain their spelling.
import { readFileSync, writeFileSync, cpSync, readdirSync, mkdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { compile, compileString } from 'sass'
import { computeDigest, expandHex, encodeHex, readChannels, writeJSON } from './helpers.ts'

const own = 'tmp/units/tokens-t1'
const form = /RGBA\((\d{1,3}), (\d{1,3}), (\d{1,3}),|rgba%28(\d{1,3}), (\d{1,3}), (\d{1,3}), ([\d.]+)%29|%23([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])|rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([\d.]+)\)|(?<![&\w])#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/g
class Swatches {
 #rows: { file: string; line: number; form: string; literal: string; key: string }[] = []
 #segments: { text: string; context: string; quote: string; start: number }[] = []
 #start = 0
 #text = ''
 #emit(context: string, quote: string, end: number): void {
  if (end > this.#start) this.#segments.push({ text: this.#text.slice(this.#start, end), context, quote, start: this.#start })
  this.#start = end
 }
 #lex(text: string): void {
  this.#text = text
  this.#start = 0
  this.#segments = []
  const stack = [{ context: 'code', quote: '', depth: 0 }]
  let index = 0
  while (index < text.length) {
   const frame = stack.at(-1)
   if (frame === undefined) throw new Error('Empty lexer stack')
   const char = text[index]
   if (frame.context === 'string') {
    if (char === '\\') { index += 2; continue }
    if (char === '#' && text[index + 1] === '{') {
     this.#emit('string', frame.quote, index)
     stack.push({ context: 'code', quote: '', depth: 0 })
     index += 2
     this.#emit('code', '', index)
     continue
    }
    if (char === frame.quote) { index += 1; this.#emit('string', frame.quote, index); stack.pop(); continue }
    index += 1
    continue
   }
   if (char === '/' && (text[index + 1] === '/' || text[index + 1] === '*')) {
    this.#emit('code', '', index)
    const inline = text[index + 1] === '/'
    const end = text.indexOf(inline ? '\n' : '*/', index + 2)
    index = end === -1 ? text.length : end + (inline ? 0 : 2)
    this.#emit('comment', '', index)
    continue
   }
   if (char === '"' || char === "'") { this.#emit('code', '', index); stack.push({ context: 'string', quote: char, depth: 0 }); index += 1; continue }
   if (char === '{') frame.depth += 1
   if (char === '}') {
    if (frame.depth === 0 && stack.length > 1) { this.#emit('code', '', index); stack.pop(); index += 1; this.#emit('code', '', index); continue }
    frame.depth -= 1
   }
   index += 1
  }
  const frame = stack.at(-1)
  if (frame === undefined) throw new Error('Empty final lexer stack')
  this.#emit(frame.context, frame.quote, text.length)
 }
 #rewrite(path: string, file: string): void {
  const text = readFileSync(path, 'utf8')
  const prefix = text.includes("@use 'mixins' with") ? 'mixins.' : ''
  this.#lex(text)
  let output = ''
  for (const segment of this.#segments) {
   if (segment.context === 'comment') { output += segment.text; continue }
   const inner = segment.quote === "'" ? '"' : "'"
   const content = segment.context === 'string' ? segment.text.slice(1, -1) : segment.text
   if (segment.context === 'string' && /^\d{1,3}, \d{1,3}, \d{1,3}$/.test(content)) {
    output += `${segment.quote}#{${prefix}swatch(${inner}${content}${inner})}${segment.quote}`
    this.#rows.push({ file, line: text.slice(0, segment.start).split('\n').length, form: 'triplet', literal: content, key: encodeHex(readChannels(content)) })
    continue
   }
   let cursor = 0
   for (const match of segment.text.matchAll(form)) {
    output += segment.text.slice(cursor, match.index)
    const raw = match[0]
    let literal = raw
    let category = raw.startsWith('%23') ? 'escape' : raw.startsWith('#') ? raw.length === 4 ? 'short-hex' : 'hex' : raw.startsWith('RGBA') ? 'RGBA' : raw.startsWith('rgba%28') ? 'rgba%28' : 'rgba'
    if (category === 'RGBA') literal = [match[1], match[2], match[3]].join(', ')
    if (category === 'rgba%28') literal = [match[4], match[5], match[6]].join(', ')
    const call = `${prefix}swatch(${inner}${literal}${inner})`
    output += category === 'RGBA' ? `RGBA(#{${call}},` : category === 'rgba%28' ? `rgba%28#{${call}}, ${match[7]}%29` : `#{${call}}`
    this.#rows.push({ file, line: text.slice(0, segment.start + match.index).split('\n').length, form: category, literal, key: category === 'hex' || category === 'short-hex' || category === 'escape' ? expandHex(literal) : encodeHex(readChannels(literal)) })
    cursor = match.index + raw.length
   }
   output += segment.text.slice(cursor)
  }
  writeFileSync(path, file.endsWith('/_validation.scss') ? output.replaceAll("r='.6'", "r='#{'\\00002e6'}'") : output)
 }
 execute(): void {
  const files = ['src/bootstrap/_reset.scss', 'src/bootstrap/_tokens.scss', 'src/bootstrap/_utilities.scss', ...readdirSync('src/bootstrap/components').filter(name => name.endsWith('.scss')).sort().map(name => 'src/bootstrap/components/' + name)]
  for (const path of files) {
   if (readFileSync(path, 'utf8').includes('swatch(')) throw new Error('Generator requires the pristine source: ' + path)
  }
  for (const path of files) this.#rewrite(path, path.slice(4))
  if (this.#rows.length !== 571) throw new Error('DEVIATION: color census ' + this.#rows.length)
  writeJSON(own + '/generated.json', { sites: this.#rows.length, rows: this.#rows })
 }
}
const roles = new Map<string, string>()
const rows: { readonly file: string; readonly line: number; readonly role: string; readonly value: string; readonly category: string }[] = []
const rfs: { readonly file: string; readonly line: number }[] = []
const keys = new Map([['576', 'sm'], ['768', 'md'], ['992', 'lg'], ['1200', 'xl'], ['1400', 'xxl']])
const widths = new Map([['540', 'sm'], ['720', 'md'], ['960', 'lg'], ['1140', 'xl'], ['1320', 'xxl']])
const tokens = new Map([['--bs-font-sans-serif', 'font-sans-serif'], ['--bs-font-monospace', 'font-monospace'], ['--bs-border-radius', 'radius'], ['--bs-border-radius-sm', 'radius-sm'], ['--bs-border-radius-lg', 'radius-lg'], ['--bs-border-radius-xl', 'radius-xl'], ['--bs-border-radius-xxl', 'radius-xxl'], ['--bs-box-shadow', 'shadow'], ['--bs-box-shadow-sm', 'shadow-sm'], ['--bs-box-shadow-lg', 'shadow-lg'], ['--bs-box-shadow-inset', 'shadow-inset']])
const directories = ['src/bootstrap']
for (let index = 0; index < directories.length; index += 1) {
 const directory = directories[index]
 if (directory === undefined) throw new Error('Missing directory')
 for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
  const path = join(directory, entry.name)
  if (entry.isDirectory()) { directories.push(path); continue }
  if (entry.name.endsWith('.scss') === false) continue
  const file = path.slice(4)
  const lines = readFileSync(path, 'utf8').split('\n')
  const output = lines.map((line, offset) => {
   const media = /((?:min|max)-width:\s*)(\d+)(\.98)?px/.exec(line)
   if (media && line.includes('@media')) {
    const down = media[3] !== undefined
    const name = keys.get(String(Number(media[2]) + (down ? 1 : 0)))
    if (name === undefined) return line
    if (media[2] === '1200' && ['_reset.scss', '_type.scss', '_utilities.scss'].includes(entry.name)) { rfs.push({ file, line: offset + 1 }); return line }
    const role = 'breakpoint-' + name + (down ? '-down' : '')
    const value = media[2] + (media[3] ?? '') + 'px'
    roles.set(role, value)
    rows.push({ file, line: offset + 1, role, value, category: 'condition' })
    return line.replace(media[0], media[1] + `#{measure('${role}', ${value})}`)
   }
   const breakpoint = /(--bs-breakpoint-(sm|md|lg|xl|xxl):\s*#\{')(\d+)px('})/.exec(line)
   if (breakpoint) {
    const role = 'breakpoint-' + breakpoint[2]
    const value = breakpoint[3] + 'px'
    rows.push({ file, line: offset + 1, role, value, category: 'breakpoint-value' })
    return line.replace(breakpoint[0], `--bs-breakpoint-${breakpoint[2]}: #{measure('${role}', '${value}')}`)
   }
   const map = /^\s*(sm|md|lg|xl|xxl): (\d+)px,?$/.exec(line)
   if (entry.name === '_utilities.scss' && map) {
    const role = 'breakpoint-' + map[1]
    const value = map[2] + 'px'
    rows.push({ file, line: offset + 1, role, value, category: 'breakpoint-value' })
    return line.replace(value, `measure('${role}', ${value})`)
   }
   const container = /max-width: (\d+)px/.exec(line)
   if (entry.name === '_containers.scss' && container) {
    const role = 'container-' + widths.get(container[1] ?? '')
    const value = container[1] + 'px'
    roles.set(role, value)
    rows.push({ file, line: offset + 1, role, value, category: 'container' })
    return line.replace(value, `measure('${role}', ${value})`)
   }
   const token = /(--bs-[\w-]+): #\{(['"])(.*)\2};/.exec(line)
   if (entry.name === '_tokens.scss' && token) {
    const role = tokens.get(token[1] ?? '')
    if (role === undefined) return line
    const value = token[3] ?? ''
    roles.set(role, value)
    rows.push({ file, line: offset + 1, role, value, category: 'token' })
    return line.replace(token[0], `${token[1]}: #{mixins.measure('${role}', ${token[2]}${value}${token[2]})};`)
   }
   return line
  })
  writeFileSync(path, output.join('\n'))
 }
}

writeJSON(own + '/scales.json', { rows, rfs })
new Swatches().execute()


const tokenPath = 'src/bootstrap/_tokens.scss'
let tokenText = readFileSync(tokenPath, 'utf8')
tokenText = tokenText.replace('$scoped: () !default;', '$scoped: () !default;\n$palette: () !default;\n$scale: () !default;').replace('$scoped: $scoped\n);', '$scoped: $scoped,\n$palette: $palette,\n$scale: $scale\n);')
// Only body-derived dark text uses the admitted context; dark emphasis keeps gray-300.
tokenText = tokenText.split('\n').map(line => {
 if (/--bs-(body-color|secondary-color|tertiary-color)(-rgb)?:/.test(line) && /#dee2e6|222, 226, 230/.test(line)) return line.replace(/(swatch\(["'][^"']+["'])\)/g, '$1, dark)')
 return line
}).join('\n')
writeFileSync(tokenPath, tokenText)
const mixinPath = 'src/bootstrap/_mixins.scss'
writeFileSync(mixinPath, readFileSync(mixinPath, 'utf8').replace("@use 'sass:string';", "@use 'sass:string';\n@use 'sass:math';").replace('$scoped: () !default;', '$scoped: () !default;\n$palette: () !default;\n$scale: () !default;') + '\n' + readFileSync(own + '/functions.scss', 'utf8'))
const tailwindPath = 'src/tailwindcss/_tokens.scss'
writeFileSync(tailwindPath, '$palette: ();\n$scale: ();\n' + readFileSync(tailwindPath, 'utf8').replace('$scoped: $scoped\n);', '$scoped: $scoped,\n$palette: $palette,\n$scale: $scale\n);'))
console.log({ colors: 571, scale: rows.length, rfs: rfs.length })
