import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

const [guide, output] = process.argv.slice(2)
if (guide === undefined || output === undefined || process.argv.length !== 4) throw new Error('guide checkout and output directory are required')

const FIXTURES = new Set([
  'src/violations/fixture.ts',
  'src/violations/helpers.ts',
  'src/violations/parsers.ts',
  'src/violations/factories.ts',
  'src/violations/constants.ts',
  'src/violations/composables.ts',
  'app/browser/composables/useTheme.ts',
  'scripts/read.ts',
  'src/clean/CleanMember.ts',
])

function portable(path) {
  return path.replaceAll('\\', '/')
}

function writeFixture(root, name, text) {
  if (!FIXTURES.has(name)) throw new Error(`unexpected fixture path: ${name}`)
  const target = resolve(root, name)
  if (relative(root, target).startsWith('..')) throw new Error(`fixture escapes root: ${name}`)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, text, 'utf8')
}

function copyPolicy(root) {
  copyFileSync(join(guide, '.oxlintrc.json'), join(root, '.oxlintrc.json'))
  mkdirSync(join(root, 'configs'), { recursive: true })
  copyFileSync(join(guide, 'configs/policy.ts'), join(root, 'configs/policy.ts'))
}

function run(binary, root, targets) {
  const result = spawnSync(process.execPath, [binary, '--config', join(root, '.oxlintrc.json'), '--format', 'json', ...targets], {
    cwd: root,
    encoding: 'utf8',
    shell: false,
    timeout: 15000,
  })
  if (result.error !== undefined) throw result.error
  if (result.stdout === undefined || result.stdout === null) throw new Error('oxlint produced no stdout')
  let diagnostics
  try {
    diagnostics = JSON.parse(result.stdout)
  } catch {
    throw new Error('oxlint emitted malformed JSON')
  }
  if (!Array.isArray(diagnostics)) throw new Error('oxlint JSON has no diagnostics array')
  return {
    command: [process.execPath, binary, '--config', portable(join(root, '.oxlintrc.json')), '--format', 'json', ...targets],
    status: result.status,
    signal: result.signal,
    stderr: result.stderr,
    stdout: result.stdout,
    diagnostics: diagnostics.map(({ code, filename, message }) => ({ code, filename, message })),
  }
}

function writeComplete(root) {
  writeFixture(root, 'src/violations/fixture.ts', [
    '// A reader should meet this term.',
    "vi.mock('./x')",
    'class PrivateMember { private value = 1 }',
    'class ParameterMember { constructor(readonly value: string) {} }',
    'class PublicMember { public value = 1 }',
    'function OuterFunction() { const nested = () => undefined; return nested() }',
    "import * as os from 'node:os'",
    "import { EOL } from 'node:os'",
    'export interface ValueInterface { readonly id: string }',
    '/** The opener, a noun phrase. */',
    "export const STATUS = 'ready'",
    "export const lines = text.trim().split('\\n')",
    'export const ending = os.EOL + EOL',
    'void PrivateMember',
    'void ParameterMember',
    'void PublicMember',
    'void OuterFunction',
  ].join('\n'))
  writeFixture(root, 'src/violations/helpers.ts', ['function buildValue(): void {}', 'void buildValue'].join('\n'))
  writeFixture(root, 'src/violations/parsers.ts', 'export function coerceValue(): void {}\n')
  writeFixture(root, 'src/violations/factories.ts', 'export function buildValue(): void {}\n')
  writeFixture(root, 'src/violations/constants.ts', 'export const values = []\n')
  writeFixture(root, 'src/violations/composables.ts', "export const READY = 'yes'\n")
  writeFixture(root, 'app/browser/composables/useTheme.ts', 'export function useMode(): void {}\n')
  writeFixture(root, 'scripts/read.ts', [
    'export function readLines(text: string): readonly string[] {',
    '\tdebugger',
    "\treturn text.trim().split('\\n')",
    '}',
  ].join('\n'))
  writeFixture(root, 'src/clean/CleanMember.ts', [
    '// Reads the value a caller receives.',
    '/** Holds one runtime-private value. */',
    'export class CleanMember {',
    '\t#value = 1',
    '\tvalue(): number { return this.#value }',
    '}',
  ].join('\n'))
}

const guideRoot = resolve(guide)
const outputRoot = resolve(output)
if (!statSync(outputRoot).isDirectory()) throw new Error('output path is not a directory')
readFileSync(join(guideRoot, 'package.json'))
readFileSync(join(guideRoot, '.oxlintrc.json'))
readFileSync(join(guideRoot, 'configs/policy.ts'))
const requireGuide = createRequire(join(guideRoot, 'package.json'))
const manifestPath = requireGuide.resolve('oxlint/package.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const entry = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.oxlint
if (typeof entry !== 'string') throw new Error('oxlint package has no oxlint bin entry')
const binary = resolve(dirname(manifestPath), entry)
readFileSync(binary)

const minimal = mkdtempSync(join(tmpdir(), 'd7n-guide-policy-minimal-'))
const complete = mkdtempSync(join(tmpdir(), 'd7n-guide-policy-complete-'))
copyPolicy(minimal)
copyPolicy(complete)
writeFixture(minimal, 'src/violations/fixture.ts', "vi.mock('./x')\n")
writeComplete(complete)

const observation = {
  entry: portable(binary),
  version: manifest.version,
  node: process.version,
  platform: process.platform,
  fixtures: { minimal: portable(minimal), complete: portable(complete) },
  minimal: run(binary, minimal, ['src/violations']),
  complete: {
    violations: run(binary, complete, ['src/violations', 'app', 'scripts']),
    clean: run(binary, complete, ['src/clean']),
  },
}
writeFileSync(join(outputRoot, 'observation.json'), `${JSON.stringify(observation, undefined, 2)}\n`, 'utf8')
console.log(portable(outputRoot))
