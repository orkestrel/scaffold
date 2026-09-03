// Generate one conformance successor brief per package from the shared brief, the checkout, and the
// carry register. Usage: node mkconform.mjs <package> [<package> ...]
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
const UNITS = '/home/user/scaffold/tmp/units/conform'
const CARRY = `${UNITS}/carry.json`
const carry = existsSync(CARRY) ? JSON.parse(readFileSync(CARRY, 'utf8')) : {}
const FACTS = `${UNITS}/facts.json`
const facts = existsSync(FACTS) ? JSON.parse(readFileSync(FACTS, 'utf8')) : {}
mkdirSync(UNITS, { recursive: true })
for (const pkg of process.argv.slice(2)) {
	const repo = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
	const manifest = JSON.parse(readFileSync(`${repo}/package.json`, 'utf8'))
	const environments = ['core', 'browser', 'server', 'bin', 'styles'].filter((e) => existsSync(`${repo}/src/${e}`)).map((e) => `src/${e}`)
	if (existsSync(`${repo}/app`)) for (const e of readdirSync(`${repo}/app`)) environments.push(`app/${e}`)
	const deps = (kind) => Object.entries(manifest[kind] || {}).filter(([n]) => n.startsWith('@orkestrel/')).map(([n, r]) => `${n} ${r}`)
	const rows = carry[pkg] || []
	const f = facts[pkg] || { agentsCitations: 'unmeasured', should: 'unmeasured', skipsOrTodos: 'unmeasured', tsDirectives: 'unmeasured', tmpLiterals: 'unmeasured' }
	const rowText = rows.length ? rows.map((r, i) => `${i + 1}. **${r.id}** — ${r.text} (${r.pointer})${r.lane ? ` — lane: ${r.lane}` : ''}`).join('\n') : 'none recorded'
	const scripts = Object.keys(manifest.scripts || {}).join(', ')
	const out = `# Conformance audit — ${pkg}

Read \`${UNITS}/brief.md\` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: \`${repo}\`, branch \`claude/orkestrel-npm-audit-deps-14ibta\`, committed clean.
- Manifest: \`${manifest.name}\` ${manifest.version}${manifest.private ? ' (private)' : ''}; scripts: ${scripts}.
- Environments present: ${environments.join(', ') || 'none'}.
- Declared \`@orkestrel/*\` runtime dependencies: ${deps('dependencies').join(', ') || 'none'}.
- Declared \`@orkestrel/*\` peer dependencies: ${deps('peerDependencies').join(', ') || 'none'}.
- Declared \`@orkestrel/*\` development dependencies: ${deps('devDependencies').join(', ') || 'none'}.
- Guide: \`${repo}/guides/${pkg}.md\`; index: \`${repo}/guides/README.md\`; tests: \`${repo}/tests/\`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): \`AGENTS §\` citations across src, tests, guide, index, and README: ${f.agentsCitations}; \`should\` in src and the package's own prose: ${f.should}; \`.skip(\`/\`.todo(\`/\`.only(\`/\`skipIf\` sites under tests: ${f.skipsOrTodos} (the vendored \`tests/policy.test.ts\` and \`tests/config.test.ts\` account for a baseline you read before ruling); \`@ts-\` directives: ${f.tsDirectives}; \`/tmp\` literals in src: ${f.tmpLiterals}. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

${rowText}

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
`
	writeFileSync(`${UNITS}/${pkg}-brief.md`, out)
	console.log(`${UNITS}/${pkg}-brief.md | environments: ${environments.join(' ')} | carry rows: ${rows.length}`)
}
