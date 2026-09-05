// Drives typescript/unstable/sync with a virtual-filesystem overlay: a candidate file that is not on
// disk, checked under the scoped core project, reading semantic diagnostics with positions.
import { API } from '/home/user/scaffold/node_modules/typescript/dist/api/sync/api.js'
import { createVirtualFileSystem } from '/home/user/scaffold/node_modules/typescript/dist/api/fs.js'
const workspace = '/home/user/scaffold'
const overlay = `${workspace}/src/core/zz-api-overlay.ts`
const text = "import { isRecord } from '@orkestrel/contract'\nexport const VALUE: number = 'text'\nexport const CHECK = isRecord(VALUE)\n"
const started = performance.now()
const stamp = () => `${Math.round(performance.now() - started)}ms`
import { readdirSync } from 'node:fs'
// An overlay, not a virtual tree: the one candidate answers from memory and everything else falls
// back to the real filesystem (`undefined`), the contract fs.d.ts documents for each callback.
const fs = {
  readFile: (path) => (path === overlay ? text : undefined),
  fileExists: (path) => (path === overlay ? true : undefined),
  directoryExists: () => undefined,
  realpath: () => undefined,
  getAccessibleEntries(directory) {
    if (directory !== `${workspace}/src/core`) return undefined
    let files = [], directories = []
    for (const entry of readdirSync(directory, { withFileTypes: true })) (entry.isDirectory() ? directories : files).push(entry.name)
    if (!files.includes('zz-api-overlay.ts')) files.push('zz-api-overlay.ts')
    return { files, directories }
  },
}
const api = new API({ cwd: workspace, fs, collectTiming: true })
console.log(`${stamp()} api constructed`)
const config = `${workspace}/configs/src/tsconfig.core.json`
const parsed = api.parseConfigFile(config)
console.log(`${stamp()} parseConfigFile: ${parsed.fileNames.length} files; overlay listed: ${parsed.fileNames.includes(overlay)}`)
const snapshot = api.updateSnapshot({ openProjects: [config] })
console.log(`${stamp()} updateSnapshot; projects: ${snapshot.getProjects().map((p) => p.configFileName).join(', ')}`)
const project = snapshot.getProject(config)
console.log(`${stamp()} project ${project?.configFileName}; root files: ${project?.rootFiles?.length}`)
const file = project.program.getSourceFile(overlay)
console.log(`${stamp()} getSourceFile(overlay): ${file ? 'found' : 'missing'}`)
const semantic = project.program.getSemanticDiagnostics(overlay)
console.log(`${stamp()} semantic diagnostics for overlay: ${JSON.stringify(semantic).slice(0, 700)}`)
const syntactic = project.program.getSyntacticDiagnostics(overlay)
console.log(`${stamp()} syntactic: ${JSON.stringify(syntactic).slice(0, 200)}`)
const all = project.program.getSemanticDiagnostics()
console.log(`${stamp()} whole-project semantic count: ${all.length}`)
console.log(`${stamp()} timing: ${JSON.stringify(api.getTimingInfo()).slice(0, 300)}`)
snapshot.dispose(); api.close()
console.log(`${stamp()} closed`)
