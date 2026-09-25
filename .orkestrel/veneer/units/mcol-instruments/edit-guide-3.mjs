import { readFileSync, writeFileSync } from 'node:fs'
const path = 'guides/veneer.md'
let text = readFileSync(path, 'utf8')
const from = `\`0\`. At a factor of \`1\`, it resolves to the value its token and
ratio give, which is the release's duration wherever Veneer keeps that duration. § Departures or §
Additions records each scaled duration that differs from the release's, such as the \`.icon-link\`
transform's in § Departures and the modal host's in § Additions.`
const to = `\`0\`. At a factor of \`1\`, it resolves to the value its token and ratio give, which is the
release's duration wherever Veneer keeps that duration. § Departures or § Additions records each
scaled duration that differs from the release's, such as the \`.icon-link\` transform's in
§ Departures and the modal host's in § Additions.`
if (text.split(from).length !== 2) throw new Error('missing')
writeFileSync(path, text.replace(from, to))
