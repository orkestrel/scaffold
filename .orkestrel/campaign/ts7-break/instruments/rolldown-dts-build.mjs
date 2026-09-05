import { rolldown } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'
const started = performance.now()
const bundle = await rolldown({
  input: '/home/user/scaffold/src/core/index.ts',
  cwd: '/home/user/scaffold',
  external: (id) => id.startsWith('@orkestrel/') || id.startsWith('node:'),
  plugins: [dts({ tsconfig: '/home/user/scaffold/configs/src/tsconfig.core.json', generator: 'tsgo', emitDtsOnly: true })],
})
const out = await bundle.write({ dir: '/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7-break/rolldown-dts/out', format: 'es' })
console.log(`built in ${Math.round(performance.now() - started)} ms: ${out.output.map((o) => o.fileName).join(', ')}`)
await bundle.close()
