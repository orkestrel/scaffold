import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
const blueprint = createBlueprint('proof', { app: ['core', 'server'] })
const compiler = new Compiler()
const plan = compiler.compile(blueprint).plan
if (plan === undefined) throw new Error('The generated app-only blueprint was blocked')
compiler.destroy()
const materializer = new Materializer()
materializer.materialize(plan, process.argv[2])
materializer.destroy()
