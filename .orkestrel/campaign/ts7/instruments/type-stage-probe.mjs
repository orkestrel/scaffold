// Times the built TypeStage's construction and first inspection against the probe checkout root,
// outside vitest: the type warm is the CPU-bound work that shares the event loop with the lint warm.
import { TypeStage } from '/home/user/fleet/probe/dist/src/server/index.js'
const workspace = '/home/user/fleet/probe'
for (let round = 0; round < 2; round += 1) {
  const started = performance.now()
  const stage = new TypeStage(workspace)
  const constructed = Math.round(performance.now() - started)
  try {
    const check = await stage.inspect(
      { files: [], test: { path: 'tests/src/server/type-probe-scratch.test.ts', text: 'export const VALUE: number = 1\n' } },
      { signal: new AbortController().signal },
    )
    console.log(`round ${round + 1}: constructed in ${constructed} ms; inspected after ${Math.round(performance.now() - started)} ms; issues ${check.issues.length}; elapsed ${check.elapsed}`)
  } catch (error) {
    console.log(`round ${round + 1}: FAILED after ${Math.round(performance.now() - started)} ms: ${error instanceof Error ? error.message : String(error)}`)
  } finally {
    await stage.destroy?.()
  }
}
