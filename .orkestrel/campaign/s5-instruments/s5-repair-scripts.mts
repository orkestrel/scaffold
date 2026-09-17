import {
	blueprintToScripts,
	blueprintToWritableScripts,
	createBlueprint,
} from '../../src/core/compilers.ts'

const blueprint = createBlueprint('probe', {
	src: [],
	app: ['browser'],
	journey: true,
	setup: ['browser'],
})
const planned = blueprintToScripts(blueprint)
const writable = blueprintToWritableScripts(blueprint).map((script) => script.name)
console.log('planned test chain:', planned.test)
console.log('writable names:', writable.join(', '))
console.log('test writable:', writable.includes('test'))
console.log('test:setup:browser writable:', writable.includes('test:setup:browser'))
console.log('test:journey writable:', writable.includes('test:journey'))
