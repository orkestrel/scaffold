// Invoke api-extractor over a pre-emitted .d.ts entry, using api-extractor's own bundled engine and its own lib.
// argv: <entry .d.ts> <rollup out> <projectFolder> <packageJson> <core|other>
const path = require('node:path')
const AE = '/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/index.js'
const { Extractor, ExtractorConfig } = require(AE)
const [entry, rollup, projectFolder, pkgJson, kind, showConfigFile] = process.argv.slice(2)
// lib and types come from the face's own resolved project (tsc --showConfig), the rest is the minimal base the bundled engine needs.
const own = showConfigFile ? (JSON.parse(require('node:fs').readFileSync(showConfigFile, 'utf8')).compilerOptions ?? {}) : {}
const compilerOptions = {
  types: kind === 'core' ? ['node'] : (own.types ?? []),
  lib: own.lib ?? ['ESNext', 'WebWorker'],
  target: 'ESNext', module: 'ESNext', moduleResolution: 'bundler',
  skipLibCheck: true, strict: true,
}
const configObject = {
  projectFolder,
  mainEntryPointFilePath: entry,
  bundledPackages: [],
  compiler: { overrideTsconfig: { $schema: 'http://json.schemastore.org/tsconfig', compilerOptions, files: [entry] } },
  apiReport: { enabled: false }, docModel: { enabled: false }, tsdocMetadata: { enabled: false },
  dtsRollup: { enabled: true, untrimmedFilePath: rollup },
  messages: { compilerMessageReporting: { default: { logLevel: 'none' } }, extractorMessageReporting: { default: { logLevel: 'none' } }, tsdocMessageReporting: { default: { logLevel: 'none' } } },
}
const config = ExtractorConfig.prepare({ configObject, configObjectFullPath: path.join(projectFolder, 'api-extractor.json'), packageJsonFullPath: pkgJson })
const result = Extractor.invoke(config, { localBuild: true, showVerboseMessages: false, showDiagnostics: false })
console.log(`invoke succeeded=${result.succeeded} errors=${result.errorCount} warnings=${result.warningCount}`)
process.exit(0)
