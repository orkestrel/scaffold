// CL12 truth sweep: every backticked token in guides/veneer.md that names a path,
// a --vn-* custom property, or a --bs-* custom property is checked against the tree.
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const guide = readFileSync(resolve(root, 'guides/veneer.md'), 'utf8')
const css = readFileSync(resolve(root, 'dist/src/styles/index.css'), 'utf8')

const spans = [...guide.matchAll(/`([^`\n]+)`/g)].map((match) => match[1])
const unique = [...new Set(spans)]

const declared = new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1]))
const referenced = new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map((match) => match[1]))

const pathish = unique.filter((token) => /^[\w./@-]+\.(ts|tsx|scss|css|json|md|mjs|js|png)$/.test(token) || /^[\w./@-]+\/$/.test(token))
const vn = unique.filter((token) => /^--vn-[a-z0-9-]+$/.test(token))
const bs = unique.filter((token) => /^--bs-[a-z0-9-]+$/.test(token))

const missingPaths = pathish.filter((token) => !existsSync(resolve(root, token)))
const missingVn = vn.filter((token) => !declared.has(token))
const missingBs = bs.filter((token) => !declared.has(token) && !referenced.has(token))

// Every --vn-* the built cascade declares, and whether the guide names it anywhere.
const vnDeclared = [...declared].filter((token) => token.startsWith('--vn-')).sort()
const undocumented = vnDeclared.filter((token) => !guide.includes(token))

// Every registry name in src/core/constants.ts, and whether the cascade declares it.
const constants = readFileSync(resolve(root, 'src/core/constants.ts'), 'utf8')
const registry = [...new Set([...constants.matchAll(/'(--vn-[a-z0-9-]+)'/g)].map((match) => match[1]))].sort()
const registryUndeclared = registry.filter((token) => !declared.has(token))
const registryUndocumented = registry.filter((token) => !guide.includes(token))

const report = {
	backtickedSpans: spans.length,
	uniqueSpans: unique.length,
	pathsChecked: pathish.length,
	missingPaths,
	vnChecked: vn.length,
	missingVn,
	bsChecked: bs.length,
	missingBs,
	vnDeclaredInCascade: vnDeclared.length,
	undocumentedCascadeTokens: undocumented,
	registryNames: registry.length,
	registryUndeclared,
	registryUndocumented,
}
console.log(JSON.stringify(report, null, '\t'))
