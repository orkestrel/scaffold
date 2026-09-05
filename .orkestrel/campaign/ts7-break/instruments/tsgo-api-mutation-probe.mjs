// The probe's flow: check a case draft, then a control draft at the same path, on one spawned API
// client, mutating the overlay and announcing the change through updateSnapshot({ fileChanges }).
import { API } from '/home/user/scaffold/node_modules/typescript/dist/api/sync/api.js'
import { readdirSync } from 'node:fs'
const workspace = '/home/user/scaffold'
const overlay = `${workspace}/src/core/zz-api-overlay.ts`
const drafts = { current: "export const VALUE: number = 'text'\n" }
const fs = {
  readFile: (path) => (path === overlay ? drafts.current : undefined),
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
const started = performance.now()
const stamp = () => `${Math.round(performance.now() - started)}ms`
const api = new API({ cwd: workspace, fs })
const config = `${workspace}/configs/src/tsconfig.core.json`
let snapshot = api.updateSnapshot({ openProjects: [config] })
const read = (label) => {
  const project = snapshot.getProject(config)
  const items = project.program.getSemanticDiagnostics(overlay).map((d) => `${d.code}@${d.pos}-${d.end} ${d.text}`)
  console.log(`${stamp()} ${label}: ${JSON.stringify(items)}`)
}
read('case (string into number)')
drafts.current = "export const VALUE: number = 1\nexport const WRONG: string = VALUE\n"
snapshot = api.updateSnapshot({ fileChanges: { changed: [overlay] } })
read('control after fileChanges.changed')
drafts.current = "export const VALUE = 1\n"
snapshot = api.updateSnapshot({ fileChanges: { changed: [overlay] } })
read('clean after second change')
drafts.current = "export const VALUE: number = 'again'\n"
snapshot = api.updateSnapshot()
read('stale read with no fileChanges announced (expect the old, clean answer)')
snapshot.dispose(); api.close(); console.log(`${stamp()} closed`)
