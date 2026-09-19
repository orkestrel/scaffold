import { compile } from 'sass'
import { writeFileSync } from 'node:fs'

const warnings = []
const result = compile('app/browser/styles/index.scss', {
	loadPaths: ['node_modules'],
	verbose: true,
	logger: { warn(message, options) { warnings.push({ message, deprecation: options.deprecation, file: options.span?.url?.pathname }) } },
})
const label = process.argv[2]
writeFileSync(`tmp/codex/u4-${label}.css`, result.css)
writeFileSync(`tmp/codex/u4-${label}-warnings.json`, JSON.stringify(warnings, null, 2))
console.log(JSON.stringify({ label, warnings: warnings.length, deprecations: warnings.filter(warning => warning.deprecation).length, authored: warnings.filter(warning => warning.file?.includes('/app/browser/styles/')).length }))
