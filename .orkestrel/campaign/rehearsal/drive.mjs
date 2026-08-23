// Stage 4: serve the built bundle, drive it in a real Chromium resolved the way the
// generated configs/browsers.ts resolves one, and compare runtime keys against the
// value exports the installed .d.ts declares, read through the TypeScript checker.
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { createRequire } from 'node:module'

const CONSUMER = '/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/rehearsal/consumer'
const loadFromScaffold = createRequire('/home/user/scaffold/package.json')
const ts = loadFromScaffold('typescript')
const { chromium } = loadFromScaffold('playwright')

// --- the resolver ladder the generated configs/browsers.ts implements ---
const executable = (p) => { try { return statSync(p).isFile() && (statSync(p).mode & 0o111) !== 0 } catch { return false } }
function resolveBrowser() {
	let pinned
	try { pinned = chromium.executablePath() } catch { pinned = undefined }
	if (pinned && executable(pinned)) return { path: pinned, via: 'pinned revision' }
	const root = pinned ? dirname(dirname(dirname(pinned))) : '/opt/pw-browsers'
	for (const base of [root, '/opt/pw-browsers']) {
		if (!existsSync(base)) continue
		const alias = join(base, process.platform === 'win32' ? 'chromium.exe' : 'chromium')
		if (executable(alias)) return { path: alias, via: `alias under ${base}` }
		for (const entry of readdirSync(base).filter((e) => /^chromium-\d+$/.test(e)).sort((a, b) => Number(/\d+/.exec(b)[0]) - Number(/\d+/.exec(a)[0]))) {
			for (const layout of ['chrome-linux64/chrome', 'chrome-linux/chrome']) {
				const candidate = join(base, entry, layout)
				if (executable(candidate)) return { path: candidate, via: `${entry} under ${base}` }
			}
		}
	}
	for (const system of ['/opt/google/chrome/chrome', '/opt/microsoft/msedge/msedge']) if (executable(system)) return { path: system, via: 'system channel' }
	return undefined
}

// --- declared value exports, through the compiler checker ---
function declaredExports(entry) {
	const program = ts.createProgram([entry], { noEmit: true, skipLibCheck: true, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext })
	const checker = program.getTypeChecker()
	const source = program.getSourceFile(entry)
	if (source === undefined) throw new Error(`no source file for ${entry}`)
	const symbol = checker.getSymbolAtLocation(source)
	if (symbol === undefined) throw new Error('entry declares no module symbol')
	const values = []
	for (const exported of checker.getExportsOfModule(symbol)) {
		const resolved = (exported.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(exported) : exported
		if ((resolved.flags & ts.SymbolFlags.Value) !== 0) values.push(exported.getName())
	}
	return values.sort()
}

const pinnedRaw = (() => { try { return chromium.executablePath() } catch { return '(threw)' } })()
const found = resolveBrowser()
console.log('playwright pinned path :', pinnedRaw)
console.log('pinned path launchable :', executable(pinnedRaw) ? 'yes' : 'NO')
console.log('resolver ladder found  :', found ? `${found.path}  (via ${found.via})` : 'NONE')
if (found === undefined) { console.log('VERDICT: no launchable browser'); process.exit(1) }

const types = join(CONSUMER, 'node_modules/@orkestrel/router/dist/src/browser/index.d.ts')
const declared = declaredExports(types)
console.log('\ndeclared value exports :', declared.join(', '))

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }
const server = createServer((request, response) => {
	const path = join(CONSUMER, 'dist', request.url === '/' ? 'index.html' : decodeURIComponent(request.url))
	if (!existsSync(path)) { response.writeHead(404); response.end(); return }
	response.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' })
	response.end(readFileSync(path))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const port = server.address().port
console.log(`\nserving built bundle on 127.0.0.1:${port}`)

const browser = await chromium.launch({ executablePath: found.path, headless: true })
const page = await browser.newPage()
const failures = []
page.on('pageerror', (error) => failures.push(String(error)))
await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' })
const runtime = await page.evaluate(() => window.subjectKeys ?? null)
await browser.close()
server.close()

console.log('page errors            :', failures.length === 0 ? 'none' : failures.join(' | '))
console.log('runtime keys in browser:', runtime === null ? 'NONE — the module never evaluated' : runtime.join(', '))
if (runtime === null) { console.log('\nVERDICT: browser stage FAILED to evaluate the bundle'); process.exit(1) }
const missing = declared.filter((name) => !runtime.includes(name))
const extra = runtime.filter((name) => !declared.includes(name))
console.log('\ndeclared but absent at runtime:', missing.length === 0 ? 'none' : missing.join(', '))
console.log('present at runtime but undeclared:', extra.length === 0 ? 'none' : extra.join(', '))
console.log('\nVERDICT:', missing.length === 0 && extra.length === 0 ? 'browser stage RUNS and the surfaces AGREE' : 'browser stage RUNS and reports a MISMATCH')
