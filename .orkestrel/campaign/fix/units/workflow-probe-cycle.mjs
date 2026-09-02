const core = await import('/home/user/fleet/workflow/dist/src/core/index.js')
const browser = await import('/home/user/fleet/workflow/dist/src/browser/index.js')
const server = await import('/home/user/fleet/workflow/dist/src/server/index.js')
const { createRequire } = await import('node:module')
const require = createRequire('/home/user/fleet/workflow/')
const cjs = require('/home/user/fleet/workflow/dist/src/core/index.cjs')
for (const [name, mod] of [['core', core], ['browser', browser], ['server', server], ['core.cjs', cjs]]) {
	const keys = Object.keys(mod).sort()
	console.log(name, keys.length, 'exports')
}
console.log('createWorkflowTree', typeof core.createWorkflowTree)
console.log('RunHolder', typeof core.RunHolder)
console.log('interned absent:', ['Phase', 'Task', 'Controller', 'TaskController'].filter((n) => n in core))
const manager = core.createWorkflowManager({ functions: { work: () => null } })
const workflow = manager.add({ id: 'w', name: 'W', phases: [{ id: 'p', name: 'P', tasks: [{ id: 't', name: 'T', behavior: 'work' }] }] })
console.log('manager mint bail', workflow.bail, 'behavior', workflow.phase('p')?.task('t')?.behavior)
const result = await core.createWorkflowRunner().execute(
	{ id: 'w2', name: 'W2', phases: [{ id: 'p', name: 'P', tasks: [{ id: 't', name: 'T', behavior: 'work' }] }] },
	{ functions: { work: () => 'done' } },
)
console.log('runner status', result.status)
console.log('description member', 'description' in workflow, workflow.description)
