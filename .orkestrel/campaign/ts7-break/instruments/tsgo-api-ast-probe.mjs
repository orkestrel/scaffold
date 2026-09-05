// What a RemoteSourceFile exposes for the generated-text lifts: statements, modifiers, node text
// by pos/end, and the is* guards from unstable/ast over nodes the program returned; plus the
// async client's timing for the same overlay check.
import { API } from '/home/user/scaffold/node_modules/typescript/dist/api/sync/api.js'
import { API as AsyncAPI } from '/home/user/scaffold/node_modules/typescript/dist/api/async/api.js'
import * as is from '/home/user/scaffold/node_modules/typescript/dist/ast/is.generated.js'
import { readdirSync } from 'node:fs'
const workspace = '/home/user/scaffold'
const overlay = `${workspace}/src/core/zz-ast-overlay.ts`
const text = "import { isRecord } from '@orkestrel/contract'\n/** Greets. */\nexport function greet(name: string): string { return `hello ${name}` }\nconst hidden = 1\nexport default hidden\nexport const CHECK = isRecord(greet)\n"
const fs = {
  readFile: (path) => (path === overlay ? text : undefined),
  fileExists: (path) => (path === overlay ? true : undefined),
  directoryExists: () => undefined, realpath: () => undefined,
  getAccessibleEntries(directory) {
    if (directory !== `${workspace}/src/core`) return undefined
    let files = [], directories = []
    for (const entry of readdirSync(directory, { withFileTypes: true })) (entry.isDirectory() ? directories : files).push(entry.name)
    if (!files.includes('zz-ast-overlay.ts')) files.push('zz-ast-overlay.ts')
    return { files, directories }
  },
}
const config = `${workspace}/configs/src/tsconfig.core.json`
const api = new API({ cwd: workspace, fs })
const snapshot = api.updateSnapshot({ openProjects: [config] })
const program = snapshot.getProject(config).program
const file = program.getSourceFile(overlay)
console.log(`source file keys: ${Object.keys(file).slice(0, 12).join(', ')}; text length ${file.text?.length}`)
for (const statement of file.statements) {
  const modifiers = statement.modifiers ? [...statement.modifiers].map((m) => m.kind) : []
  const guards = ['isFunctionDeclaration', 'isVariableStatement', 'isImportDeclaration', 'isExportAssignment'].filter((g) => is[g]?.(statement))
  console.log(`statement kind=${statement.kind} pos=${statement.pos} end=${statement.end} modifiers=[${modifiers}] guards=[${guards}] text=${JSON.stringify(file.text.slice(statement.pos, statement.end).trim()).slice(0, 70)}`)
}
const fn = file.statements.find((s) => is.isFunctionDeclaration(s))
console.log(`function name: ${fn?.name?.text}; parameters: ${fn?.parameters?.map((p) => p.name?.text).join(',')}; jsdoc via checker: ${JSON.stringify(snapshot.getProject(config).checker.getDocumentationCommentOfSymbol(snapshot.getProject(config).checker.getSymbolAtLocation(fn.name)))}`)
snapshot.dispose(); api.close()
const started = performance.now()
const asyncApi = new AsyncAPI({ cwd: workspace, fs })
const asyncSnapshot = await asyncApi.updateSnapshot({ openProjects: [config] })
const asyncProject = await asyncSnapshot.getProject(config)
const diagnostics = await asyncProject.program.getSemanticDiagnostics(overlay)
console.log(`async client: snapshot+diagnostics in ${Math.round(performance.now() - started)} ms; items ${diagnostics.length}`)
await asyncSnapshot.dispose(); await asyncApi.close()
