// Re-derives the equality case's collected worklist from the committed baseline, so the
// red-first reading can be quoted verbatim after the tree has converged. Reads git objects
// only and writes nothing outside its own stdout.
import { execFileSync } from 'node:child_process'
import { createGuide, createSource, findDrift, parseManifest } from '@orkestrel/guide'

/**
 * Reads one path's committed text.
 *
 * @param path - The root-relative path to read.
 * @returns The file's text at HEAD.
 */
function readHead(path) {
	return execFileSync('git', ['show', `HEAD:${path}`], { encoding: 'utf8' })
}

const tracked = execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], { encoding: 'utf8' })
	.split('\n')
	.filter((path) => /^(?:src|guides)\/.*\.(?:ts|md)$/.test(path))
const files = {}
for (const path of tracked) files[path] = readHead(path)
const manifest = parseManifest(files['guides/README.md'], 'guides')
const entry = manifest.find((row) => row.spec === 'guides/lsp.md')
const guide = createGuide(files[entry.spec])
const source = createSource({ files, module: entry.source })
const lines = []
for (const drift of findDrift(guide, source)) {
	const left = drift.guide === undefined ? 'absent' : JSON.stringify(drift.guide)
	const right = drift.source === undefined ? 'absent' : JSON.stringify(drift.source)
	lines.push(`${entry.spec} ${drift.key}: guide ${left} source ${right}`)
}
process.stdout.write(`collected: ${lines.length}\n`)
for (const line of lines.slice(0, 4)) process.stdout.write(`${line}\n`)
